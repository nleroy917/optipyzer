import { Dispatch, FC, SetStateAction, useState } from "react";

import { QueryResult } from "@/..";

interface Props {
  result: QueryResult;
  setResult: Dispatch<SetStateAction<QueryResult | null>>;
}

const Results: FC<Props> = (props) => {
  // destructure props
  const { result, setResult } = props

  // state
  const [viewInfo, setViewInfo] = useState<boolean>(false)

  return  (
    <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <div className="flex flex-col w-11/12 p-4 mx-6 font-bold text-left bg-blue-200 border-2 border-blue-500 rounded-lg shadow-lg md:w-3/4">
        <div className="flex flex-row items-start justify-between">
          <p className="mb-2 text-5xl font-bold text-left">Query Result:</p>
          <p 
            className="text-2xl font-bold cursor-pointer hover:text-blue-600"
            onMouseEnter={() => setViewInfo(true)}
            onMouseLeave={() => setViewInfo(false)}
          >
            ⓘ
          </p>
          <div 
            style={{position: 'absolute', display: viewInfo ? 'block' : 'none'}} 
            className="justify-center w-1/2 p-3 bg-white border-2 border-black rounded-lg shadow-2xl"
          >
            About results:
          </div>
        </div>
        <p className="text-lg font-bold">Optimized Sequence AD:</p>
        <div className="p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg">
          <p className="text-sm">{result.optimmized_ad}</p>
        </div>
        <p className="text-lg font-bold">Optimized Sequence SD:</p>
        <div className="p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg">
          <p className="text-sm">{result.optimmized_sd}</p>
        </div>
        <p className="text-lg font-bold">Peptide Sequence:</p>
        <div className="p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg">
          <p className="text-sm">{result.peptide_seq}</p>
        </div>
        <div className="flex flex-row">
          <button onClick={() => setResult(null)} className="px-6 py-2 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black">
              Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results