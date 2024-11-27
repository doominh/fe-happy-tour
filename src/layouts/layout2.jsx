// import React from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer/Footer";
// import Headers from "../components/Header/Headers";
import '../index.css';
import HeaderPage from '../components/HeaderPage/HeaderPage';

const Layout2 = ({ children }) => {
  return (
    <div>
      <HeaderPage/>
      <div className="section">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

Layout2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout2;