import React, { useCallback } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ButtonWIcon from '@/app/components/formfields/buttonWIcon'
import { RotateCcw } from 'lucide-react'

export function InputWithButton() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
        </div>
    )
}

const HeaderFiltering = ({filters, handleFilter,resetFilter }: any) => {


    const onSearch = useCallback((name, value) => {
        handleFilter(name, value)
    }, [])

    const onVal = (val) => {
        handleFilter('paymentStatus', val)
    }

    return (
        <div className="flex items-center space-x-3">
            <Button onClick={resetFilter} variant="outline">
                <RotateCcw className="mr-2"/>Reset
            </Button>
            
            <Select value={filters.paymentStatus} onValueChange={onVal}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={1}>Paid</SelectItem>
                    <SelectItem value={2}>Unpaid</SelectItem>
                    <SelectItem value={3}>N/A</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex w-full max-w-sm items-center">
                <Input value={filters.search} onChange={(e) => onSearch('search', e.target.value)} type="email" placeholder="Search User Name..." />
                <Button type="submit">Search</Button>
            </div>
        </div>
    )
}

export default HeaderFiltering