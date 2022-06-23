import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Seo from '@/components/Seo'

import { ServerInfo } from '@/..'

import github_logo from '../../public/images/github.png'
// import paper from '../../public/images/paper.png'
import landing_card from '../../public/images/query_result.png'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  // instantiate router and state
  const router = useRouter()
  const [version, setVersion] = useState<string>('0.1.0')

  // fetch version on load
  useEffect(() => {
    axios
      .get<ServerInfo>('/api/version')
      .then((res: AxiosResponse<ServerInfo>) => {
        setVersion(res.data.version)
      })
  }, [])

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title="Optipyzer" />

      {/** BODY */}
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="px-4 lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-sm">
          <div className="flex flex-row items-center justify-center md:justify-start">
            <button
              onClick={() =>
                router.push('https://github.com/nleroy917/optipyzer')
              }
              className="flex flex-row items-center px-2 py-1 mr-1 font-bold transition-all bg-blue-200 border-2 border-black rounded-lg cursor-pointer justify-evenly w-28 hover:bg-blue-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img width="20px" src={github_logo.src} alt="GitHub logo" />
              <span className="px-1 text-sm">GitHub</span>
            </button>
            {/* <button
              onClick={() => router.push("https://github.com/nleroy917/optipyzer")} 
              className="flex flex-row items-center w-32 px-2 py-1 mr-1 font-bold transition-all bg-gray-100 border-2 border-black rounded-lg opacity-50 cursor-not-allowed justify-evenly"
            >
              <img
                width="20px"
                src={paper.src}
                alt="Paper logo"
              />
              <span className="px-1 text-sm">Publication</span>
            </button> */}
          </div>
          <h1 className="py-4 mb-4 text-6xl font-bold text-center text-blue-600 md:text-left md:text-8xl">
            Optipyzer
          </h1>
          <p className="mb-8 text-sm text-center md:text-left md:text-base md:w-7/12">
            A fast, effective, and flexible codon optimization tool. Built with
            Python, the algorithm can codon-optimize DNA or protein sequences
            for multiple species at once, giving preference to one or more
            expression systems at a time. The algorithm utilizes the most recent
            codon usage data available to dynamically generate an optimal
            sequence for you in seconds.
          </p>
          <div className="flex flex-row items-center justify-center my-4 md:justify-start">
            <button
              className="px-8 py-2 mr-2 text-lg font-bold text-white transition-all bg-blue-600 border-2 border-white rounded-lg hover:bg-blue-700"
              onClick={() => router.push('/optimize')}
            >
              Optimize
            </button>
            <button
              className="px-8 py-2 mr-2 text-lg font-bold text-blue-600 transition-all border-2 border-blue-600 rounded-lg hover:bg-gray-100"
              onClick={() =>
                router.push('https://github.com/nleroy917/optipyzer')
              }
            >
              About
            </button>
          </div>
        </div>
        <div
          className="fixed hidden mr-4 lg:block lg:top-1/3 lg:right-12 pb-14 xl:right-36"
          style={{ zIndex: -1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="650"
            className="z-0 transform skew-y-12 shadow-xl opacity-40"
            src={landing_card.src}
            alt="Query result example."
          />
        </div>
      </main>

      {/** FOOTER */}
      <footer className="bottom-0 w-full px-4 -translate-y-20">
        <div className="flex flex-col items-center justify-center text-xs text-gray-400 md:flex-row md:justify-evenly md:text-base">
          <p className="my-1">© {new Date().getFullYear()}</p>
          <a
            href="https://github.com/NLeRoy917/optipyzer"
            className="my-1 hover:underline"
          >
            v{version}
          </a>
          <p className="my-1">Made by Nathan LeRoy and Caleigh Roleck</p>
        </div>
      </footer>
    </>
  )
}

export default HomePage
