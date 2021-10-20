import Image from 'next/image'
import { FC, useState } from "react";

interface Props {
    content: string;
}

const CopyToClipboard: FC<Props> = (props) => {
    
    // state
    const [copied, setCopied] = useState<boolean>(false)

    const { content } = props

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const handleCopy = () => {
        copyToClipboard(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            className="flex flex-col items-center justify-center px-1 mx-2 text-sm transition-all bg-gray-100 border border-black rounded-md shadow-xl hover:shadow-sm hover:bg-gray-300"
            onClick={handleCopy}
            disabled={copied}
            style={{
                minHeight: "30px"
            }}
        >
            {
              copied ? <span className="mx-1 text-lg font-bold">✓</span> :
              <Image 
                src="/images/clipboard.png" 
                alt="Copy to clipboard"
                height="28"
                width="28"
              />
            }
        </button>
    )
}

export default CopyToClipboard