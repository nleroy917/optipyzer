import { Dispatch, FC, SetStateAction } from 'react'

interface Props {
  iterations: number | null
  setIterations: Dispatch<SetStateAction<number | null>>
  seed: number | string | null
  setSeed: Dispatch<SetStateAction<number | string | null>>
}

const HyperParameterSelection: FC<Props> = (props) => {
  const { iterations, setIterations, seed, setSeed } = props
  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <p className="mt-2 text-lg font-bold text-blue-600">
          Number of iterations:
        </p>
        <input
          value={iterations || undefined}
          onChange={(e) => setIterations(parseInt(e.target.value))}
          placeholder="1000"
          type="number"
          className="p-2 mb-2 text-sm text-gray-600 border border-black rounded-lg shadow-md"
        />
      </div>
      <div className="md:ml-2">
        <p className="mt-2 text-lg font-bold text-blue-600">Random Seed:</p>
        <input
          value={seed || undefined}
          onChange={(e) => setSeed(e.target.value)}
          className="p-2 mb-2 text-sm text-gray-600 border border-black rounded-lg shadow-md"
        />
      </div>
    </div>
  )
}

export default HyperParameterSelection
