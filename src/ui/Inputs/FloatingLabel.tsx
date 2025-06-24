'use client';
import React, { PropsWithChildren, useState } from 'react';
import { SFloatingLabel } from './Input.styled';

interface FloatingLabelProps extends PropsWithChildren {
  label?: string;
  placeholder?: string;
  value?: string;
}

const FloatingLabel = ({ label, value, placeholder, children }: FloatingLabelProps) => {
  const [focus, setFocus] = useState(false);
  const text = placeholder || label;
  const float = value ? value?.length > 0 : focus;
  return (
    <SFloatingLabel onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} $float={float}>
      {children}
      <label>{text}</label>
    </SFloatingLabel>
  );
};

export default FloatingLabel;
