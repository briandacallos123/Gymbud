'use client';

import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthGuard = ({ children }) => {
    const {data:session} = useSession();

    const router = useRouter();

    if(!session){
        router.push('/');
    }

    return <>
        {children}
    </>
}

export default AuthGuard