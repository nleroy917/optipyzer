import { useRouter } from 'next/router'
import * as React from 'react';

import Seo from '@/components/Seo';

export default function HomePage() {
  
  const router = useRouter()

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title="Optipyzer"/>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="px-4 md:max-w-screen-lg">
          <h1 className="py-4 text-6xl font-bold text-blue-600 md:text-8xl">Optipyzer</h1>
          <p className="text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum, at repellendus architecto enim illo eum sequi qui exercitationemmolestiae nostrum, voluptatem repudiandae iure! In aut magni sequi totam velit! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam nihil ab quae inventore ad maxime vel voluptas mollitia cumque fugiat, vero voluptates consequuntur excepturi eaque repellendus quod, officia laudantium at.</p>
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
      </main>
    </>
  );
}