import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';

type PaginationComponentProps = {
    next: () => void;
    previous: () => void;
    total: number;
    payloads: any;

}

const PaginationComponent = ({ next, previous, total, payloads }: PaginationComponentProps) => {



    const isNextShow = total > (payloads?.skip + 5);
    const isPrevShow = payloads?.skip !== 0

    const handleNext = () => next()
    const handlePrevious = () => previous()

    return (
        <Pagination className="flex justify-end">
            <PaginationContent>
                <PaginationItem>
                    <Button onClick={handlePrevious} disabled={!isPrevShow} variant="ghost">Previous</Button>
                     </PaginationItem>
                <PaginationItem>
                    {/* <PaginationLink href="#">1</PaginationLink> */}
                    <Button variant="ghost">1</Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Button onClick={handleNext} disabled={!isNextShow} variant="ghost">Next</Button>

                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent