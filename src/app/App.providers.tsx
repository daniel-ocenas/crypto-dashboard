'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { globalStore } from './AppStore';

interface ProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: ProvidersProps) => {
  return (
    <ReduxProvider store={globalStore}>
      <AntdRegistry>{children}</AntdRegistry>
    </ReduxProvider>
  );
};

export default AppProviders;
