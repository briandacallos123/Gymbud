"use server"
import prisma from "@/prisma/prismaClient"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const CreateMembers = async(formData:any) => {

    const {name, age, gender, address, plan, branch} = formData;

    const planSelect = await prisma.member_plan.findFirst({
        where:{
            plan_title:plan
        }
    })


     await prisma.members.create({
        data:{
            member_name:name,
            member_age:Number(age),
            member_gender:gender,
            member_address:address,
            member_plan:Number(planSelect?.id),
            member_branch: Number(branch)
        }
    })

    revalidatePath('/membership')
}

export const GetTableData = async(formData:any) => {
   const {take, skip, branch} = formData;
    try {
        const response = await prisma.members.findMany({
            take,
            skip,
            where:{
                member_branch:Number(branch),
                member_is_deleted:0,

            },
            include:{
                member_plan_data:true
            }
        });

        console.log(response,'huh??')
        

        const [all, active, inactive] = await Promise.all([
            prisma.members.findMany({
                where:{
                    member_is_deleted:0,
                member_branch:Number(branch),
                    
                }
            }),
            prisma.members.findMany({
              where: {
                member_is_deleted: 0,
                member_branch:Number(branch),

                member_membership_expired:0, // Example condition for active members
              },
            }),
            prisma.members.findMany({
              where: {
                member_is_deleted: 0,
                member_branch:Number(branch),

                member_membership_expired:1 // Example condition for inactive members
              },
            }),
          ]);


        return {
            data:response,
            totalDataCount:all?.length,
            active:active?.length,
            inactive:inactive?.length
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const DeleteMember = async(formData) => {
    
    try {
        await prisma.members.update({
            data:{
                member_is_deleted:1
            },
            where:{
                id:Number(formData?.id)
            }
        })
        return {
            message:"success"
        }
    } catch (error) {
        return error;
    }
}

export const UpdateMember = async(formData:any) => {

    const {name, age, gender, address, plan, branch,id} = formData;

    const planSelect = await prisma.member_plan.findFirst({
        where:{
            plan_title:plan
        }
    })


     await prisma.members.update({
        data:{
            member_name:name,
            member_age:Number(age),
            member_gender:gender,
            member_address:address,
            member_plan:Number(planSelect?.id),
            member_branch: Number(branch)
        },
        where:{
            id:Number(id)
        }
    })

    return {
        message:"success"
    }
}

export const BanMember = async(formData) => {
    
    try {
        await prisma.members.update({
            data:{
                member_membership_expired:1
            },
            where:{
                id:Number(formData?.id)
            }
        })
        return {
            message:"success"
        }
    } catch (error) {
        return error;
    }
}