import React from 'react'
import MainNav from './components/homepage/MainNav'
import Image from 'next/image'
import MainFooter from './components/homepage/MainFooter'
import MainBody from './components/homepage/MainBody'
import prisma from '@/prisma/prismaClient'

const page = async() => {

  return (
    <div className="bg-[url('assets/man.jpg')] min-h-[100vh] w-[100vw] bg-no-repeat bg-cover bg-center">
      <div className="absolute z-50 lg:top-5 w-[100%]">
        <MainNav/>
      </div>

      {/* body */}
      <div className="flex justify-center items-center w-[100vw] h-[100vh] ">
        <MainBody/>
      </div>
      <div className="absolute z-50 bottom-10 w-[100%] flex justify-center">
        <MainFooter/>
      </div>
      
      <div className="absolute z-0 top-0 left-0 bottom-0 right-0  bg-black opacity-30 ">

      </div>
    </div>
  )
}

export default page