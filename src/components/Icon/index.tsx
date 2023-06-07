import classNames from "classnames"
import { prefixClass, iconProps } from "./constants"
import style from "./index.module.scss";
// import all svg in src/icon/svg
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
requireContext.keys().forEach(requireContext)
try {
// 导入src/icons/svg下的所有以.svg结尾的文件
importAll(require.context('../../icons/svg', false, /\.svg$/))
} catch (error) {
console.log(error)
}

export const Icon = (props: iconProps)=>{
    const {name, color,className, size = 10, onClick} = props;
    const cls = classNames({
        [className as string]: !!className
    })
    const symbolId = `#icon-${name}`;
    return (
        <svg aria-hidden="true" className={cls} style={{width: size, height:size, color}} onClick={onClick} >
             <use href={symbolId} fill={color} />
        </svg>
    )
}