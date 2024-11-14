
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"

type ButtonComponentProps = {
    type:'button'|'submit',
    isEdit:boolean
}

const ButtonComponent = ({type, isEdit, ...rest}:ButtonComponentProps) => {
    const {pending} = useFormStatus();

  return (
    <Button {...rest} type={type}>{isEdit && 'Update' || pending ? "Loading":"Create"}</Button>
  ) 
}

export default ButtonComponent