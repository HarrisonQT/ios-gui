// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import IOSGuiApp from './IOSGuiApp';

// eslint-disable-next-line no-unused-vars
function IOSGui(props) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return <IOSGuiApp {...props} />;
}

export default IOSGui;
