import { useEffect, useState } from "react";
import { radioProps, prefixClass } from "./constants";
import style from "./index.module.scss";
import classNames from "classnames";
export const Radio = (props: radioProps)=>{
    const {
        children, 
        className,
        checked:propChecked ,
        ...restProps
    } = props;
    useEffect(()=>{
        if(typeof propChecked === 'boolean'){
            setChecked(propChecked);
        }
    },[propChecked])
    const [checked, setChecked] = useState<Boolean>(!!propChecked)
    const wrapperCls = classNames({
        [style[`${prefixClass}-wrapper`]]:true
    });
    const radioCls = classNames({
        [style[`${prefixClass}`]]:true,
        [style[`${prefixClass}-checked`]]: checked,
        [className as string]:!!className
    });
    const radioInnerCls = classNames({
        [style[`${prefixClass}-inner`]]:true
    })

    return (
        <label className={wrapperCls}>
            <span className={radioCls} {...restProps}>
                <input type='radio' />
                <span className={radioInnerCls}></span>
            </span>
            <span>{children}</span>
        </label>
    )
}