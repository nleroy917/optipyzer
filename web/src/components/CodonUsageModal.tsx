import { Dialog } from '@headlessui/react'
import axios, { AxiosResponse } from 'axios'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

interface CodonUsage {
  organism: {
    org_id: number
    division: string
    assembly: string
    taxid: number
    species: string
    organelle: string
    translation_table: number
    num_CDS: number
    num_codons: number
    GC_perc: number
    GC1_perc: number
    GC2_perc: number
    GC3_perc: number
  }
  counts: {
    [aa: string]: {
      [codon: string]: number
    }
  }
  codon_usage: {
    [aa: string]: {
      [codon: string]: number
    }
  }
}

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  orgId: number | string
}

async function fetchCodonUsage(
  orgId: number | string,
  setCodonUsage: Dispatch<SetStateAction<CodonUsage | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  // call API
  setLoading(true)
  const res: AxiosResponse<CodonUsage> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/species/${orgId}/codons`
  )
  setCodonUsage(await res.data)
  setLoading(false)
}

export const CodonUsageModal: FC<Props> = (props) => {
  const { open, setOpen, orgId } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [codonUsage, setCodonUsage] = useState<CodonUsage>()
  const [selectedCodon, setSelectedCodon] = useState<string>('')

  useEffect(() => {
    if (open) {
      fetchCodonUsage(orgId, setCodonUsage, setLoading)
    }
  }, [open, orgId, setCodonUsage])
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-lg p-2 mx-auto bg-white border-2 border-black rounded-md w-96 min-w-md">
          <Dialog.Title className="border-b border-black">
            <h4 className="text-xl">
              Codon Usage for <span className="font-bold">{orgId}</span>
            </h4>
          </Dialog.Title>
          {codonUsage === undefined || loading ? (
            <div className="w-full p-4">
              <div className="w-full text-center animate-pulse">
                Fetching...
              </div>
            </div>
          ) : (
            <div className="my-2">
              <select
                className="px-3 py-0 rounded-md"
                value={selectedCodon}
                onChange={(e) => setSelectedCodon(e.target.value)}
              >
                <option value={''}>Select Codon</option>
                {Object.keys(codonUsage.codon_usage).map((aa) => (
                  <option key={aa} value={aa}>
                    {aa.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="p-1 my-2">
                {selectedCodon === '' ? (
                  <div>
                    <p className="italic">Select a codon above</p>
                  </div>
                ) : (
                  Object.keys(codonUsage.codon_usage[selectedCodon]).map(
                    (c) => {
                      return (
                        <div key={c}>
                          <span className="mr-1 font-bold">{c}:</span>
                          <span>
                            {Math.round(
                              codonUsage.codon_usage[selectedCodon][c] * 100
                            )}
                            %
                          </span>
                        </div>
                      )
                    }
                  )
                )}
              </div>
            </div>
          )}
          <button
            className="px-4 py-1 text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
