import React from 'react'

type TextField = {
    name:string;
    type:string;
    className:any;
    label:string;
    onChange?:any;
}


const TextField = ({name, label, type,className, ...rest}:TextField) => {
  return (
    <div>
        <small className="text-slate-300">{label}</small>
        <input type={type} name={name} className={`p-2 ${className}`} {...rest} />
    </div>
  )
}

export default TextField