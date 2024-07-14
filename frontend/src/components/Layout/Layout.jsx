import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header/>
      <main style={{ flex: 1 }}>
        {props.children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;

