import React from 'react'
import MembershipTableData from './data/membership-data-table'
import CreateMemberForm from './forms/create-view'
import prisma from '@/prisma/prismaClient'


const plans = async() => {
    try {
    const response = await prisma.member_plan.findMany();
    return response;
    } catch (error) {
        return error;
    }    
}
const MembershipPage = async() => {
    const plansData = await plans();
  
    return (
        <div className="space-y-10">

          
            <MembershipTableData plans={plansData}/>
        </div>
    )
}

export default MembershipPage