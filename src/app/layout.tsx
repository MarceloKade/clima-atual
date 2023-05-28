import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Clima atual',
  description: 'Uma aplicação que mostra o clima da localização atual, feita com Next.js, TypeScript e TailwindCSS, Axios, OpenWeatherMap, Nominatim e WorldTime',
}

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-100 `}>{children}</body>
    </html>
  )
}
