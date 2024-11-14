"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from '@iconify/react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"



const NotificationHeaderDesktop = () => {
    const [openBody, setOpenBody] = useState(false);


    

    const NotificationBody = () => {
        return (
            <Sheet open={openBody}>
                <SheetContent>
                    <SheetHeader>
                        <div className="flex items-center justify-between">
                            <SheetTitle>Notifications</SheetTitle>
                         
                            <Icon className="cursor-pointer hover:scale-105" onClick={()=>setOpenBody(false)} fontSize={22} icon="iconamoon:close"/>
                        </div>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={()=>setOpenBody(!openBody)} className="flex justify-end space-x-2">
                <div
                    className="inline-block"
                    style={{
                        animation: 'bellTilt 1s ease-in-out infinite',
                        animationDelay: '1s',
                    }}
                >
                    <Icon className="hover:text-green-400 hover:scale-110 " fontSize={22} icon="mingcute:notification-fill" />
                </div>
            </DropdownMenuTrigger>

            <NotificationBody/>

        </DropdownMenu>
    )
}



export default NotificationHeaderDesktop