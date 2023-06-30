import { ReactNode, CSSProperties } from "react";
export interface tagProps{
    className?:string,
    visible?:boolean,
    color?:string,
    bordered?: boolean,
    icon?: ReactNode,
    closable?: boolean,  
    closeIcon?:ReactNode,
    children?:ReactNode,
    style?:CSSProperties,
    onClose?: (e: NewClickEvent )=>void
    onClick?: (e: NewClickEvent) => void
}
export const prefixClass = 'built-in-tag';