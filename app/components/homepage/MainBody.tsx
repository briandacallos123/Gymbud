import React from 'react'
import Button from '../formfields/button'

const MainBody = () => {
  return (
    <div className="w-[100%] text-center lg:w-[700px] relative h-auto py-20 px-10 flex flex-col space-y-5 justify-center items-center">
        <h1 className="z-50 text-2xl text-white">Your Fitness Journey  Starts Here!</h1>
        <Button className="z-50 btn-highlight" type="button">Connect</Button>

        <div className="absolute z-0 top-0 left-0 bottom-0 right-0  bg-black opacity-30 ">
          </div>
    </div>
  )
}

export default MainBody