import { ReactNode, CSSProperties } from "react";
export interface buttonProps extends React.HTMLAttributes<HTMLButtonElement>{
     // button built-in style
     type?: 'normal'| 'primary' | 'dashed' | 'text',
     // button size
     size?: 'large' | 'medium' | 'small',
     icon?: ReactNode,
     children?: ReactNode,
     className?: string,
     loading?: boolean,
     disabled?:boolean,
     // 是否占据整个parent node width
     block?: boolean,
     style?: CSSProperties,
     onClick?:  React.MouseEventHandler<HTMLButtonElement>,
     onBlur?: React.FocusEventHandler<HTMLButtonElement>,
}

// define native button props
// type nativeButtonProps = {
//     // button html type
//     htmlType?: 'submit' | 'reset' | 'button',
//     onClick?:  React.MouseEventHandler<HTMLButtonElement>,
//     onBlur: React.FocusEventHandler<HTMLButtonElement>,
// } & baseButtonProps
//  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick' | 'onBlur'>;

// define anchor button props
// type anchorButtonProps = {
//    href: string;
//    target?: string;
//    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
// } & baseButtonProps
//  & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'onBlur'>;

// export type buttonProps = Partial<nativeButtonProps & anchorButtonProps>;
export const prefixClass = 'built-in-btn';
export const sizeClassMap = { large: 'lg', medium:'md', small: 'sm' };
export const typeClassMap = { normal:'normal',primary: 'primary', dashed:'dashed', text: 'text' };