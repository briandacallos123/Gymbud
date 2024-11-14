import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

type ConfirmationModalProps = {
    open:boolean,
    onClose:()=>void;
    onConfirm:()=>void;
    title?:string;
    message?:string;
    label?:string;
    variant:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}
const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
    variant,
    message,
    label
}:ConfirmationModalProps) => {

    const confirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="bg-white text-black">
                <AlertDialogHeader>
                    <AlertDialogTitle className="capitalize">{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                       Are you sure you want to {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <Button onClick={confirm} variant={variant}>{label || 'delete'}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmationModal