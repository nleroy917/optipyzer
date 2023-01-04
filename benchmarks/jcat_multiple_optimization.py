import time
from tqdm import tqdm
from xml.dom.minidom import Element
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from webdriver_manager.chrome import ChromeDriverManager

from Bio import SeqIO

JCAT_URL = "http://www.jcat.de/"
SEQUENCE_INPUT_XPATH = "/html/body/table/tbody/tr[4]/td[2]/form/table/tbody/tr[3]/td/table/tbody/tr[1]/td/textarea"
PROTEIN_RADIO_XPATH ="/html/body/table/tbody/tr[4]/td[2]/form/table/tbody/tr[5]/td/table/tbody/tr[2]/td[1]/input"
SELECT_DROPDOWN_XPATH = "/html/body/table/tbody/tr[4]/td[2]/form/table/tbody/tr[7]/td/table/tbody/tr/td/select"
SUBMIT_BUTTON_XPATH = "/html/body/table/tbody/tr[4]/td[2]/form/table/tbody/tr[11]/td/button[1]"
RESULT_XPATH = "/html/body/table/tbody/tr[4]/td[2]/table/tbody/tr[4]/td/font"

class Crawler():
    def __init__(self):
        # Use the `install()` method to set `executabe_path` in a new `Service` instance:
        self._service = Service(executable_path=ChromeDriverManager().install())
        # Pass in the `Service` instance with the `service` keyword: 
        self._driver = webdriver.Chrome(service=self._service)
    
    def gracefully_find_by_xpath(self, xpath: str) -> Element:
        """Find a DOM element based on its xpath"""
        result = None
        while result is None:
            try:
                result = self._driver.find_element(By.XPATH, xpath)
            except:
                result = None
        return result
    
    def find_by_xpath(self, xpath: str) -> Element:
        """Find a DOM element based on its xpath"""
        result = self._driver.find_element(By.XPATH, xpath)
        return result
    
    def click_element(self, element: Element) -> None:
        """Click a DOM element"""
        element.click()
    
    def input_text(self, element: Element, text: str) -> None:
        """Input text into a DOM element"""
        element.send_keys(text)

    def get_page(self, url: str) -> None:
        """Load up a page"""
        self._driver.get(url)

def remove_whitespace(text: str) -> str:
    """Remove whitespace from a string"""
    return "".join(text.split())

def remove_newlines(text: str) -> str:
    """Remove newlines from a string"""
    return text.replace("\r", "").replace("\n", "")

def remove_digits(text: str) -> str:
    """Remove digits from a string"""
    return "".join([char for char in text if not char.isdigit()])

def optimize_sequence(sequence: str) -> str:
    """Optimize a protein sequence on JCAT using selenium."""
    crawler = Crawler()
    crawler.get_page(JCAT_URL)

    # find input box and insert sequence
    sequence_input = crawler.find_by_xpath(SEQUENCE_INPUT_XPATH)
    sequence_input.send_keys(sequence)

    # find protein radio button and click it
    protein_radio = crawler.find_by_xpath(PROTEIN_RADIO_XPATH)
    protein_radio.click()

    # find select dropdown and select "Homo sapiens"
    select_dropdown = Select(crawler.find_by_xpath(SELECT_DROPDOWN_XPATH))
    select_dropdown.select_by_visible_text("Homo sapiens")

    # find submit button and click it
    submit_button = crawler.find_by_xpath(SUBMIT_BUTTON_XPATH)
    submit_button.click()

    # find result and print it
    # to avoid anything with pages not loading before clicking the element,
    # we'll try to find the result element until we get it
    result = crawler.gracefully_find_by_xpath(RESULT_XPATH)

    # remove the whitespace, newlines, and digits from the result
    result_parsed = remove_whitespace(remove_newlines(remove_digits(result.text)))

    return result_parsed

def main():
    records = list(SeqIO.parse("inputs/keefe_szostak.fasta", "fasta"))
    optimized_sequences = {}
    start = time.time()
    for record in tqdm(records):
        seq = optimize_sequence(record.seq)
        optimized_sequences[record.id] = seq
    end = time.time()

    # write them out to a FASTA file
    with open("results/keefe_szostak_JCAT.fasta", "w") as fh:
        for id in tqdm(list(optimized_sequences.keys())):
            fh.write(f">{id}\n")
            fh.write(optimized_sequences[id]['optimized_sd'] + "\n")

    print(f"Time taken: {end - start}")

if __name__ == "__main__":
    main()
