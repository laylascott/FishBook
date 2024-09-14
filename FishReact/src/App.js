import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ForDevelopers from './pages/ForDevelopers/ForDevelopers';
import AboutUs from './pages/AboutUs/AboutUs';
import Search from './pages/Search/Search'
import FishDetail from  './pages/Search/FishDetail';
import GetStarted from './pages/GetStarted/GetStarted';
import FindFishPage from './pages/FindFish/FindFish';
import FindEquipmentPage from './pages/FindEquipment/FindEquipment';
import Browse from './pages/Browse/Browse';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forDevelopers" element={<ForDevelopers />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/find-fish" element={<FindFishPage />} />
          <Route path="/find-equipment" element={<FindEquipmentPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/fish/:id" element={<FishDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
