import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import NavBar from './navBar';

const Layout = (props) => (
  <ToastProvider autoDismiss>
    <div>
      <NavBar />
      <main className="h-full">
        { props.children }
      </main>
    </div>
  </ToastProvider>
);

export default Layout;
