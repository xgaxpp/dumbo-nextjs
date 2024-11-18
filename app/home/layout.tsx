import { ReactNode } from 'react'
import Navbar from '@/components/section/navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
} 