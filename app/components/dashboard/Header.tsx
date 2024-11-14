import React from 'react'

// components
import NotificationHeaderDesktop from '../../section/header/notification'
import ThemeSelector from '@/app/section/header/theme-selector'
import AvatarProfile from '@/app/section/header/avatar'
import CreateNewSession from '@/app/section/header/session'

const Header = () => {
  return (
    <div className="w-full space-x-5 flex justify-end items-center border-b-slate-100 border-b-2 py-5 px-5">
      <CreateNewSession/>
      <ThemeSelector />
      <NotificationHeaderDesktop />
      <AvatarProfile />

    </div>
  )
}

export default Header