import configPromise from '@payload-config';
import '@payloadcms/next/css';
import { RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './admin/importMap.js';
import { serverFunction } from './admin/serverFunctions';

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
