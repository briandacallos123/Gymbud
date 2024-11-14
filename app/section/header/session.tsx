'use client';

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CircleX, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CreateSession} from './session/create-session';
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { GetMemberOptions } from './session/server-actions';

import { cn } from "@/lib/utils"


const CreateNewSession = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [members, setMembers] = useState();
  console.log(members,'membersmembers')

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  useEffect(()=>{
    (async()=>{
      await GetMemberOptions({
        take:10,
        branch:1,
        search:''
      }).then((res)=>{
        setMembers(res)
      })
    })()
  },[])

  const handleOpen2 = () => {
    setOpenDialog2(true)
    setOpenDialog(false)

  };
  const handleClose2 = () => setOpenDialog2(false);

  const CreateForm = () => {
    return (
      <Dialog open={openDialog}>
        <DialogContent className="bg-white space-y-5 text-black min-w-[600px]">
          <DialogHeader className="space-y-5">
            <div className="flex items-center justify-between">
              <DialogTitle >Add new session</DialogTitle>
              <CircleX className=" cursor-pointer" onClick={handleClose} />
            </div>

          </DialogHeader>
          <div className="flex w-full w items-center space-x-2">
            {/* <Input type="email" placeholder="Search member" />
            <Button variant="outline" type="submit">Search</Button>
            <Separator orientation="vertical" />
            <Button type="button" onClick={handleOpen2}>Create</Button> */}

            <Command>
              <CommandInput placeholder="Search Member..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {members?.map((framework) => (
                    <CommandItem
                      key={framework.id}
                      value={framework.id}
                      onSelect={(currentValue) => {
                        console.log(currentValue,'cujrrentvaluee')
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {framework.member_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const CreateForm2 = () => {
    return (
      <Dialog open={openDialog2}>
        <DialogContent className="bg-white space-y-5 text-black min-w-[600px]">
          <CreateSession onClose={handleClose2} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div>
      <Icon onClick={handleOpen} className="cursor-pointer hover:scale-110 hover:text-green-400" icon="fontisto:checkbox-active" fontSize={20} />
      <CreateForm />
      <CreateForm2 />

    </div>
  )
}

export default CreateNewSession

