import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Clima atual',
  description: 'Uma aplicação que mostra o clima da localização da cidade do usuário, com opção de buscar informações sobre o clima de outras cidades e com opção de obter detalhes sobre o clima, feita com Next.js, React.js, TypeScript e TailwindCSS',
}

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-100 `}>{children}</body>
    </html>
  )
}
