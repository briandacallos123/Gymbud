
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"


type BlockDetails = {
    title: string;
    total: number;
    description: string;
    icon:any;
    field?:string;
}
const BlockDetails = ({field, title,icon:Icon, total, description }: BlockDetails) => {

    return (
        <Card className="max-w-[250px]" x-chunk="dashboard-01-chunk-0 ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    {field === 'money' && <Icon className="h-4 w-4 text-muted-foreground"/>}
                 <div className="text-2xl font-bold">{total}</div>

                </div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

export default BlockDetails