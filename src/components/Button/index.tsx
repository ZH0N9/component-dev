import { buttonProps, prefixClass, sizeClassMap,typeClassMap } from "./constants";
import style from "./index.module.scss";
import classNames from "classnames";
export const Button = (props: buttonProps)=>{
    const {
        type = 'primary',
        size = 'medium',
        disabled = false,
        loading = false,
        block = false,
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
        [style[`${prefixClass}-block`]]: !!block,
        [className as string]:!!className
    });

    return (
        <button className={cls} onClick={onClick} onBlur={onBlur} disabled={disabled} {...restProps}>
            {children}
        </button>
    )
}