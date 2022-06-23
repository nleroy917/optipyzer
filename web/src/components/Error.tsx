import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'

import { QueryError } from '@/..'

const ErrorHeader = () => {
  return (
    <p className="my-8 text-5xl font-bold text-center">
      Oops! An error occured.
    </p>
  )
}

export interface ErrorObject {
  response?: AxiosResponse
  stack?: Error
}

interface ErrorMessageProps {
  error: ErrorObject
  setError: Dispatch<SetStateAction<QueryError | null>>
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { error, setError } = props
  if (error.response) {
    return (
      <div>
        {error.response ? (
          <div className="p-4 mx-6 bg-blue-200 border-2 border-blue-500 rounded-md shadow-lg">
            <p className="mb-4 text-3xl font-bold text-center md:text-left">
              Error Code: {error.response.status}
            </p>
            <code className="mx-auto break-all">
              {JSON.stringify(error.response.data, null, 2)}
            </code>
            <div className="flex flex-row justify-center mt-4 md:justify-start">
              <Link
                href="https://github.com/nleroy917/optipyzer/issues"
                passHref
              >
                <button className="px-6 py-2 mr-1 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black">
                  Report Issue
                </button>
              </Link>
              <Link href="/optimize" passHref>
                <button
                  onClick={() => setError(null)}
                  className="px-6 py-2 mx-1 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black"
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    )
  } else {
    return (
      <div className="p-4 mx-6 font-bold text-center bg-blue-200 border-2 border-blue-500 rounded-md shadow-md">
        <code>{error.toString()}</code>
        <br></br>
        <code>{error.stack}</code>
        <div className="flex flex-row justify-center mt-4">
          <Link href="https://github.com/nleroy917/optipyzer/issues" passHref>
            <button className="px-6 py-2 mr-1 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black">
              Report Issue
            </button>
          </Link>
          <Link href="/optimize" passHref>
            <button
              onClick={() => setError(null)}
              className="px-6 py-2 mx-1 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

interface ErrorProps {
  error: ErrorObject
  setError: Dispatch<SetStateAction<QueryError | null>>
}

export const Error: FC<ErrorProps> = (props) => {
  const { error, setError } = props
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ErrorHeader />
      <ErrorMessage error={error} setError={setError} />
    </div>
  )
}
