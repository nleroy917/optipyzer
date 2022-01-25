import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import { useState } from 'react';

import { Error } from '@/components/Error';
import Results from '@/components/Results';
import Seo from '@/components/Seo';
import SeqInput from '@/components/SeqInput';
import SeqTypeSelector from '@/components/SeqTypeSelector';
import SpeciesSelector from '@/components/SpeciesSelector';
import WeightSelector from '@/components/WeightSelector';

import { QueryError, QueryResult, Species, Weights } from '@/..';
import { purgeWeights } from '@/utils/purgeWeights';

export default function OptimizePage() {
  // state
  const [seqType, setSeqType] = useState<string>("dna")
  const [species, setSpecies] = useState<Species[]>([])
  const [weights, setWeights] = useState<Weights>({})
  const [seq, setSeq] = useState<string>("")
  const [optimizing, setOptimizing] = useState<boolean>(false)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState<QueryError | null>(null)

  const handleSubmit = () => {
    setOptimizing(true)

    // purge unused species weights
    setWeights(purgeWeights(weights, species))

    // call API
    axios.post<QueryResult>(`${process.env.NEXT_PUBLIC_API_URL}/optimize/${seqType}`, {
      seq: seq,
      org_list: species.map(s => s.id),
      weights: weights
    })
    .then((res: AxiosResponse<QueryResult>) => {
      const data: QueryResult = res.data
      setResult(data)
      setOptimizing(false)
    })
    .catch((err: AxiosError) => {
      setError({
        response: err.response,
      })
      setOptimizing(false)
    })
  }

  // render HTML
  if(error) {
    // render the error
    return (
      <div>
          <Seo title="Error!"/>
          <Error error={error} setError={setError}/>
      </div>
  )
  } else if(result) {
    return (
      <div>
        <Results 
          result={result}
          setResult={setResult}
        />
      </div>
    )
  } else {
    return (
      <>
      <Seo title="Optimize"/>
      <main className="flex flex-col items-start justify-start p-4">
        <div className="text-blue-600 underline">
          <Link href="/">
            Back
          </Link>
        </div>
        <h1 className="py-2 text-4xl font-bold text-blue-600 md:text-6xl">Optimize sequence:</h1>
        <p className="text-lg font-bold text-blue-600">Sequence type:</p>
          <SeqTypeSelector
            setSeqType={setSeqType}
            seqType={seqType}
          />
        <div className="w-full my-1 md:w-3/4">
          <p className="text-lg font-bold text-blue-600">Select species:</p>
          <SpeciesSelector 
            setSpecies={setSpecies}
            species={species}
            setWeights={setWeights}
            weights={weights}
          />
        </div>
        {
          species.length === 0 ?
          <div></div>
          : 
          <div>
            <p className="text-lg font-bold text-blue-600">Adjust weights:</p>
            <div className="flex flex-col w-full mr-2 md:flex-row">
            {
              species.map((s, i) => {
                return (
                  <WeightSelector
                    key={i}
                    s={s}
                    setSpecies={setSpecies}
                    weights={weights}
                    setWeights={setWeights}
                  />
                )
              })
            }
            </div>
          </div>
        }
        <p className="mt-2 text-lg font-bold text-blue-600">Input sequence:</p>
        <SeqInput
          seq={seq}
          setSeq={setSeq}
          seqType={seqType}
        />
        <button
          className="px-4 py-2 my-2 text-lg font-bold text-white transition-all bg-blue-600 border-2 border-blue-600 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-600"
          onClick={() => {
            handleSubmit()
          }}
          disabled={optimizing}
        >
          {optimizing ? "Optimizing..." : "Optimize"}
        </button>
      </main>
      </>
    )
  }
  
}