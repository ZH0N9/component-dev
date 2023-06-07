import classNames from "classnames"
import { prefixClass, iconProps } from "./constants"
import style from "./index.module.scss";

export const Icon = (props: iconProps)=>{
    const {name, color,className, size, onClick} = props;
    const cls = classNames({
        [style[`${prefixClass}`]]:true,
        [className as string]: !!className
    })
    const symbolId = `icon-${name}`;
    return (
        <svg aria-hidden="true" className={cls} style={{width: size, height:size,}} onClick={onClick} >
             <use href={symbolId } fill={color} />
        </svg>
    )
}