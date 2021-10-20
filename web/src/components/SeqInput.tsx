import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  seq: string;
  setSeq: Dispatch<SetStateAction<string>>;
}

const SeqInput: FC<Props> = (props) => {
  
  // destructure props
const { seq, setSeq } = props

  return (
    <textarea
        value={seq}
        onChange={e => {
          let seq = e.target.value
          seq = seq.replace((/ {2}|\r\n|\n|\r/gm),"");
          setSeq(seq)
        }}
        className="w-full p-2 mb-2 text-sm text-gray-600 border border-black rounded-lg shadow-md md:w-3/4"
        rows={15}
    />
  )
}

export default SeqInput;