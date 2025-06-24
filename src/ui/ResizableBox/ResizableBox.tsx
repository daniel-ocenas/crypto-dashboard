'use client';
import { Resizable } from 're-resizable';
import React, { PropsWithChildren } from 'react'; // Import the necessary hooks from React

interface ResizableBox extends PropsWithChildren {
  width?: number;
  height?: number;
}

const ResizableBox = ({ children }: ResizableBox) => {
  return (
    <Resizable
      defaultSize={{
        width: 320,
        height: 420,
      }}
      minWidth={300}
      minHeight={400}
    >
      {children}
    </Resizable>
  );
};

export default ResizableBox;
