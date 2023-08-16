import React, { useEffect } from 'react';

const Alert = ({ type, msg, showAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list, msg]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
