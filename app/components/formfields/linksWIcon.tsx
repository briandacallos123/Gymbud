import React from 'react'
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react';
import Link from 'next/link';

type LinksWIconProps = {
  title?:string;
  icon?:any
  path?:string;
  iconSize?:number;
}

const LinksWIcon = ({title,icon,iconSize, path, ...rest}:LinksWIconProps) => {
  return (
    <div className="flex items-center w-full space-x-3">
      <Icon fontSize={iconSize} className="text-slate-600" icon={icon}/>
      <Link className="text-md text-slate-600" href={path||''} {...rest}>
        {title}
      </Link>
    </div>
  )
}

export default LinksWIcon