'use client';

import LogoFull from '@/app/assets/logo-full'
import LogoMobile from '@/app/assets/logo-mobile'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { signIn } from 'next-auth/react'
import { useMediaQuery } from "@uidotdev/usehooks";

const MainNav = () => {
    const isLargeDevice = useMediaQuery(
        "(min-width : 993px)"
    );

    if (!isLargeDevice) {
        return (
            <div className="flex lg:hidden justify-between w-full items-center">
                <LogoMobile />
                <GiHamburgerMenu className="text-white" size={25} />
            </div>
        )
    }

    return (
        <nav className="px-3 lg:h-24 flex justify-center ">
            {/* desktop */}
            <div className="hidden lg:flex items-center">
                <Link className="hover:text-[#FFCE00] text-[var(--light-foregorund)]" href="/auth/login">Login</Link>
                <LogoFull />
                <Link className="hover:text-[#FFCE00] text-[var(--light-foregorund)]" href="/auth/connect">Connect</Link>
            </div>

        </nav>
    )
}

export default MainNav