// import React from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer/Footer";
// import Headers from "../components/Header/Headers";
import '../index.css';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="section">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;



// import Headers from '../components/Header/Headers';
// import Footer from "../components/Footer/Footer";
// import '../index.css';

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <Headers/>
//       <div className="section">
//         {children}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Layout;