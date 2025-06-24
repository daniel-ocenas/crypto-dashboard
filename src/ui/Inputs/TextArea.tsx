'use client';

import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { useEffect, useState } from 'react';

const { TextArea: AntTextArea } = Input;

interface TextAreaProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  size?: SizeType;
  type?: 'text' | 'password';
}

const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  const [val, setVal] = useState<string | undefined>(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setVal(newValue);
    onChange(newValue);
  };

  return (
    <AntTextArea
      value={val}
      onChange={onValueChange}
      placeholder={placeholder}
      styles={{ textarea: { minHeight: '100px' } }}
    />
  );
};
export default TextArea;
