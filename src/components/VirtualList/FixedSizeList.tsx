
import classnames from 'classnames';
import { CSSProperties, useState,UIEventHandler } from 'react';
import style from './index.module.scss';
type RowType = {
    dataIndex?: string;
    title?: React.ReactNode | JSX.Element;
}
interface FixedSizeListProps {
    rows:RowType[],
    className?:string,
    colSize?:number,
    height?: number
    width?:number,
}

const FixedSizeList = (props:FixedSizeListProps)=>{
    const {rows, className, colSize = 64, height = 300,width} = props;
    const [scrollOffest, setScrollOffset] = useState<number>(0);
    const itemCounts = rows.length;

    const getContainerStyle = ()=>{
        return {
            '--containerHeight':`${height}px`,
            '--containerWidth':width?`${width}px`:'`100%'
        } as CSSProperties
    }
    const getContentStyle = ()=>{
        return {
            '--contentHeight':`${itemCounts * colSize}px`
        } as CSSProperties
    }
    const getVisibleNode = ()=>{
        //the start node index in visible area
        const startIndex = Math.floor(scrollOffest / colSize);
        console.log('scrollOffest / colSize:',scrollOffest / colSize)
        const finalStartIndex = Math.max(0, startIndex - 2);
        console.log('finalStartIndex: ', finalStartIndex);
        // 可视区能展示的元素的最大个数
        const numVisible = Math.ceil(height / colSize);
        const endIndex = startIndex + numVisible;
        const finalEndIndex = Math.min(itemCounts, endIndex + 2);
        console.log('finalEndIndex: ', finalEndIndex);
        const items = [];
       // 根据上面计算的索引值，不断添加元素给container
        for (let i = finalStartIndex; i < finalEndIndex; i++) {
            const itemStyle = {
                position: 'absolute',
                height: `${colSize}px`,
                width: '100%',
                // 计算每个元素在container中的top值
                top: colSize * i,
                background:'pink'
            } as CSSProperties;
            items.push(
                <div key={i}  className={style['is-fixed-size-list-item']} style={itemStyle}>{rows[i].title}</div>
            );
        }
        return items;
    }

    const handleScroll:UIEventHandler<HTMLDivElement> = (e)=>{
        const {scrollTop} = e.currentTarget as HTMLDivElement;
        setScrollOffset(scrollTop);
    }

    return <div className={classnames({[style['is-fixed-size-list']]:true,[className as string]:!!className})} style={getContainerStyle()} onScroll={handleScroll }>
        <div className={style['is-fixed-size-list-content']} style={getContentStyle()}>
            {getVisibleNode()}
        </div>
    </div>
}

export default FixedSizeList;