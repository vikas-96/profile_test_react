import React from 'react';
import 'react-notifications/lib/notifications.css';
import ReactDOM from 'react-dom/client';
import App from './container/App/App';
import initAxios from './utils/initAxios';
import { NotificationContainer } from 'react-notifications';

initAxios();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <NotificationContainer />
    <App />
  </>
);
