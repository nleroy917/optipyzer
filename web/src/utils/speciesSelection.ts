import axios, { AxiosResponse } from 'axios'

interface GroupedOption {
  label: string
  options: {
    value: number
    label: string
  }[]
}

interface Organism {
  GC1_perc: number
  GC2_perc: number
  GC3_perc: number
  GC_perc: number
  assembly: string
  division: string
  num_CDS: number
  num_codons: number
  org_id: number
  organelle: string
  species: string
  taxid: number
  translation_table: number
}

interface SearchResult {
  num_results: number
  organisms: Organism[]
  search_query: string
}

import { species_popular } from '../data/species_popular'

export const fetchSpecies = (searchString: string) => {
  // define maximum amount of
  // results to return
  const MAX_ITEMS = 100

  // being results object with popular
  // options
  const allOptions: GroupedOption[] = [
    {
      label: 'Results',
      options: [],
    },
    {
      label: 'Popular',
      options: species_popular.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    },
  ]

  // dont perform a search for strings less
  // than 2 as it kills performance.
  //
  // mybe we can throttle this server-side
  if (searchString.length < 2) {
    return allOptions
  }

  return new Promise((resolve, reject) => {
    // fetch from API
    axios
      .get<SearchResult>(
        `${process.env.NEXT_PUBLIC_API_URL}/species/search/?name=${searchString}`
      )
      .then((res: AxiosResponse<SearchResult>) => {
        // map results
        let results = res.data.organisms.map((org: Organism) => ({
          value: org.org_id,
          label: org.species,
          type: null,
        }))

        // only return top 100
        if (results.length > MAX_ITEMS) {
          results = results.slice(0, MAX_ITEMS)
        }

        // append this to allOptions
        allOptions[0].options = results

        // return for AsyncSelect
        resolve(allOptions)
      })
      // catch errs
      .catch((err) => {
        reject(err)
      })
  })
}
