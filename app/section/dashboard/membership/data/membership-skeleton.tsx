import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from '@/components/ui/table'

const MembershipSkeleton = () => {
  return (
    <TableRow>
         <TableCell>
             <Skeleton className="h-[50px] w-[50px] rounded-xl" />
         </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[190px]" />

        </TableCell>
        <TableCell>
             <Skeleton className="h-[50px] w-[30px] rounded-xl" />
         </TableCell>

    </TableRow>
  )
}

export default MembershipSkeleton