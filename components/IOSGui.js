import React, { useState, useEffect } from 'react';
import IOSGuiApp from './IOSGuiApp';

const IOSGui = props => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return <IOSGuiApp {...props} />;
};

export default IOSGui;
