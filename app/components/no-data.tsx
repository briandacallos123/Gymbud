import React from 'react'
import NotFoundSVG from '../assets/assets/notFound';
import { TableCell, TableRow } from '@/components/ui/table';

type NoDataProps = {
    notFound:boolean
}

const NoData = ({
    notFound
}:NoDataProps) => {

    if(!notFound){
        return;
    }

  return (
    <TableRow>
        <TableCell colSpan={10}>
            <div className="w-full flex flex-col items-center space-y-5 justify-center p-10">
                <NotFoundSVG/>
                <h6 className="text-slate-500 text-xl">No Data Found!</h6>
            </div>
        </TableCell>
    </TableRow>
  )
}

export default NoData