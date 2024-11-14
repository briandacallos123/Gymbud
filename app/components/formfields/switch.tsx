import React from 'react'
import { Switch } from "@/components/ui/switch"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

type SwitchComponentProps = {
    control: any;
    placeholder?: string;
    name: string;
    label: string;
    isRequired?: boolean;
    onChange?: () => void;
}

const SwitchComponent = ({
    control,
    placeholder,
    name,
    label,
    isRequired,
    ...rest
}: SwitchComponentProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="space-y-3">
                    <FormItem>
                        <FormLabel className="capitalize flex items-center">
                            {label}</FormLabel>
                        <FormControl>
                            <Switch checked={field.value}
                                onCheckedChange={field.onChange}
                                {...field} {...rest} />
                            {/* <Input {...rest} {...field} placeholder={placeholder} {...rest} /> */}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
            )}
        />

    )
}

export default SwitchComponent