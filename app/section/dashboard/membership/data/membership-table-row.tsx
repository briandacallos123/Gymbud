import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
    Ban,
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react"
import { dateCompute, formatDate, formatDateReadable } from '@/app/utils/date-format'
import TableButton from '@/app/components/table/TableButton'

const MemberTableRow = ({
    row,
    onDelete,
    onView,
    onBan,
    onEdit
}: any) => {

    const { member_name, member_gender,member_membership_expired, member_plan_data, member_address, member_created_at, member_plan, member_age } = row;

   
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Avatar>
                    <AvatarImage width="64"
                        height="64" alt="Product image"
                        className="aspect-square rounded-md object-cover" src="https://github.com/shadcn.png" />
                </Avatar>
            </TableCell>
            <TableCell className="font-medium capitalize">
                {member_name}
            </TableCell>
            <TableCell className="capitalize">
                {member_gender}
               
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {member_plan_data?.plan_title}( {member_plan_data?.plan_duration_per_month} months duration)
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {formatDate(member_created_at)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {dateCompute(member_created_at, member_plan_data?.plan_duration_per_month * 30)}
            </TableCell>
            <TableCell>
                <Badge className="capitalize" variant={member_membership_expired ? "destructive":"success"}> {member_membership_expired ? 'Expired':'Active'}</Badge>

            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                 
                    
                            <TableButton variant="success" handleClick={onView} icon={Eye} label="View"/>
                                <TableButton variant="success" handleClick={onEdit} icon={Pencil} label="Edit"/>

                                <TableButton variant="danger"  handleClick={onDelete} icon={Trash2} label="Delete"/>

                               
                                {!member_membership_expired &&  <TableButton variant="danger"  handleClick={onBan} icon={Ban} label="Set Expired"/> }
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default MemberTableRow