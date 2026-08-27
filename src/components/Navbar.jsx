import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* 左側：網站 Logo 或名字 */}
      <Link href="/" className="text-xl font-bold tracking-tight text-gray-800">
        sutsanyuan.dev
      </Link>

      {/* 右側：分頁連結 */}
      <div className="flex gap-6 font-medium text-gray-600">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/aboutTsan" className="hover:text-blue-600 transition">
          About Tsan
        </Link>
        <Link href="/projects" className="hover:text-blue-600 transition">
          Projects
        </Link>
        <Link href="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
