import { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Select, { components, CSSObjectWithLabel, MultiValue, Theme} from 'react-select';

import { Species } from '@/..';

// import { species } from "../data/species"
import {species_TEST} from "../data/species_TEST"

// eslint-disable-next-line
const Input = (props: any) => (
  <components.Input 
     {...props} 
     inputClassName="rounded-lg outline-none border-none shadow-none focus:ring-transparent hover:outline-none"
  />
)

interface Props {
  setSpecies: Dispatch<SetStateAction<Species[]>>,
  setWeights: Dispatch<SetStateAction<{[id: number]: number}>>,
  species: Species[],
  weights: {[id: number]: number}
}

const SpeciesSelector: FC<Props> = (props) => {
  return (
    <>
      <Select
        // override styling of
        // multiselect component
        // to be in line with the
        // tailwind css styling
        theme={(theme: Theme): Theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#60A5FA',
            neutral20: 'black',
            primary: 'black',
            dangerLight: '#60A5FA',
            danger: '#2563EB'
          }
        })}
        styles={{
          input: (css: CSSObjectWithLabel) => ({
            ...css,
            input: {
              outline: 'none;'
            }
          })
        }}
        className="w-full mb-2 shadow-md"
        options={species_TEST.map((s: Species) => ({
          value: s.id,
          label: s.name
        }))}
        value={props.species.map((s: Species) => ({
          value: s.id,
          label: s.name
        }))}
        components={{ Input: Input }}
        isMulti
        onChange={(selection: MultiValue<{value: number, label: string}>) => {
          
          // set species selection
          props.setSpecies(selection.map((s: {value: number, label: string}) => ({
            name: s.label,
            id: s.value,
            type: null
          })))

          // map weights as things change
          selection.forEach(s => {
            // if there is not an existing weight in the object
            // make one with weighting = 1
            if(!(s.value in props.weights)) {
              props.setWeights({
                ...props.weights,
                [s.value]: 1.0
              })
            }
          })       
        }}
      />
    </>
  )

}

export default SpeciesSelector;