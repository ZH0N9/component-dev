
import classnames from 'classnames';
import { CSSProperties, useState,UIEventHandler, useRef } from 'react';
import style from './index.module.scss';

type RowType = {
    dataIndex?: string;
    title?: React.ReactNode | JSX.Element;
    size:number;
}
interface VariableSizeListProps {
    rows:RowType[],
    className?:string,
    height?: number
    width?:number,
}

const VariableSizeList = (props:VariableSizeListProps)=>{
    const {rows, className,height = 100,width} = props;
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    const measuredData = useRef<{
        measuredDataMap:{offset:number,size:number}[],
        lastMeasuredItemIndex:number
    }>({
        measuredDataMap:[],
        lastMeasuredItemIndex:-1,
    })
    const itemCounts = rows.length;
    

    const getContainerStyle = ()=>{
        
        return {
            '--containerHeight':`${height}px`,
            '--containerWidth':width?`${width}px`:'`100%'
        } as CSSProperties
    }
    
    const getContentStyle = ()=>{
        let height =0;
        rows.forEach((row)=>{
            height+=row.size;
        })
        return {
            '--contentHeight':`${height}px`
        } as CSSProperties;
    }

    const getItemMetaData = (index:number)=>{
        const {measuredDataMap,lastMeasuredItemIndex} = measuredData.current;
        if(index>lastMeasuredItemIndex){
            let offset = 0;
            if(lastMeasuredItemIndex>=0){
                const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
                offset += lastMeasuredItem.offset + lastMeasuredItem.size;
            }
            for(let i = lastMeasuredItemIndex+1;i<=index;i++){
                const currentItemSize = rows[i].size;
                measuredDataMap[i] = {
                    offset,
                    size: currentItemSize 
                };
                offset += currentItemSize;
            }
            measuredData.current.lastMeasuredItemIndex = index;
        }
        return measuredDataMap[index];
    }

    const getStartIndex = ()=>{
        let index=0;
        while(true){
            const currentOffset = getItemMetaData(index).offset;
            if(scrollOffset<=currentOffset){
                return index;
            }
            if(index>=itemCounts){
                return itemCounts;
            }
            index++;
        }
    }
    const getEndIndex = (startIndex:number)=>{
       const startItem = getItemMetaData(startIndex);
       const maxOffset = startItem.offset + height;
       let offset = startItem.offset+startItem.size;
       let index =startIndex;
       while(index< itemCounts - 1 && offset<= maxOffset){
        index++;
        const currentItem = getItemMetaData(index);
        offset+=currentItem.size;
       }
       return index;
    }

    const getRenderRange = ()=>{
        const startIndex = getStartIndex();
        const endIndex = getEndIndex(startIndex);
        return [
            startIndex,
            endIndex,
            Math.max(0, startIndex-2),
            Math.min(itemCounts, endIndex+2)
        ]
    }

    const getVisibleNode = ()=>{
        const [startIndex,endIndex,finalStartIndex,finalEndIndex] = getRenderRange();
        const items = [];
        // 根据上面计算的索引值，不断添加元素给container
         for (let i = finalStartIndex; i < finalEndIndex; i++) {
            const item = getItemMetaData(i);
             const itemStyle = {
                 position: 'absolute',
                 height: `${item.size}px`,
                 width: '100%',
                 // 计算每个元素在container中的top值
                 top: item.offset,
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

    return <div className={classnames({[style['is-variable-size-list']]:true,[className as string]:!!className})} style={getContainerStyle()} onScroll={handleScroll}>
        <div className={style['is-variable-size-list-content']} style={getContentStyle()}>
            {getVisibleNode()}
        </div>
    </div>
}

export default VariableSizeList;