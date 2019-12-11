import React, { useState, useEffect } from 'react';
import IOSGuiApp from './IOSGuiApp';

const IOSGui = props => {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }
  return <IOSGuiApp {...props} />;
};

export default IOSGui;
