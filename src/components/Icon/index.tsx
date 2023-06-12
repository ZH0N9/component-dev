import classNames from "classnames"
import { prefixClass, iconProps } from "./constants"
import style from "./index.module.scss";
// import all svg in src/icon/svg
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
requireContext.keys().forEach(requireContext);
try {
// 导入src/icons/svg下的所有以.svg结尾的文件
importAll(require.context('../../icons/svg', true, /\.svg$/))
} catch (error) {
console.log(error)
}

export const Icon = (props: iconProps)=>{
    const {name, color,className,width, height, spin=false, onClick} = props;
    const cls = classNames({ 
        [className as string]: !!className,
        [style[`${prefixClass}`]]:true,
        [style[`${prefixClass}-spin`]]:spin

    });
    const symbolId = `#icon-${name}`;
    return (
        <span role="img" className={cls} onClick={onClick}>
            <svg aria-hidden="true"style={{width: width?width:'1em', height:height?height:'1em', color}} >
             <use href={symbolId} fill={color} />
            </svg>
        </span>
    )
}