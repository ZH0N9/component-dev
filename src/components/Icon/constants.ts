import { CSSProperties } from "react";

export interface iconProps{
    // icon name/type
    name:string,
    className?:string
    color?:string,
    width?:number,
    height?:number,
    // spin or not
    spin?:boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export const prefixClass = 'built-in-icon';