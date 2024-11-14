import React from 'react'
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
import { Icon } from '@iconify/react';

type RHFTextFieldProps = {
    control: any;
    placeholder?: string;
    name: string;
    label: string;
    isRequired?:boolean;
    onChange?:()=>void;
}

const RHFTextField = ({
    control,
    placeholder,
    name,
    label,
    isRequired,
    ...rest
}: RHFTextFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="space-y-3">
                    <FormItem>
                        <FormLabel className="capitalize flex items-center">
                            {isRequired &&  <Icon icon="mdi:required" fontSize={12} className="text-red-500 mr-1"/>}
                            {label}</FormLabel>
                        <FormControl>
                            <Input {...rest} {...field} placeholder={placeholder} {...rest} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
            )}
        />
    )
}

export default RHFTextField;
