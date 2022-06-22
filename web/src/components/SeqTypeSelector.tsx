import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  seqType: string;
  setSeqType: Dispatch<SetStateAction<string>>;
}

const SeqTypeSelector: FC<Props> = (props) => {
  
  // destructure props
  const {seqType, setSeqType } = props
  
  return (
      <div className="flex flex-row p-2 mb-2 border border-black rounded-lg shadow-md w-max">
        <div className="flex flex-row items-center mr-2">
          <input 
            type="radio" 
            name="sequence_type" 
            value="dna"
            onChange={e => setSeqType(e.target.value)}
            checked={seqType === "dna"}
          />
          <label className="mx-1">DNA</label>
        </div>
        <div className="flex flex-row items-center mr-2">
          <input 
            type="radio" 
            name="sequence_type" 
            value="protein"
            onChange={e => setSeqType(e.target.value)}
            checked={seqType === "protein"}
          />
          <label className="mx-1">Protein</label>
        </div>
      </div>
  )
}

export default SeqTypeSelector