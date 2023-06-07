import { CSSProperties } from "react";

export interface iconProps extends React.SVGProps<SVGElement>{
    // icon name/type
    name:string,
    className?:string
    color?:string,
    size?:number
    onClick?: (event:React.MouseEvent<SVGElement> ) => void
}
export const prefixClass = 'built-in-icon';