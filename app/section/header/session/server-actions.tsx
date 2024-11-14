"use server"
import prisma from "@/prisma/prismaClient"
import { revalidatePath } from "next/cache";

type CreateSessionDataProps = {
    username:string;
    additionals:string;
}

export const CreateSessionData = async(data:any) => {
    const {username, additionals, branch_id} = data;

    await prisma.session.create({
        data:{
            session_name:username,
            session_additionals:additionals,
            session_branch:branch_id
        }
    })
    revalidatePath('/dashboard/session')
}

export const GetMemberOptions = async(data:any) => {
    const {search, take, branch} = data;

    const isSearch = (()=>{
        if(search){
            return {
                member_name:{
                    contains:search
                }
            }
        }
    })()

    const result = await prisma.members.findMany({
        take,
        where:{
            ...isSearch,
            member_is_deleted:0,
            member_branch:Number(branch)
        }
    });

    console.log(result,'resulttt')

    return result;
}