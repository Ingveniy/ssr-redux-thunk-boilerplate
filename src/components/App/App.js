import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundry';
import Header from '../Header';
import Footer from '../Footer';

const App = ({ route }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
