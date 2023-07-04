import { ReactNode, CSSProperties } from "react";
export interface inputProps extends React.HTMLAttributes<HTMLDivElement>{
     children?: ReactNode,
     className?: string,
     style?: CSSProperties,
}

export const prefixClass = 'built-in-input';
