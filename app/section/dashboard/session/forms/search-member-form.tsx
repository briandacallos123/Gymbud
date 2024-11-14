'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form
} from "@/components/ui/form"
import { CircleX, Plus, SquareMousePointer } from 'lucide-react'
import RHFTextField from '@/app/components/RHFTextField'
import RHFSelect from '@/app/components/RHFSelect'
import ButtonComponent from '../../membership/forms/Button'
import { genderOptions } from '@/app/utils/constants'
import { createNewSession, findMember } from '../action/SessionAction'
import {
    Ban,
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react"
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TableButton from '@/app/components/table/TableButton'
import ConfirmationModal from '../../membership/modal/ConfirmationModal'
import { useSession } from 'next-auth/react'

type SearchMemberFormProps = {
    title: string;
    open: boolean;
    onSearch: () => void;
    onClose: () => void;
    memberSetter:()=>void;
}


const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    age: z.string().min(2, {
        message: "Age shouldn't be empty",
    }),
    plans: z.string().min(2, {
        message: "Plans shouldn't be empty",
    }),
    gender: z.string().min(2, {
        message: "Plans shouldn't be empty",
    }),
})

const SearchMemberForm = ({memberSetter, title, onSearch, open, onClose }: SearchMemberFormProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const {data:session} = useSession()

    const [tableData, setTableData] = useState({
        loading: true,
        data: [],
        totalRecords: 0,
    })


    const defaultValues = useMemo(() => ({
        search: ''
    }), [])

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const methods = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues
    })


    const {
        watch,
        reset,
        setValue,
        getValues,
        register
    } = methods;

    const values = watch();

    useEffect(() => {
        if (values.search) {
            (async () => {
                findMember({
                    search: values.search,
                    branch_id:session?.user?.branch_id
                }).then((res) => {
                    const { data, totalRecords }: any = res;

                    setTableData({
                        ...tableData,
                        data,
                        totalRecords
                    })
                })
            })()
        }
    }, [values.search])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {


        } catch (error) {
            console.log(error)
        }
    }, [])



    const [openSelect, setOpenSelect] = useState(false);
    const [selectedData, setSelectedData] = useState(null)

    const handleSelect = useCallback((row)=>{
        setOpenSelect(true)
        setSelectedData(row);
    },[])

    const handleCloseSelect = useCallback((row)=>{
        setOpenSelect(false)
    },[])


    const handleSelectFinal = useCallback(async()=>{
        memberSetter(selectedData)
        reset()
        onClose()
       
    },[selectedData])

    return (
        <Dialog  open={open && !openSelect}>

            <DialogContent className="bg-white text-black " >
                <DialogHeader className="space-y-5">
                    <div className="flex items-center mb-5 justify-between">
                        <DialogTitle>{title}</DialogTitle>
                        <div className="flex items-center space-x-2">

                            <CircleX className="cursor-pointer" onClick={onClose} />
                        </div>
                    </div>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit} className="space-y-3 w-full">
                            <RHFTextField label="Search Member" control={methods.control} name="search" />
                        </form>

                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Member ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead>
                                               Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {tableData?.data?.map((item) => (
                                            <SearchResultRow
                                                row={item}
                                                key={item?.id}
                                                handleSelect={()=>handleSelect(item)}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Form>
                </DialogHeader>
            </DialogContent>
            <ConfirmationModal onClose={handleCloseSelect} open={openSelect} onConfirm={handleSelectFinal} message="select this data?" variant="default" title="Select" />
        </Dialog>
    )
}

const SearchResultRow = ({row, handleSelect}:any) => {
    const { member_name,id, member_gender,member_membership_expired, member_plan_data, member_address, member_created_at, member_plan, member_age } = row;

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
                {id}
            </TableCell>
            <TableCell className="capitalize">
                {member_name}

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
                 
                    
                                <TableButton variant="success" handleClick={handleSelect} icon={SquareMousePointer} label="Select"/>


                               
                                {/* {!member_membership_expired &&  <TableButton variant="danger"  handleClick={onBan} icon={Ban} label="Set Expired"/> } */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default SearchMemberForm