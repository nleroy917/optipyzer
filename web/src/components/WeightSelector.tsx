import { FC, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'

import { Species, Weights } from '@/..'
import { CodonUsageModal } from './CodonUsageModal'

interface Props {
  s: Species
  setSpecies: Dispatch<SetStateAction<Species[]>>
  weights: Weights
  setWeights: Dispatch<SetStateAction<Weights>>
}

const WeightSelector: FC<Props> = (props) => {
  // destructure props
  const { s, setSpecies, weights, setWeights } = props

  // modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div className="w-full px-2 pb-2 mt-2 mr-2 border border-black rounded-lg shadow-md hover:border-blue-600 md:mt-0">
      <button
        className="hover:text-blue-600"
        onClick={() => {
          setSpecies((old) => old.filter((oldS) => oldS.id !== s.id))
        }}
      >
        x
      </button>
      <div className="flex flex-col justify-between mx-1 h-5/6">
        <label className="font-bold">{s.name}</label>
        <div>
          <div className="flex flex-row items-center justify-center">
            <span className="mx-1"> 1</span>
            <input
              className="w-full"
              type="range"
              min="1"
              max="5"
              step="1"
              value={weights[s.id]}
              onChange={(e) =>
                setWeights({
                  ...weights,
                  [s.id]: parseFloat(e.target.value),
                })
              }
              list="steplist"
            />
            <datalist id="steplist">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </datalist>
            <span className="mx-1">5</span>
          </div>
          <div className="w-full my-2 text-xl text-center text-white bg-blue-600 border border-white rounded-full">
            {weights[s.id]}
          </div>
          <div className="w-full text-center">
            <button
              className="text-sm text-blue-600 underline hover:text-blue-800"
              type="button"
              onClick={toggleModal}
            >
              View Codon Usage
            </button>
          </div>
          <CodonUsageModal
            open={modalOpen}
            setOpen={setModalOpen}
            orgId={s.id}
          />
        </div>
      </div>
    </div>
  )
}

export default WeightSelector
