'use client';
import React from 'react';
import styled, { css } from 'styled-components';

const defaultFontFamily = `"Nunito", sans-serif`;

// type TransformType = 'capitalize' | 'lowercase' | 'uppercase' | 'sentencecase' | 'none';
// type Cursor = 'initial' | 'pointer';
// type Decoration = 'none' | 'underline' | 'line-through';
type FontType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type AlignType = 'left' | 'center' | 'right';
type WeightType = number | 'hairline' | 'lighter' | 'light' | 'normal' | 'bold';

interface TextProps {
  family?: string;
  type?: FontType;
  $size?: number;
  $weight?: WeightType;
  color?: string;
  $align?: AlignType;
  className?: string;
  children?: React.ReactNode;
}

interface ExtendedTextProps extends Omit<TextProps, '$size'> {
  $size: number | string;
}

const fontStyles = css<ExtendedTextProps>`
  font-family: ${({ family }) => family ?? defaultFontFamily};
  font-size: ${({ $size }) => (typeof $size === 'string' ? $size : `${$size}px`)};
  font-weight: ${({ $weight }) => $weight ?? 'normal'};
  text-align: ${({ $align }) => $align ?? 'left'};
  color: ${({ color }) => color ?? 'inherit'};
`;

const P = styled.span<ExtendedTextProps>`
  ${fontStyles}
`;
const H1 = styled.h1<ExtendedTextProps>`
  ${fontStyles}
`;
const H2 = styled.h2<ExtendedTextProps>`
  ${fontStyles}
`;
const H3 = styled.h3<ExtendedTextProps>`
  ${fontStyles}
`;
const H4 = styled.h4<ExtendedTextProps>`
  ${fontStyles}
`;
const H5 = styled.h5<ExtendedTextProps>`
  ${fontStyles}
`;
const H6 = styled.h6<ExtendedTextProps>`
  ${fontStyles}
`;

const Text = (props: TextProps) => {
  switch (props.type) {
    case 'h1':
      return (
        <H1 {...props} $size={props.$size ?? 40} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H1>
      );
    case 'h2':
      return (
        <H2 {...props} $size={props.$size ?? 36} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H2>
      );
    case 'h3':
      return (
        <H3 {...props} $size={props.$size ?? 30} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H3>
      );
    case 'h4':
      return (
        <H4 {...props} $size={props.$size ?? 24} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H4>
      );
    case 'h5':
      return (
        <H5 {...props} $size={props.$size ?? 20} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H5>
      );
    case 'h6':
      return (
        <H6 {...props} $size={props.$size ?? 16} $weight={props.$weight ?? 'bold'}>
          {props.children}
        </H6>
      );
    default:
      return (
        <P {...props} $size={props.$size ?? 18} $weight={props.$weight ?? 'normal'}>
          {props.children}
        </P>
      );
  }
};

export default Text;
