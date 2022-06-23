import { Species, Weights } from '@/..'

/**
 *
 * To simplyify the UI logic, when species that
 * the user selects to optimize for are removed
 * from the selector, that species is NOT immediately
 * removed from the weights list/weights object. As such,
 * prior to sending data to the server to analyze,
 * we need to purge out nay weight objects that are not
 * consistent with our species list.
 *
 * @param weights object with organism id's linking to Weight objects
 * @param species list of Species objects
 * @returns cleaned weight object
 */
export function purgeWeights(weights: Weights, species: Species[]) {
  Object.keys(weights).forEach((w) => {
    if (!(species.map((s) => s.id).indexOf(parseInt(w)) >= 0)) {
      delete weights[parseInt(w)]
    }
  })

  return weights
}
