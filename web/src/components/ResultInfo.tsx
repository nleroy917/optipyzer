import { Dispatch, FC, SetStateAction } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ResultInfo: FC<Props> = (props) => {

    // destructure props
    const { open, setOpen } = props

    return (
      <div className="flex flex-row justify-center">
        <div 
            style={{position: 'absolute', display: open ? 'block' : 'none'}} 
            className="w-10/12 p-2 mt-4 text-sm bg-yellow-400 border-2 border-black rounded-lg shadow-2xl md:w-1/2 -top-0 md:text-base md:top-0"
          >
            <div className="flex flex-row justify-between mx-1">
              <p className="text-lg font-bold">About query results:</p>
              <button
                className="hover:cursor-pointer hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                ⓧ
              </button>
            </div>
            <div className="p-1 font-normal">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit eum quae ratione ducimus sed animi fugit obcaecati, culpa nulla tenetur. Quas, dolorum recusandae? Esse laborum explicabo obcaecati, enim delectus magnam.
            </div>
          </div>
        </div>
    )
}

export default ResultInfo;