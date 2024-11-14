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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form
} from "@/components/ui/form"
import { CircleX, Plus } from 'lucide-react'
import RHFTextField from '@/app/components/RHFTextField'
import RHFSelect from '@/app/components/RHFSelect'
import ButtonComponent from '../../membership/forms/Button'
import { genderOptions } from '@/app/utils/constants'
import { createNewSession } from '../action/SessionAction'
import SwitchComponent from '@/app/components/formfields/switch'
import { useToast } from "@/hooks/use-toast"
import { useSession } from 'next-auth/react'

type CreateSessionFormProps = {
    title:string;
    isEdit:any;
    openSearch:()=>void;
    memberData:any;
    clearMemberData:()=>void;
    refetch:()=>void;
    editData:any;
}


const FormSchema = z.object({
    
})

const CreateSessionForm = ({clearMemberData,editData, memberData, title, isEdit, openSearch, refetch}:CreateSessionFormProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const { toast } = useToast()
    const {data:session} = useSession();


    const defaultValues = useMemo(()=>({
        name:memberData?.member_name ||  isEdit?.session_name || 'dogg',
        age:memberData?.member_age || isEdit?.members?.member_age ||"",
        gender:memberData?.member_gender || isEdit?.session_gender || "",
        address:memberData?.member_address || isEdit?.members?.member_address || "",
        plans:memberData?.member_plan_data?.plan_title || isEdit?.member_plan_data?.plan_title ||'',
        id:memberData?.id ||isEdit?.id || '',
        add_ons:'',
        is_paid:false
    }),[isEdit?.id, memberData])

    
    const handleOpen = () => setOpenDialog(true);

    const handleClose = () => {
        setOpenDialog(false);
        clearMemberData()
    };

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

    const values = watch()
    console.log(values,'values')

    useEffect(() => {
        if (isEdit || memberData) {
            reset(defaultValues);
            setValue('branch',session?.user?.branch_id)
        }
    }, [memberData, reset]);
    

    const onSubmit = useCallback(async(e) => {
      
        try {
          try {
            createNewSession({
                name:values?.name,
                member_id:Number(values?.id),
                branch:session?.user?.branch_id,
                fee:100,
                gender:values?.gender,
                is_paid:values?.is_paid

            }).then((res)=>{
                toast({
                    title: "Session",
                    description: "You've successfully created new session!",
                    variant:'success'
                  })
                  refetch()
                  handleClose()
            reset(defaultValues);

            }).catch((err)=>{
                toast({
                    title: "Session",
                    description: err,
                    variant:'success'
                  })
            })
        } catch (error) {
            console.log(error)
            
        }
        
        } catch (error) {
          console.log(error)
        }
      },[memberData, values, session])

    return (
        <Dialog open={openDialog || memberData || isEdit}>
        <Button className="rounded-xl" onClick={handleOpen} variant="default">
            <Plus className="mr-2"fontSize={18}/>
           {title}
        </Button>
        <DialogContent className="bg-white text-black" >
                <DialogHeader className="space-y-5">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{isEdit ? "Edit Session":"Add New Session"}</DialogTitle>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" onClick={()=>{
                                openSearch();
                                handleClose()
                            }} className="rounded-xl">Member?</Button>
                            <CircleX className="cursor-pointer" onClick={handleClose} />
                        </div>
                    </div>
                    <Form  {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full">
                            <RHFTextField isRequired={true}  label="Name" control={methods.control} name="name"/>

                            <div className="grid grid-cols-2 gap-2 items-end">
                                <RHFTextField  label="Age" control={methods.control} name="age"  />
                                <RHFSelect  label="Gender" control={methods} name="gender" items={genderOptions}/>
                            </div>

                            
                            <RHFTextField  label="Address" control={methods.control} name="address"  />
                            <SwitchComponent label="Is Paid" control={methods.control} name="is_paid"  />
                           
                            
                            <div className="justify-end flex w-full">
                                <ButtonComponent className="rounded-xl" isEdit={isEdit} type="submit" />
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSessionForm