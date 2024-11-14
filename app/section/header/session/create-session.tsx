"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CircleX } from "lucide-react"
import { SessionController } from "./session-controller"
import { CreateSessionData } from "./server-actions"
import { useSession } from "next-auth/react"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    additionals: z.string()
})

type CreateSessionProps = {
    onClose: () => void;
}

export function CreateSession({ onClose }: CreateSessionProps) {
    const { toast } = useToast()
    const {data:session} = useSession();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            additionals:""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        CreateSessionData({
            ...data,
            branch_id:session?.user?.branch_id
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

                <div className="flex items-center justify-end">
                    <CircleX className=" cursor-pointer" onClick={onClose} />
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <div className="space-y-3">
                            <FormItem>
                                < FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        </div>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="additionals"
                    render={({ field }) => (
                        <div className="space-y-3">
                            <FormItem>
                                < FormLabel>Additonals</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        </div>
                    )}
                />
                <div className="justify-end flex w-full">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
