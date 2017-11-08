import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
localStorage.setItem('gameState',JSON.stringify({
      turn : 'X' , 
      turnLocked : false ,
      boardArray : Array(9).fill('') ,
      count : 0 ,
      gameEnded : false 
    })
);
*/
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
