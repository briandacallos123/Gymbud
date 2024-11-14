
'use client';

import LogoFull from '@/app/assets/logo-full'
import Button from '@/app/components/formfields/button'
import TextField from '@/app/components/formfields/textfield'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/context/AuthContext'
import { redirect } from 'next/navigation';
import GoogleButton from '@/app/components/socials-button/google';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useToast } from '@/hooks/use-toast';

const page = () => {
    const {login, authenticated}:any = useAuthContext();
    const [fields, setFields] = useState({username:"", password:""});
    const {data:session} = useSession();
    const { toast } = useToast()

    const router = useRouter();

    useEffect(()=>{
        if(session){
            toast({
                title: "Success",
                description: "You've successfully logged in!",
                variant:'success',
                
              })
            
            router.push('/dashboard')
        }
    },[session])

  
    const handleSubmit = (formData: FormData) => {
        const {username, password} = fields;
        if(!username && !password){
            alert("Fill the fields first!");
            return;
        }
        
        if(username == 'brian' && password == '123'){
            login();
            router.push('/dashboard')
        }else{
            alert("Wrong credentials")
        }
    }

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]:e.target.value
        })
    }   
    return (
        <div className="bg-[url('assets/man.jpg')] min-h-[100vh] w-[100vw] bg-no-repeat bg-cover bg-center flex justify-center items-center">
            <Toaster/>
            <div className="lg:w-[400px] py-10 relative z-50 bg-">

                <div className="w-full flex  justify-center">
                    <LogoFull/>
                </div>

                <div className="z-50">
                    <form className="flex flex-col gap-6 px-10 ">
                        <h1 className="text-xl text-[var(--light-foregorund)]">Login</h1>
                        <TextField onChange={handleChange} label="Username" className="w-full text-black" name="username" type="text" />
                        <TextField onChange={handleChange} label="Password" className="w-full text-black" name="password" type="password" />
                        
                        <div className="flex justify-between">
                            <Link href="#" className="text-white text-sm hover:text-[var(--text-highlight)]">Forgot password?</Link>
                            <Button onClick={handleSubmit} type="button" className="btn-highlight">
                            Login
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] flex-1 bg-gray-400"></div>
                            <p className="text-white text-sm">Or login with</p>
                            <div className="h-[1px] flex-1 bg-gray-400"></div>
                        </div>
                        <div className="w-full">
                            <GoogleButton/>
                        </div>
                    </form>
                </div>
                <div className="absolute -z-10 top-0 left-0 bottom-0 right-0  bg-black opacity-70 ">
                </div>
            </div>

            <div className="absolute z-0 top-0 left-0 bottom-0 right-0  bg-black opacity-30 ">

            </div>

        </div>
    )
}

export default page