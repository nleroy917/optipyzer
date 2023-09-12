import { Dispatch, FC, SetStateAction } from 'react'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ResultInfo: FC<Props> = (props) => {
  // destructure props
  const { open, setOpen } = props

  return (
    <div className="flex flex-row justify-center">
      <div
        style={{ position: 'absolute', display: open ? 'block' : 'none' }}
        className="w-10/12 p-2 mt-4 text-sm bg-yellow-400 border-2 border-black rounded-lg shadow-2xl md:w-1/2 -top-0 md:text-base md:top-0"
      >
        <div className="flex flex-row justify-between mx-1">
          <p className="text-2xl font-bold">About query results:</p>
          <button
            className="text-2xl hover:cursor-pointer hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            ⓧ
          </button>
        </div>
        <div className="p-1 font-normal">
          Your optimized query will consider the codon usage bias of one or more
          organisms. Below you are given two optimized sequences:
          <ul className="my-2 list-decimal list-inside">
            <li>
              <span className="ml-2 font-bold">Optimized AD:</span> Your
              opimized sequence using the <b>absolute difference</b> difference between the predicted and actual codon frequencies.
            </li>
            <li>
              <span className="ml-2 font-bold">Optimized SD:</span> Your
              opimized sequence using the <b>squared error</b> difference between the predicted and actual codon frequencies.
            </li>
          </ul>

          If you are unsure which sequence to use, <i>we recommend using the optimized SD sequence</i>. See {' '}
          <a className='font-bold text-blue-600 hover:underline' href="https://github.com/nleroy917/optipyzer/issues/56">this issue</a> for more information.
          We also give you the translated amino acid sequence of your optimized nucleotide sequence.
        </div>
      </div>
    </div>
  )
}

export default ResultInfo
