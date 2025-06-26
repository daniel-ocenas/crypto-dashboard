'use client';
import { Resizable } from 're-resizable';
import React, { PropsWithChildren } from 'react'; // Import the necessary hooks from React

interface ResizableBox extends PropsWithChildren {
  initialWidth?: number;
  initialHeight?: number;
}

const ResizableBox = ({ initialWidth = 320, initialHeight = 400, children }: ResizableBox) => {
  return (
    <Resizable
      defaultSize={{
        width: initialWidth,
        height: initialHeight,
      }}
      minWidth={300}
      minHeight={400}
    >
      {children}
    </Resizable>
  );
};

export default ResizableBox;
