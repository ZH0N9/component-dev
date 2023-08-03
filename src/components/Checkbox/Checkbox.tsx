import { checkboxProps, prefixClass } from "./constants";
import style from "./index.module.scss";
import classNames from "classnames";
export const Checkbox = (props: checkboxProps)=>{
    const {
        children, 
        className,
        ...restProps
    } = props;

    const cls = classNames({
        [style[`${prefixClass}`]]:true,
        [className as string]:!!className
    });

    return (
        <div className={cls} {...restProps}>
            {children}
        </div>
    )
}