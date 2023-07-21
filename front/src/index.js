import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import Signin from './login/signin/Signin.jsx';
// import Homepage from './homepage/Homepage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Signin />
  </React.StrictMode>
);