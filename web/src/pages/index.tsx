import { useRouter } from 'next/router'
import * as React from 'react';

import Seo from '@/components/Seo';

import landing_card from '../../public/images/query_result.png'

export default function HomePage() {
  
  const router = useRouter()

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title="Optipyzer"/>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="px-4 md:max-w-screen-lg">
          <h1 className="py-4 mb-4 text-6xl font-bold text-blue-600 md:text-8xl">Optipyzer</h1>
          <p className="mb-8 text-sm md:text-base md:w-7/12">
            A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize DNA or protein sequences for multiple species at once, giving preference to one or more expression systems at a time. The algorithm utilizes the most recent codon usage data available to dynamically generate an optimal sequence for you in seconds.
          </p>
          <div className="flex flex-row items-center justify-center my-4 md:justify-start">
            <button className="px-8 py-2 mr-2 text-lg font-bold text-white transition-all bg-blue-600 border-2 border-white rounded-lg hover:bg-white hover:border-blue-600 hover:text-blue-600"
            onClick={() => router.push("/optimize")}
            >
              Optimize
            </button>
            <button className="px-8 py-2 mr-2 text-lg font-bold text-blue-600 transition-all border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-white"
            onClick={() => router.push("https://github.com/nleroy917/optipyzer")}
            >
              About
            </button>
          </div>
        </div>
        <div className="fixed hidden mr-4 lg:block lg:top-48 lg:right-12 pb-14" style={{zIndex: -1}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width="650"
              className="z-0 transform skew-y-12 shadow-xl opacity-40"
              src={landing_card.src}
              alt="Query result example."
            />
        </div>
      </main>
      <footer className="bottom-0 w-full px-4 -translate-y-16">
        <div className="flex flex-row items-center text-gray-400 justify-evenly">
          <p>
            Made by Nathan LeRoy and Caleigh Roleck
          </p>
          <a href="https://github.com/NLeRoy917/optipyzer">
            Source
          </a>
          <p>
            © 2021
          </p>
        </div>
      </footer>
    </>
  );
}