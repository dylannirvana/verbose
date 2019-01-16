import React from 'react';
import ReactDOM from 'react-dom';

import GridOrder from './App';
import * as serviceWorker from './serviceWorker';

import './styles/isotope-docs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/album.css';

// The purpose of this file is to assemble the application and render it to the DOM

ReactDOM.render(<GridOrder />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
