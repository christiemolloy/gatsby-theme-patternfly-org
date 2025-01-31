import React from 'react';
import './fullscreen.css';

const FullscreenHTMLTemplate = ({ pageContext }) => (
  <div
    class="ws-fullscreen-example"
    dangerouslySetInnerHTML={{__html: pageContext.code || 'No fullscreen example.'}} />
);

export default FullscreenHTMLTemplate;
