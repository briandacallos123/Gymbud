import React from 'react'
import GoogleIcon from '../../assets/socials/google-icon'
import { signIn } from 'next-auth/react'

const GoogleButton = () => {
  return (
    <button type="button" className="btn-socials" onClick={()=>signIn('google')}>
      <GoogleIcon />
      <p className="text-sm">Sign in with Google</p>
    </button>
  )
}

export default GoogleButton