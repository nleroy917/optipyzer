import { useRouter } from 'next/router'

import Seo from '@/components/Seo'

export default function NotFoundPage() {
  const router = useRouter()
  return (
    <>
      <Seo title="Oops." />
      <main className="h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="mb-4 text-4xl font-bold text-blue-600">
            404: Not Found
          </p>
          <p className="text-xl">{"Oops. I don't know about that page..."}</p>
          <div className="flex flex-row items-center justify-center my-4 md:justify-start">
            <button
              className="px-8 py-2 mr-2 text-lg font-bold text-white transition-all bg-blue-600 border-2 border-white rounded-lg hover:bg-white hover:border-blue-600 hover:text-blue-600"
              onClick={() => router.push('/')}
            >
              Home
            </button>
            <button
              className="px-8 py-2 mr-2 text-lg font-bold text-blue-600 transition-all border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-white"
              onClick={() => router.push('/optimize')}
            >
              Optimize
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
