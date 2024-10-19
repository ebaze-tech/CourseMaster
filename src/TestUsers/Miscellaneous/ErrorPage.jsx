// ErrorPage.jsx
import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>We're unable to load the content you requested.</p>
      <button onClick={handleReload}>Try Again</button>
    </div>
  );
};

export default ErrorPage;
