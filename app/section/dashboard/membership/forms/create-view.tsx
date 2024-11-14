'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {genderOptions} from '../../../../utils/constants'
import {
    Form
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { CircleX, Plus } from 'lucide-react'
import ButtonComponent from './Button'
import RHFTextField from '@/app/components/RHFTextField'
import RHFSelect from '@/app/components/RHFSelect'
import { CreateMembers, UpdateMember } from '../actions/member-action'
import { useSession } from 'next-auth/react'

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


const CreateMemberForm = ({plans, refetch, isEdit, onClose}:any) => {
    const {data:session} = useSession();
    const { toast } = useToast()
    const [openDialog, setOpenDialog] = useState(false);

    const planOptions = plans?.map((item)=>{
        return{
            label:item?.plan_title,
            value:item?.plan_title,
        }
    })

    const defaultValues = useMemo(()=>({
        name:  isEdit?.member_name || '',
        age: isEdit?.member_age ||"",
        gender: isEdit?.member_gender || "",
        address: isEdit?.member_address || "",
        plans: isEdit?.member_plan_data?.plan_title ||'',
        id:isEdit?.id || ''
    }),[isEdit?.id])


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


    

    useEffect(() => {
        if (isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, reset]);
    
    const values = watch();


    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => {
        setOpenDialog(false);
        reset(defaultValues)
        if(isEdit){
         onClose()

        }
    };
    
    const handleSubmit = useCallback(async(e) => {
      e.preventDefault();
      try {
       
        if(isEdit){
            await UpdateMember({
                ...values,
                branch:session?.user?.branch_id
            });
        }else{
            await CreateMembers({
                ...values,
                branch:session?.user?.branch_id
            });
        }
        handleClose();
        toast({
            title: "Membership",
            description: `You've successfully ${isEdit?'updated':'created'} new member !`,
            variant:'success'
          })
        reset(defaultValues)
        refetch()


      } catch (error) {
        console.log(error)
      }
    },[session?.user, values])

    return (
        <Dialog open={openDialog || isEdit}>
            <Button className="rounded-xl" onClick={handleOpen} variant="default">
                <Plus className="mr-2" fontSize={18} />
                Create Member
            </Button>
            <DialogContent className="bg-white text-black" >
                <DialogHeader className="space-y-5">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{isEdit ? "Edit member":"Add new member"}</DialogTitle>
                        <CircleX className="cursor-pointer" onClick={handleClose} />
                    </div>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit} className="space-y-3 w-full">

                            <RHFTextField  label="Name" control={methods.control} name="name" placeholder="Name" />

                            <div className="grid grid-cols-2 gap-2">
                                <RHFTextField  label="Age" control={methods.control} name="age"  />
                                <RHFSelect  label="Gender" control={methods} name="gender" items={genderOptions}/>
                            </div>

                            {/* <RHFTextField label="gender" control={methods.control} name="gender" placeholder="Gender" /> */}
                            <RHFTextField  label="Address" control={methods.control} name="address"  />
                            <RHFSelect  label="Plans" control={methods} name="plans" items={planOptions}/>
                        
                          

                            <div className="justify-end flex w-full">
                                <ButtonComponent isEdit={isEdit} type="submit" />
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateMemberForm