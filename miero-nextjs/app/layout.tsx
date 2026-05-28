import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Miero Coffee Bar',
  image: 'https://miero.coffee/assets/photos/bar-interior-menu.jpg',
  url: 'https://miero.coffee/',
  telephone: '+1-206-222-1690',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '665 S King St',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    postalCode: '98104',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.5984,
    longitude: -122.3243,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '07:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '07:00',
      closes: '23:00',
    },
  ],
  servesCuisine: ['Coffee', 'Tea', 'Matcha', 'Korean-American'],
  sameAs: ['https://www.instagram.com/miero.coffeebar'],
}

export const viewport: Viewport = {
  themeColor: '#FAF7F1',
}

export const metadata: Metadata = {
  title: 'Miero Coffee Bar — Seattle Chinatown/ID. Open daily, until late.',
  description:
    "A neighborhood coffee bar in Seattle's Chinatown–International District. Specialty espresso, ceremonial matcha, toffee miso lattes, sparkling Cieros. 665 S King St. Open until 10, weekends until 11.",
  keywords:
    'Miero, Miero Coffee Bar, Seattle coffee, Chinatown International District, CID, specialty coffee, matcha, toffee miso, late night coffee Seattle',
  metadataBase: new URL('https://miero.coffee'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Miero Coffee Bar',
    title: 'Miero Coffee Bar — Seattle CID',
    description: "A neighborhood coffee bar in Seattle's Chinatown–International District. Open daily, until late.",
    url: 'https://miero.coffee/',
    images: [{ url: '/assets/photos/bar-interior-menu.jpg' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miero Coffee Bar — Seattle',
    description: 'Specialty coffee. Ceremonial matcha. Open late. 665 S King St.',
    images: ['/assets/photos/bar-interior-menu.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="anim-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('has-anim');
              setTimeout(function(){
                if(!document.documentElement.classList.contains('anim-ready')){
                  document.documentElement.classList.remove('has-anim');
                }
              },1500);
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
