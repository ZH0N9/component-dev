import classNames from "classnames"
import { prefixClass, tagProps } from "./constants"
import { Icon } from "../Icon";
import style from "./index.module.scss";
import { CSSProperties, useMemo, useState } from "react";

export const Tag = (props: tagProps)=>{
    const {
        color, 
        className, 
        icon, 
        closeIcon,
        children, 
        closable = false, 
        bordered = true, 
        style: propStyle,
        onClick, 
        onClose
    } = props;
    const [visible, setVisible] = useState(true);
    const isDefinedColor : boolean = !!color && !color.match(/^#/);
    const definedStyles :CSSProperties  = {
        backgroundColor: isDefinedColor? '' : color,
        ...propStyle,
    }
    const cls = classNames({ 
        [className as string]: !!className,
        [style[`${prefixClass}`]]:true,
        [style[`${prefixClass}-${color}`]]:isDefinedColor,
        [style[`${prefixClass}-with-color`]]:!!color && !isDefinedColor,
        [style[`${prefixClass}-borderless`]]: !bordered,
        [style[`${prefixClass}-clickable`]]: !!onClick,

    });
    const iconView = useMemo(()=>{
        return ( <span className={style.icon}> {icon} </span> );
    },[icon])
    const closeIconView = useMemo(()=>{
        return  (
            <span  
                className={style.closeIcon} 
                onClick={(e)=>{
                    setVisible(false);
                    onClose && onClose(e)
                }}
            > 
                { closeIcon? closeIcon : <Icon name="close" />}
            </span>)
    }, [closeIcon, onClose])
    return (
        visible ?
        <span className={cls} style={definedStyles} onClick={onClick} >
            {icon && iconView}
            {children}
            {closable && closeIconView}
        </span>
        : null
    )
}