import { ReactNode, CSSProperties } from "react";
export interface tagProps{

    className?:string
    color?:string,
    bordered?: boolean,
    icon?: ReactNode,
    closable?: boolean,  
    closeIcon?:ReactNode,
    children?:ReactNode,
    style?:CSSProperties,
    visible?:boolean,
    onClose?: (e: NewClickEvent)=>void
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export const prefixClass = 'built-in-tag';