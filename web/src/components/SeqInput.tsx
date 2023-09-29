import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { validateSequence } from '@/utils/validateSequence'

interface Props {
  seq: string
  seqType: string
  setSeq: Dispatch<SetStateAction<string>>
}

const SeqInput: FC<Props> = (props) => {
  // destructure props
  const { seq, setSeq, seqType } = props

  // invalid seq flag
  const [seqIsInvalid, setSeqIsInvalid] = useState<boolean>(false)

  // message
  const [seqValidationMessage, setSeqValidationMessage] = useState<
    null | string
  >(null)

  // styling
  const validStyling =
    'w-full p-2 mb-2 text-sm text-gray-600 border border-black rounded-lg shadow-md md:w-3/4'
  const invalidStyling =
    'w-full p-2 mb-2 text-sm text-red-600 border border-red-600 rounded-lg shadow-md md:w-3/4 focus:border-red-600'

  useEffect(() => {
    const { isValid, message } = validateSequence(seq, seqType)

    if (!isValid) {
      setSeqIsInvalid(true)
      setSeqValidationMessage(message)
    } else {
      setSeqIsInvalid(false)
      setSeqValidationMessage(null)
    }
  }, [seqType, seq])

  return (
    <div className="w-full">
      <textarea
        value={seq}
        onChange={(e) => {
          let s = e.target.value
          s = s.replace(/ {2}|\r\n|\n|\r/gm, '')

          setSeq(s)
        }}
        className={seqIsInvalid ? invalidStyling : validStyling}
        rows={15}
      />
      <div className="absolute text-red-600 translate-x-4 -translate-y-12">
        {seqValidationMessage || ' '}
      </div>
    </div>
  )
}

export default SeqInput
