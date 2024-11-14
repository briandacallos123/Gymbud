import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LogoFull from '@/app/assets/logo-full'
import {dashboardLinks} from '../../utils/dashboard-links'
import Link from 'next/link'
import LinksWIcon from '../formfields/linksWIcon'
import DDownMenu from '@/components/custom/DropdownMenu'
import Alert from '../../components/alert'
import LogoFullLight from '@/app/assets/logo-full-for-light'

const Sidebar = () => {
    return (
       <aside className="w-[250px]  relative z-50 h-[100vh] border-r ">
            {/* logo */}
            <div className="flex justify-start">
             <LogoFullLight/>
            </div>

            <div className="space-y-5  pl-10 mt-5">
                {dashboardLinks?.map(({id, title, icon, path})=>(
                    <LinksWIcon  title={title} icon={icon} path={path} key={id}/>
                ))}
            </div>
                    <Alert open={true}/>
            <div className="absolute bottom-10 pl-10">
                <DDownMenu/>
            </div>
        </aside>
    )
}

export default Sidebar