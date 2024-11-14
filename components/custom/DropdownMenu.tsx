"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Icon} from '@iconify/react'
import { signOut } from 'next-auth/react'
import LinksWIcon from '@/app/components/formfields/linksWIcon'

const DDownMenu = () => {
    return (
        <DropdownMenu>
                
                <DropdownMenuTrigger className="flex justify-end space-x-2">
                    {/* <Icon fontSize={20} icon="mdi:account-cog"/> */}
                    {/* <p className="text-md text-slate-500"></p> */}
                    <LinksWIcon title="My Account" icon="mdi:account-cog"/>
                        
                        </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut()} className="cursor-pointer">Logout</DropdownMenuItem>
               
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DDownMenu