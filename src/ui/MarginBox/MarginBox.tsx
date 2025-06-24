'use client';
import React from 'react';

type MarginType = number | string;

interface MarginBoxProps {
  className?: string;
  children?: React.ReactNode;
  ml?: MarginType;
  mr?: MarginType;
  mt?: MarginType;
  mb?: MarginType;
  mx?: MarginType;
  my?: MarginType;
}

const MarginBox = ({ className, children, mb = 0, ml = 0, mr = 0, mt = 0, mx, my }: MarginBoxProps) => {
  ml = mx ? mx : ml;
  mr = mx ? mx : mr;

  mb = my ? my : mb;
  mt = my ? my : mt;

  return (
    <div
      className={className}
      style={{
        marginLeft: typeof ml === 'string' ? ml : `${ml}px`,
        marginRight: typeof mr === 'string' ? mr : `${mr}px`,
        marginTop: typeof mt === 'string' ? mt : `${mt}px`,
        marginBottom: typeof mb === 'string' ? mb : `${mb}px`,
      }}
    >
      {children}
    </div>
  );
};

export default MarginBox;
