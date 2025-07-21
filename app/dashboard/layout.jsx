import React from 'react'
import Header from './_components/Header'
import { Toaster } from 'react-hot-toast'

function Dashboardlayout({children}) {
  return (
    <div>
      <Header />
      <div className='mx-5 sm:mx-20 lg:mx-36'>
         <Toaster position="top-center" reverseOrder={false} />
     {children}
     </div>
    </div>
  )
}

export default Dashboardlayout

