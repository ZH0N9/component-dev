import { buttonProps, prefixClass, sizeClassMap,typeClassMap } from "./constants";
import style from "./index.module.scss";
import classNames from "classnames";
export const Button = (props: buttonProps)=>{
    const {
        type = 'primary',
        size = 'medium',
        onClick,
        onBlur,
        children, 
        className,
        ...restProps
    } = props;

    const cls = classNames({
        [style[`${prefixClass}`]]:true,
        [style[`${prefixClass}-${sizeClassMap[size]}`]]:!!size,
        [style[`${prefixClass}-${typeClassMap[type]}`]]:!!type,
        [className as string]:!!className
    });

    return (
        <button className={cls} onClick={onClick} onBlur={onBlur} {...restProps}>
            {children}
        </button>
    )
}