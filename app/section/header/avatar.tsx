'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'


const AvatarProfile = () => {
    const {data:session}:any = useSession();


    return (


        <DropdownMenu>

            <DropdownMenuTrigger className="flex justify-end space-x-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="px-2 py-3">
                    <p className="text-sm capitalize">{session?.user?.name}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut()} className="cursor-pointer">Logout</DropdownMenuItem>
                <DropdownMenuItem>Manage Account</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarProfile