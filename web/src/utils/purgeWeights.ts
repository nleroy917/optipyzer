import { Species, Weights } from "@/.."

export function purgeWeights(weights: Weights, species: Species[]) {

  Object.keys(weights).forEach(w => {
    if(!(species.map(s => s.id).indexOf(parseInt(w)) >= 0)) {
      delete weights[parseInt(w)]
    }
  })

  return weights
}