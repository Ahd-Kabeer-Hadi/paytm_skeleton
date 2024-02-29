import { ChangeEvent, FC } from "react";
type InputType = "text" | "password" | "email" | "number";
interface InputBoxProps {
  label: string;
  placeHolder: string;
  onchange? : (event:ChangeEvent<HTMLInputElement>) => void;
  type ?: InputType
}
const InputBox : FC<InputBoxProps> = ({label, placeHolder, type, onchange})=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input onChange={onchange} placeholder={placeHolder} type={type} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}

export default InputBox