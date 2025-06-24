'use client';
import React from 'react';
import styled from 'styled-components';
import { FlexDirectionType } from './Flex';

const SCenterFlex = styled.div<CenterFlexProps>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ direction }) => direction};
  background-color: ${({ background }) => background};
`;

export interface CenterFlexProps {
  children?: React.ReactNode;
  direction?: FlexDirectionType;
  background?: string;
}

const CenterFlex = ({
  children,
  direction,
  background,
  ...props
}: CenterFlexProps & React.HTMLAttributes<HTMLElement>) => {
  return (
    <SCenterFlex direction={direction} background={background} {...props}>
      {children}
    </SCenterFlex>
  );
};

export default CenterFlex;
