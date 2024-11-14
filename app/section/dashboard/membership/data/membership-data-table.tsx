'use client';

import React, { useCallback, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
} from "@/components/ui/card"


import { BanMember, DeleteMember, GetTableData } from '../actions/member-action'; import { useSession } from 'next-auth/react';

import MemberTableRow from './membership-table-row';
import CreateMemberForm from '../forms/create-view';
import PaginationComponent from '@/app/components/table/Pagination';
import ConfirmationModal from '../modal/ConfirmationModal';
import { useToast } from "@/hooks/use-toast"
import MembershipSkeleton from './membership-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import NoData from '@/app/components/no-data';
import { RadialChart } from '@/app/components/charts/mini-chart/RadialChart';
import { RadialChartText } from '@/app/components/charts/mini-chart/RadialChartText';

const MembershipTableData = ({ plans }: any) => {
    const { toast } = useToast()

    const { data: session } = useSession();
    const [tableData, setTableData] = useState({
        loading: true,
        data: [],
        totalRecords: 0,
        active:0,
        inactive:0
    })
    const [deleteItem, setDeleteItem] = useState(null)
    const [refetch, setRefetch] = useState(false)


    const [payloads, setPayloads] = useState({
        take: 5,
        skip: 0
    })

    useEffect(() => {
        if (session?.user?.branch_id) {
            (() => {
                
                setTableData({
                    ...tableData,
                    loading: true
                })

                GetTableData({
                    ...payloads,
                    branch: session?.user?.branch_id,
                    userId:session?.user?.id
                }).then((res) => {
                    const { data, totalDataCount, active, inactive} = res;
                    setTableData({
                        ...tableData,
                        loading: false,
                        data,
                        totalRecords: totalDataCount,
                        active,
                        inactive
                    })
                }).catch((err)=>{
                    console.log(err,'error')
                    setTableData({
                        ...tableData,
                        loading: false
                    })
                })
            })()
        }

    }, [payloads?.take, payloads?.skip, session?.user, refetch])

    const notFound = !tableData?.loading && !tableData?.data?.length
    
    const handleRefetch = () => {
        setRefetch(!refetch)
    }

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

    const handleDelete = useCallback((item) => {
        setDeleteItem(item)
    }, [deleteItem])

    const handleDeleteGo = useCallback(async () => {
        try {
            await DeleteMember({
                id: deleteItem?.id
            });
            toast({
                title: "Delete Member",
                description: "Deleted Successfully",
                variant: 'success'
            });
            handleRefetch()

        } catch (error) {
            console.log(error);

        }
    }, [deleteItem])

    const handleView = () => {

    }

    const [banItem, setBanItem] = useState(null);

    const handleBan = async (item) => {
        setBanItem(item);
    }

    const handleBanGo = async (item) => {
        (async () => {
            await BanMember({
                id: banItem?.id
            })
            toast({
                title: "Update",
                description: "Updated Successfully",
                variant: 'success'
            });
            handleRefetch()
        })()
    }

    const [editItem, setEditItem] = useState(null);

    const handleEdit = (row) => {
        setEditItem(row)
    }

    const handleCloseEdit = (row) => {
        setEditItem(null)
    }

    return (
        <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="">
                    <h1 className="text-2xl text-slate-600 ">Membership</h1>
                    <small className="text-slate-400">
                        Manage your members and monitor their records.

                    </small>
                </div>
                <CreateMemberForm onClose={handleCloseEdit} isEdit={editItem} refetch={handleRefetch} plans={plans} />

            </div>

            <div className="grid grid-cols-3">
                <RadialChartText sub={'Member'} variant="default" percentage={360} title="Total" count={tableData?.totalRecords}/>
                <RadialChartText sub={'Member'} variant="success" percentage={(tableData?.active / tableData?.totalRecords) * 360 || 360} title="Active" count={tableData?.active}/>
                <RadialChartText sub={'Member'} variant="danger" percentage={(tableData?.inactive / tableData?.totalRecords) * 360 || 360} title="Inactive" count={tableData?.inactive}/>

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
                                <TableHead>Gender</TableHead>
                                <TableHead align="right" className="hidden md:table-cell">
                                    Plan
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date Started
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Expiration Date
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
                        <TableBody>
                      
                            {tableData?.loading && [...Array(5)]?.map((item)=>(
                                <MembershipSkeleton/>
                            ))}
                            {tableData?.data?.map((item) => (
                                <MemberTableRow
                                    onDelete={() => {
                                        handleDelete(item)
                                    }}
                                    onView={() => {
                                        handleView(item)
                                    }}
                                    onBan={() => {
                                        handleBan(item)
                                    }}
                                    onEdit={() => {
                                        handleEdit(item)
                                    }}
                                    key={item?.id}
                                    row={item} />
                            ))}
                        <NoData notFound={notFound}/>

                        </TableBody>

                    </Table>
                    <PaginationComponent payloads={payloads} total={tableData?.totalRecords} next={handleNext} previous={handlePrevious} />

                </CardContent>


            </Card>
            <ConfirmationModal message="delete this data?" variant="destructive" title="delete" onConfirm={handleDeleteGo} open={deleteItem} onClose={() => setDeleteItem(null)} />

            <ConfirmationModal message="set this data as inactive?" variant="destructive" title="inactive" onConfirm={handleBanGo} open={banItem} onClose={() => setBanItem(null)} />
        </div>
    )
}

export default MembershipTableData