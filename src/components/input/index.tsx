import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){

    return(

        <input className="flex border-0 rounded-md h-9 outline-none px-2 mb-3 bg-white max-w-xl w-full"
        {...props}/>

    )

}