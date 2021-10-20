import { Dispatch, FC, SetStateAction, useState } from "react";

import { QueryResult } from "@/..";

import CopyToClipboard from "./CopyToClipboard";
import ResultInfo from '../components/ResultInfo';

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
        <ResultInfo 
          open={viewInfo}
          setOpen={setViewInfo}
        />
        <div className="flex flex-row items-start justify-between">
          <p className="mb-2 text-4xl font-bold text-left md:text-5xl">Query Result:</p>
          <p 
            className="text-2xl font-bold cursor-pointer hover:text-blue-600"
            onClick={() => setViewInfo(true)}
          >
            ⓘ
          </p>
        </div>

        {/*Optimized seq AD */}
        <div className="flex flex-row items-end mb-1">
          <p className="text-lg font-bold">Optimized Sequence AD:</p>
          <CopyToClipboard content={result.optimmized_ad} />
        </div>
        <div className="p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg">
          <p className="text-sm">{result.optimmized_ad}</p>
        </div>

        {/*Optimized seq SD */}
        <div className="flex flex-row items-end mb-1">
          <p className="text-lg font-bold">Optimized Sequence SD:</p>
          <CopyToClipboard content={result.optimmized_sd} />
        </div>
        <div className="p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg">
          <p className="text-sm">{result.optimmized_sd}</p>
        </div>

        {/*Peptide seq */}
        <div className="flex flex-row items-end mb-1">
          <p className="text-lg font-bold">Peptide Sequence:</p>
          <CopyToClipboard content={result.peptide_seq} />
        </div>
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