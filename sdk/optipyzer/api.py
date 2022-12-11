from typing import Dict, Optional, Union
import requests
import time
from .const import (
    LOCAL_SERVER_BASE,
    PUBLIC_SERVER_BASE,
    SESSION_HDRS,
    SLEEP_MIN,
)
from .log import _LOGGER
from .helpers import verify_dna, verify_protein

# return types
from requests import Response
from .models import SearchResult
from .const import VALID_SEQ_TYPES, POPULAR_SPECIES
from .models import CodonUsage, OptimizationResult


class API:
    """
    Python interface for the Optipyzer web API.
    """

    _session = requests.Session()
    _session.headers = SESSION_HDRS

    def __init__(
        self, local: bool = False, timeout: int = 1000, sleep_time: float = 0.5
    ):
        """
        Initialize an optipyzer interface

        :param local: Whether to use the local server (default: False)
        :param timeout: The timeout for requests in seconds (default: 1000)
        :param sleep_time: The time to wait between API calls in seconds (default: 0.5s)
        """

        # determine environment
        if local:
            self.api_base = LOCAL_SERVER_BASE
        else:
            self.api_base = PUBLIC_SERVER_BASE

        # set params
        self.timeout = timeout
        if sleep_time < SLEEP_MIN:
            _LOGGER.warn(
                f"Minimum sleep time of {SLEEP_MIN} sec required \
				({sleep_time} sec was supplied). Setting to {SLEEP_MIN} sec"
            )
            self.sleep_time = SLEEP_MIN
        else:
            self.sleep_time = sleep_time

    def _make_request(
        self, path: str, method: str = "GET", params_: dict = {}, body_: dict = {}
    ) -> Response:
        """
        Make a request to the API.

        :param path: The path to the API endpoint
        :param method: The HTTP method to use (default: GET)
        :param params_: The query parameters to send (default: {})
        :param body_: The body of the request (default: {})
        """

        # generate the URI
        uri = self.api_base + path

        try:
            response = self._session.request(method, uri, params=params_, json=body_)
        except requests.Timeout:
            _LOGGER.warn("Request timeout raised.")

        except requests.RequestException as e:
            _LOGGER.error(f"Exception raised during request to {uri}: {e}")

        # check response status
        if response.status_code != 200:
            _LOGGER.error(f"Request failed with status code: {response.status_code}")
            _LOGGER.error(f"{response.json()}")

        # Enforce rate limiting
        time.sleep(max(SLEEP_MIN, self.sleep_time))

        return response

    def _prepare_org_id(self, org_id: Union[str, int]) -> int:
        """
        Prepare an organism ID for use in a request

        :param org_id: The organism ID to prepare

        :return: The prepared organism ID
        """
        if isinstance(org_id, str):
            if org_id in POPULAR_SPECIES:
                org_id = POPULAR_SPECIES[org_id]
            else:
                try:
                    org_id = int(org_id)
                except ValueError:
                    raise ValueError(f"Invalid organism ID: {org_id}")
        elif isinstance(org_id, int):
            pass
        else:
            raise ValueError(f"Invalid organism ID: {org_id}")
        return org_id

    def search(self, name: str, limit: int = 50) -> SearchResult:
        """
        Search for an organism given it's name

        :param name: The name of the organism to search for
        :param limit: The maximum number of results to return (default: 50)

        :return: A SearchResult object
        """
        result = self._make_request(
            "/species/search", params_={"name": name, "limit": limit}
        )
        search_results = result.json()
        return search_results

    def optimize(
        self,
        seq: str,
        weights: Dict[str, int],
        seq_type: str = "dna",
        iterations: Optional[int] = None,
        seed: Optional[Union[int, str]] = None,
    ) -> OptimizationResult:
        """
        Optimize a sequence given specific organism weights

        :param seq: The sequence to optimize
        :param weights: The weights to use for optimization
        :param seq_type: The type of sequence (default: "dna")
        :param iterations: The number of iterations to run on the server (default: None)
        :param seed: The seed to use for the optimization (default: None)

        :return: An OptimizationResult object
        """
        # force seq_type lower
        seq_type = seq_type.lower()
        if seq_type not in VALID_SEQ_TYPES:
            raise ValueError(f"Invalid sequence type: {seq_type}")

        # confirm that the sequences are valid
        if seq_type == "dna":
            verify_dna(seq)
        else:
            verify_protein(seq)

        # replace species names with ids
        for species in list(weights.keys()):
            weights[self._prepare_org_id(species)] = weights.pop(species)

        # make optimization request
        result = self._make_request(
            f"/optimize/{seq_type}",
            method="POST",
            body_={
                "seq": seq,
                "weights": weights,
                "iterations": iterations,
                "seed": seed,
            },
        )
        return result.json()

    def pull_codons(self, org_id: Union[int, str]) -> CodonUsage:
        """
        Pull codon usage data for a specific organism

        :param org_id: The ID of the organism to pull codon usage data for

        :return: A CodonUsage object
        """
        org_id = self._prepare_org_id(org_id)
        result = self._make_request(
            f"/species/{org_id}/codons",
        )
        return result.json()
