import React, { useState } from 'react'
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
    CreditCard,
    Eye,
    MoreHorizontal,
    Pencil,
    RotateCcw,
    SquareArrowOutUpRight,
    Trash2,
} from "lucide-react"
import { dateCompute, formatDate, formatDateReadable, formatDateTime } from '@/app/utils/date-format'
import TableButton from '@/app/components/table/TableButton'
import ConfirmationModal from '../../membership/modal/ConfirmationModal'

const SessionTableRow = ({
    row,
    onDelete,
    onView,
    onBan,
    onEdit,
    onOut,
    onPay,
    onReset
}: any) => {
    const [out, setOut] = useState(false);
    const [isPay, setIsPay] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const { session_name, session_end, session_member_id, session_gender, session_created_at, session_is_paid } = row;

    const openConfirmOut = () => setOut(true)
    const closeConfirmOut = () => setOut(false)

    const openPayment = () => setIsPay(true)
    const closePayment = () => setIsPay(false)


    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const openReset = () => setIsReset(true)
    const closeReset = () => setIsReset(false)

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
                {session_name}
            </TableCell>
            <TableCell className="capitalize">
                {!session_member_id ? <Badge variant={session_is_paid === 1 ? 'success' : 'destructive'} className="capitalize">
                    {session_is_paid === 1 && 'Paid' || session_is_paid === 2 && 'Unpaid'}
                </Badge> :
                    'N/A'
                }



            </TableCell>
            <TableCell className="hidden md:table-cell">

                <Badge variant={session_member_id ? 'success' : 'destructive'} className="capitalize">
                    {session_member_id ? 'Yes' : 'No'}
                </Badge>
                {/* {session_member_id} */}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {formatDateTime(session_created_at)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {session_end ? formatDateTime(session_end) : 'N/A'}
                {/* {dateCompute(member_created_at, member_plan_data?.plan_duration_per_month * 30)} */}
            </TableCell>
            <TableCell>
                <Badge variant={session_end ? 'destructive' : 'success'} className="capitalize">
                    {session_end ? 'Out' : 'Active'}
                </Badge>

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


                        <TableButton variant="success" handleClick={onView} icon={Eye} label="View" />

                        {(session_member_id || session_is_paid !== 2) && !session_end && <TableButton variant="danger" handleClick={openConfirmOut} icon={SquareArrowOutUpRight} label="Out" />}

                        {session_is_paid === 2 && !session_member_id && <TableButton variant="success" handleClick={openPayment} icon={CreditCard} label="Pay" />}

                        <TableButton variant="success" handleClick={onEdit} icon={Pencil} label="Edit" />

                        <TableButton variant="danger" handleClick={openDelete} icon={Trash2} label="Delete" />
                       
                       {(session_is_paid === 1 || session_is_paid === 3) &&  session_end && <TableButton variant="success" handleClick={openReset} icon={RotateCcw} label="Reset" />}


                        {/* {!member_membership_expired &&  <TableButton variant="danger"  handleClick={onBan} icon={Ban} label="Set Expired"/> } */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            <ConfirmationModal message="terminate this session?" variant="destructive" title="Terminate" onConfirm={() => {
                onOut()
                closeConfirmOut()
            }} open={out} onClose={closeConfirmOut} />

            <ConfirmationModal label="Submit" message="make this as paid?" variant="default" title="Payment" onConfirm={() => {
                onPay()
                closePayment()
            }} open={isPay} onClose={closePayment} />

            <ConfirmationModal label="Submit" message="delete this data?" variant="destructive" title="Delete" onConfirm={() => {
                onDelete()
                closeDelete()
            }} open={isDelete} onClose={closeDelete} />

            <ConfirmationModal label="Reset" message="reset this data?" variant="default" title="Reset" onConfirm={() => {
                onReset()
                closeReset()
            }} open={isReset} onClose={closeReset} />
        </TableRow>
    )
}

export default SessionTableRow