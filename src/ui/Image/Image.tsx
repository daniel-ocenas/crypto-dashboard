'use client';
import { default as NextImage } from 'next/image';
import React from 'react';

export const PUBLIC = 'public';
export const URL = 'url';
export type ImageSourceType = typeof PUBLIC | typeof URL;

export interface ImageProps {
  src: string;
  fallback?: string;
  type?: ImageSourceType;
  alt: string;
  fallbackComponent?: React.ReactNode;
  width?: number;
  height?: number;
  cursor?: string;
}

export function imageSrcSwitch(type: ImageSourceType, src?: string): string | undefined {
  if (src === undefined) {
    return undefined;
  }
  switch (type) {
    case URL:
      return src.replace('http://', 'https://');
    case PUBLIC:
      return `/static/images/${src}`;
  }
}

const Image = ({ src, type = PUBLIC, alt, width, height }: ImageProps) => {
  //Loading preview of external images should be handled
  const srcSet = imageSrcSwitch(type, src);

  if (!srcSet) {
    return <></>;
  }

  return (
    <>
      {type === URL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={srcSet} alt={alt} width={width} height={height} />
      ) : (
        <NextImage src={srcSet} alt={alt} width={width} height={height} />
      )}
    </>
  );
};

export default Image;
