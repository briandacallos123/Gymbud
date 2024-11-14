'use server';
import prisma from "@/prisma/prismaClient";


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const getAllSession = async(data) => {
    const {take, skip, branch, search, paymentStatus } = data;
   try {

   
    const isSearch = (()=>{
        if(search){
            return {
                session_name:{
                    contains:search
                }
            }
        }
    })()
    
    const isPayment = (()=>{
        if(paymentStatus){
            let paymentSearch:any;
            switch(paymentStatus){
                case 1:
                    paymentSearch = {
                        session_is_paid:1
                    };
                    break;
                case 2:
                    paymentSearch = {
                        session_is_paid:2
                    };
                    break;
                case 3:
                    paymentSearch = {
                        session_is_paid:3
                    };
                    break;
            }
            return paymentSearch;
            
        }
    })()

    console.log(isPayment,'????')

    const myDate = formatDate(new Date());
  
    const [result, totalRecords, active, out] = await Promise.all([
        prisma.session.findMany({
            take, 
            skip,
            where:{
                ...isSearch,
                ...isPayment,
                session_branch:Number(branch),
                session_is_deleted:0
            },
            include:{
                branch:true,
                members:true
            }
        }),
        prisma.session.count({
            where:{
                ...isSearch,
                session_branch:Number(branch),
                session_is_deleted:0

            }
        }),
        // active
        prisma.session.findMany({
            where:{
                ...isSearch,
                session_branch:Number(branch),
               session_end:{
                equals:null
               },
               session_is_deleted:0

            }
        }),
        // out
        prisma.session.findMany({
            where:{
                ...isSearch,
                session_branch:Number(branch),
                session_end:{
                    not:{
                        equals:null
                    }   
                },
                session_is_deleted:0

            },
            
        }),
    ])


    return{
        data:result,
        totalRecords,
        active:active?.length,
        out:out?.length
    }
   } catch (error) {
    console.log(error,'error')
    return error;
   }

}

export const createNewSession = async(formData) => {
    const {name, member_id, branch, fee, is_paid, gender} = formData;
    
    try {
        await prisma.session.create({
            data:{
                session_name:name,
                session_member_id:member_id !== 0 ? member_id : null,
                session_gender:gender,
                session_branch: branch,
                session_fee: fee && Number(fee),
                session_is_paid:member_id !== 0 ? 3 : is_paid ? 1 : 2
            }
        })

        return{
            message:"Success"
        }
    } catch (error) {
        console.log(error,'errorrrr');
        return error;
    }
}

export const resetSession = async(formData) => {
    const {data} = formData;
    

    try {
        await prisma.session.create({
            data:{
                session_name:data?.session_name,
                session_member_id:(data?.session_member_id !== 0 && data?.session_member_id && data?.session_member_id) || null,

                session_gender:data?.session_gender,
                session_branch:data?.branch && data?.branch?.id,
                session_fee: data?.session_fee,
                session_is_paid:(data?.session_member_id !== 0 && data?.session_member_id && data?.session_member_id ) ? 3:2
            }
        })

        return{
            message:"Success"
        }
    } catch (error) {
        console.log(error,'errorrrr');
        return error;
    }
}


export const findMember = async(formData) => {
    const {search, branch_id} = formData;


    try {
        const isSearch = (()=>{
            if(search){
                return {
                    member_name:{
                        contains:search
                    }
                }
            }
        })()

        const [result, totalRecords] = await Promise.all([
            prisma.members.findMany({
                where:{
                    ...isSearch,
                    member_is_deleted:0,
                    member_branch:branch_id

                },
                include:{
                    member_plan_data:true
                }
            }),
            prisma.members.findMany({
                where:{
                    ...isSearch,
                    member_is_deleted:0,
                    member_branch:branch_id

                }
            }),
        ])

        return {
            data:result,
            totalRecords:totalRecords?.length
        }

    } catch (error) {
        console.log(error)
        return error;
    }
}

export const outMember = async(formData) => {
    try {
        const {id} = formData;

        console.log(id,'idd')

        const res = await prisma.session.update({
            data:{
                session_isActive:0,
                session_end:new Date()
            },
            where:{
                id:Number(id)
            }
        })
        console.log(res,'res')

        return {
            message:"success"
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}


export const payment = async(formData) => {
    try {
        await prisma.session.update({
            data:{
                session_is_paid:1
            },
            where:{
                id:formData?.id
            }
        })

        return {
            message:"success"
        }
    } catch (error) {
        return error;
    }
}

export const deleteSession = async(formData) => {
    try {
        await prisma.session.update({
            data:{
                session_is_deleted:1
            },
            where:{
                id:formData?.id
            }
        })

        return {
            message:"success"
        }
    } catch (error) {
        return error;
    }
}