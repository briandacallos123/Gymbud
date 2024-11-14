'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

const ThemeSelector = () => {
    const [isDark, setDark] = useState(true)

 

    useEffect(()=>{
      if(isDark){
        document.querySelector('#main')?.classList.add('dark')
      }else{
        document.querySelector('#main')?.classList.remove('dark')
      }
    },[isDark])

    const toggleMode = () => setDark(!isDark)

    if(isDark){
        return <Icon onClick={toggleMode} className="cursor-pointer hover:scale-110" icon="ph:sun" fontSize={22}/>
    }

 

  return (
   <Icon onClick={toggleMode} className="hover:text-green-400 cursor-pointer hover:scale-110" icon="pepicons-pop:sun-off" fontSize={22}/>
  )
}

export default ThemeSelector