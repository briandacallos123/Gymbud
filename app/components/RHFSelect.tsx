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

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  type itemsData = {
    value:string;
    label:string;
  }

  type RHFSelectProps = {
    control:any;
    placeholder?:string;
    name:string;
    label:string;
    items:itemsData[]
}

const RHFSelect = ({
    control,
    placeholder,
    name,
    label,
    items
}:RHFSelectProps) => {
    

    return (
        <FormField
            name={name}
            control={control.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select name={name} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items?.map((item)=>(
                                <SelectItem value={item?.value}>{item?.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                   
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RHFSelect