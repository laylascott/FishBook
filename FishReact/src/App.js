import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import FishAi from './pages/FishAi/FishAi';
import ForDevelopers from './pages/ForDevelopers/ForDevelopers';
import AboutUs from './pages/AboutUs/AboutUs';
import Search from './pages/Search/Search'
import FishDetail from  './pages/Search/FishDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fishai" element={<FishAi />} />
          <Route path="/forDevelopers" element={<ForDevelopers />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/search" element={<Search />} />
          <Route path="/fish/:id" element={<FishDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
