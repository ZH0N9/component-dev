import { ReactNode, CSSProperties, FormEvent } from "react";
export interface radioProps extends React.HTMLAttributes<HTMLInputElement>{
     value?:string,
     children?: ReactNode,
     className?: string,
     style?: CSSProperties,
     // when checked = false, radio cannot be checked by click
     checked?: boolean,
     disabled?:boolean,
     defaultChecked?:boolean
     onChange?: (event: FormEvent) => void
}

export const prefixClass = 'built-in-radio';
