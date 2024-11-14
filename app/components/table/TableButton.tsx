import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import React from 'react'

type TableButtonProps = {
    icon:any;
    label:string;
    handleClick:any;
    variant:'danger'|'success'
}

const TableButton = ({
    icon:Icon,
    label,
    handleClick,
    variant,
    disabled,
    ...rest
}:TableButtonProps) => {

    const variantVal = (()=>{
        switch(variant){
            case 'success':
                return 'text-green-500 text-sm';
            case 'danger':
                return 'text-red-400 text-sm';
            default:
                return 'text-black-400 text-sm';
        }
    })()

  return (
        <DropdownMenuItem className={`${variantVal}  flex items-center hover:bg-gray-100 cursor-pointer space-x-2 p-2 hover:border-none`} onClick={handleClick}>
            <Icon/>
            <p>
                {label}
            </p>
        </DropdownMenuItem>
  )
}

export default TableButton