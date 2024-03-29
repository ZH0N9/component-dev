import classNames from 'classnames';
import { prefixClass, iconProps } from './constants';
import style from './index.module.scss';
// import all svg in src/icon/svg
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  // 导入src/icons/svg下的所有以.svg结尾的文件
  importAll(require.context('../../icons/svg', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

const Icon = (props: iconProps) => {
  const { name, color, rootClassName, className, width, height, style: propStyle, spin = false, onClick } = props;
  const cls = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-spin`]]: spin,
    [rootClassName as string]: !!rootClassName,
  });
  const symbolId = `#icon-${name}`;
  return (
    <span role="img" className={cls} onClick={onClick}>
      <svg
        className={className}
        aria-hidden="true"
        style={{ width: width ? width : '100%', height: height ? height : '100%', color, ...propStyle }}
        fill={color}
      >
        <use href={symbolId} fill={color} />
      </svg>
    </span>
  );
};

export default Icon;
