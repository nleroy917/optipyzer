import Head from 'next/head'

type SeoProps = {
  title?: string
}

export default function Seo(props: SeoProps) {
  return (
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize DNA or protein sequences for multiple species at once, giving preference to one or more expression systems at a time."
      ></meta>
      <title>{props.title}</title>

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/ms-icon-144x144.png"
      />

      {/* Open Graph (OG) */}
      <meta property="og:type" content="website"></meta>
      <meta property="og:title" content="Optipyzer.com"></meta>
      <meta property="og:url" content="https://optipyzer.vercel.app"></meta>
      <meta property="og:image" content="/images/landing.png"></meta>
      <meta
        property="og:description"
        content="A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize DNA or protein sequences for multiple species at once, giving preference to one or more expression systems at a time."
      ></meta>

      {/* Twitter */}
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:creator" content="@NathanJLeRoy"></meta>
      <meta
        name="twitter:description"
        content="A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize DNA or protein sequences for multiple species at once, giving preference to one or more expression systems at a time."
      ></meta>
      <meta name="twitter:title" content="Optipyzer.com"></meta>
      <meta name="twitter:image" content="images/landing.png"></meta>
      <meta name="twitter:image:alt" content="optipyzer landing page"></meta>
    </Head>
  )
}

type Favicons = {
  rel: string
  href: string
  sizes?: string
  type?: string
}

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
]
