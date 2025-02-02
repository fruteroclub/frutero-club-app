import React from 'react'

import Navbar from './navbar'
import Footer from './footer'

const NAVBAR_HEIGHT = '64px' // 5rem / h-20 tw

const PageWithAppbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      <main
        className={`relative min-h-[calc(100vh-64px)] top-[${NAVBAR_HEIGHT}] flex w-full flex-col items-center overflow-x-hidden bg-background`}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PageWithAppbar
