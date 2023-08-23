import { ReactNode, CSSProperties } from "react";
export interface AffixProps extends React.HTMLAttributes<HTMLDivElement>{
     children?: ReactNode,
     className?: string,
     style?: CSSProperties,
}

export const prefixClass = 'built-in-affix';
