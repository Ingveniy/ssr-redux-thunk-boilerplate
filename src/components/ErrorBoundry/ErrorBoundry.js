import React from 'react';
import './ErrorBoundry.css';
import PropTypes from 'prop-types';

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // Сработает при возникновении ошибок в каком либо компоненте
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    // Тут можно вывести вспомогательный лог
  }

  render() {
    const { state } = this;
    const { children } = this.props;

    if (state.errorInfo) {
      // Если возникла ошибка рендерим ее
      return (
        <>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {state.error && state.error.toString()}
            <br />
            {state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    // Если нет ошибок рендерим обычный компонент
    return children;
  }
}
ErrorBoundry.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default ErrorBoundry;
