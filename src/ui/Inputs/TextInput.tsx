'use client';

import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { useEffect, useState } from 'react';

interface TextInputProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  size?: SizeType;
  type?: 'text' | 'password';
}

const TextInput = ({ value, onChange, placeholder, size, type }: TextInputProps) => {
  const [val, setVal] = useState<string | undefined>(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setVal(newValue);
    onChange(newValue);
  };
  return <Input value={val} onChange={onValueChange} placeholder={placeholder} size={size} type={type} />;
};

export default TextInput;
