import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = (props, title, description, keywords, author) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title></title>
      </Helmet>
      <Header />
      <main style={{ flex: 1 }}>
        <Toaster/>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

