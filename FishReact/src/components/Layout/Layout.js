import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FishAi from '../../pages/FishAi/FishAi';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        {children}
      </main>
      <FishAi />
      <Footer />
    </div>
  );
}

export default Layout;
