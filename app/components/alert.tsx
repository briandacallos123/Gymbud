"use client";

import React, { useEffect, useRef } from 'react';
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
} from "@/components/ui/alert-dialog";

type CustomAlertProps = {
    open: boolean;
};

const CustomAlert = ({ open }: CustomAlertProps) => {
    const openAlert = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (open && openAlert.current) {
            openAlert.current.click();
        }
    }, [open]);

    return (
        <AlertDialog>
            {/* Button used to trigger the alert dialog */}
            <AlertDialogTrigger ref={openAlert} style={{ display: 'none' }}>
                Open
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlert;
