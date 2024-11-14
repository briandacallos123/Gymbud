'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SessionSkeleton from './membership-skeleton'
import Image from 'next/image'
import CreateSessionForm from '../forms/create-view'
import { useSession } from 'next-auth/react'
import { deleteSession, getAllSession, outMember, payment, resetSession } from '../action/SessionAction'
import SessionTableRow from './membership-table-row'
import SearchMemberForm from '../forms/search-member-form'
import NoData from '@/app/components/no-data'
import { useToast } from '@/hooks/use-toast'
import PaginationComponent from '@/app/components/table/Pagination'
import { RadialChartText } from '@/app/components/charts/mini-chart/RadialChartText'
import HeaderFiltering from '../forms/header-filtering'
import BarChartComp from '@/app/components/charts/mini-chart/Chart'

const SessionTableData = () => {
    const { data: session } = useSession();

    const [tableData, setTableData] = useState({
        loading: true,
        data: [],
        totalRecords: 0,
        active:0,
        out:0

    })

    const { toast } = useToast()


    const [deleteItem, setDeleteItem] = useState(null)

    const [refetch, setRefetch] = useState(false)

    const [payloads, setPayloads] = useState({
        take: 5,
        skip: 0,
        search: '',
        paymentStatus:''
    })



    const handleFilter = useCallback((name, val:any)=>{
     setPayloads({
        ...payloads,
        [name]:val
     })
    },[payloads])


    useEffect(() => {
        if (session?.user?.branch_id) {
            (async () => {
                setTableData({
                    ...tableData,
                    loading: true
                })

                getAllSession({
                    ...payloads,
                    branch: session?.user?.branch_id
                }).then((res) => {
                    const { data, totalRecords, active, out } = res;

                    setTableData({
                        loading: false,
                        data,
                        totalRecords,
                        active,
                        out
                    })
                })
            })()
        }
    }, [session, payloads?.take,refetch, payloads?.skip, payloads?.search, payloads?.paymentStatus])

    const handleSearch = useCallback((search: string) => {

        setPayloads({
            ...payloads,
            search
        })
    }, [])

    const [openSearch, setOpenSearch] = useState(false);

    const [memberData, setMemberData] = useState(null);

    const memberSetter = useCallback((row)=>{
        setMemberData(row)
        setOpenSearch(true)
    },[])

   

    const openSearchModal = () => setOpenSearch(true);

    const handleRefetch = () => setRefetch(!refetch)

    const closeSearchModal = () => setOpenSearch(false);

    const resetFilter = () => {
        setPayloads({
            take: 5,
            skip: 0,
            search: '',
            paymentStatus:''
        })
    }

    const notFound = !tableData?.loading && !tableData?.data?.length

    const handleOut = useCallback((row)=>{
        outMember({
            id:row?.id
        }).then(()=>{
            toast({
                title: "Success",
                description: "Updated successfully!",
                variant:'success'
              });

              handleRefetch()
        })
    },[handleRefetch])

    const handlePayment = useCallback(async(row) => {
        payment({
            id:row?.id
        }).then(()=>{
            toast({
                title: "Success",
                description: "Updated successfully!",
                variant:'success'
              });

              handleRefetch()
        })
    },[handleRefetch])

    const handleNext = useCallback(() => {
        setPayloads({
            ...payloads,
            skip: payloads.skip += 5
        })
    }, [payloads?.skip, payloads?.take])

    const handlePrevious = useCallback(() => {
        setPayloads({
            ...payloads,
            skip: payloads?.skip - 5,
            take: payloads?.take !== 5 ? payloads?.take - 5 : 5,

        })
    }, [payloads?.skip, payloads?.take])

    const handleDelete = useCallback(async(row) => {
        await deleteSession({
            id:row?.id
        }).then(()=>{
            toast({
                title: "Success",
                description: "Deleted successfully!",
                variant:'success'
              });

              handleRefetch()
        })
    },[handleRefetch])

    const handleReset = useCallback(async(row) => {
        await resetSession({
            data:row
        }).then(()=>{
            toast({
                title: "Success",
                description: "Reset successfully!",
                variant:'success'
              });

              handleRefetch()
        })
    },[handleRefetch])

    const [editData, seteditData] = useState(null)

    const handleEdit= (row) => {
        seteditData(row)
    }


    const clearMemberData = () => {
        setMemberData(null)
        seteditData(null)
    }

    return (

        <div className="space-y-7">
            <div className="flex justify-between items-center">
                <div className="">
                    <h1 className="text-2xl text-slate-600 ">Session</h1>
                    <small className="text-slate-400">
                        Manage all your active customer's session.

                    </small>
                </div>
                <CreateSessionForm  refetch={handleRefetch} clearMemberData={clearMemberData} openSearch={openSearchModal} memberData={memberData} isEdit={editData} title="Create Session" />

                <SearchMemberForm memberSetter={memberSetter} onSearch={handleSearch} onClose={closeSearchModal} open={openSearch} title="Find Member" />


            </div>
            
            <div className="grid grid-cols-3">
             
                <RadialChartText sub={'Member'} variant="default" percentage={360} title="Total" count={tableData?.totalRecords}/>

                <RadialChartText sub={'Member'} variant="success" percentage={(tableData?.active / tableData?.totalRecords) * 360 || 360} title="Active (This Day)" count={tableData?.active}/>
                
                <RadialChartText sub={'Member'} variant="danger" percentage={(tableData?.out / tableData?.totalRecords) * 360 || 360} title="Inactive (This Day)" count={tableData?.out}/>

            </div>

            <div >
                <HeaderFiltering filters={payloads} resetFilter={resetFilter} handleFilter={handleFilter}/>
            </div>

            <Card x-chunk="dashboard-06-chunk-0">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead align="right" className="hidden md:table-cell">
                                    Member
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date & Time Started
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date & Time Out
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Action
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <NoData notFound={notFound}/>

                        <TableBody>
                        {tableData?.loading && [...Array(5)]?.map((item)=>(
                                <SessionSkeleton/>
                            ))}
                            {tableData?.data?.map((item) => (
                                <SessionTableRow
                                    row={item}
                                    key={item?.id}
                                    onView={() => { }}
                                    onBan={() => { }}
                                    onEdit={() => handleEdit(item)}
                                    onDelete={() => handleDelete(item)}
                                    onOut={()=>handleOut(item)}
                                    onPay={()=>handlePayment(item)}
                                    onReset={()=>handleReset(item)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationComponent payloads={payloads} total={tableData?.totalRecords} next={handleNext} previous={handlePrevious} />

                </CardContent>

            </Card>
        </div>
    )
}

export default SessionTableData