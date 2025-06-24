'use client';
import React, { PropsWithChildren } from 'react';

export type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'inherit';
export type FlexJustifyType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlignItemsType = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
export type FlexWrapType = 'wrap' | 'nowrap' | 'initial' | 'inherit';

export interface FlexProps extends PropsWithChildren {
  className?: string;
  size?: string | number;
  shrink?: string | number;
  direction?: FlexDirectionType;
  justify?: FlexJustifyType;
  align?: FlexAlignItemsType;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  wrap?: FlexWrapType;
  basis?: string | number;
  background?: string;
  onClick?: () => void;
}

const Flex = ({
  children,
  className,
  direction,
  size = 1,
  justify,
  align,
  shrink,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  wrap,
  basis,
  background,
  onClick,
}: FlexProps) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flex: size,
        flexShrink: shrink,
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        flexWrap: wrap,
        flexBasis: typeof basis === 'number' ? `${basis}px` : basis,
        backgroundColor: background,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Flex;
