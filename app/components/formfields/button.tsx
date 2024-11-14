import React from 'react'

type TextFieldProps = {
    className?:any;
    type:"submit"|"button",
    children:any;
    onClick:any;
}

const Button = ({className,type = 'button', children, ...rest}:TextFieldProps) => {
  return (
    <button 
    type={type} 
    className={`${className}`} 
    {...rest}>{children}</button>
  )
}

export default Button