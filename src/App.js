import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    
    var intialgameState = JSON.parse(localStorage.getItem('gameState'));
    if(intialgameState.turn === undefined){
      intialgameState.turn = 'X';
      intialgameState.turnLocked = false;
      intialgameState.boardArray = Array(9).fill('');
      intialgameState.count = 0;
      intialgameState.gameEnded = false;
    }
    var intialResult = JSON.parse(localStorage.getItem('result'));
    if(intialResult === undefined ){
      intialResult = '';
    }

    this.state = {
      result : intialResult
    }
    this.gameState = {
      turn : intialgameState.turn , 
      turnLocked : intialgameState.turnLocked ,
      boardArray : intialgameState.boardArray ,
      count : intialgameState.count ,
      gameEnded : intialgameState.gameEnded 
    }

    console.log(JSON.parse(localStorage.getItem('gameState')));
    console.log(this.gameState);
  }

  handleClick(square){
    if(this.gameState.gameEnded || this.gameState.turnLocked) return;

    var squareId = square.id;
    if(this.gameState.boardArray[squareId] === ''){
      console.log(this.gameState.turn);

      square.innerText = this.gameState.turn;
      this.gameState.boardArray[squareId] = this.gameState.turn;
      this.gameState.count = this.gameState.count + 1 ;
      this.gameState.turn = (this.gameState.turn === 'X') ? 'O' : 'X';

      var winner = this.checkWinner();
      var result = '';
      if(winner === 'X'){
        this.gameState.gameEnded = true;
        result = 'Congratulation You won the game' ;
        this.setState({
          result : result  
        });
      }else if(winner === 'O'){
        this.gameState.gameEnded = true;
        result = 'Sorry!! computer won the game'
        this.setState({
          result : result  
        });
      }else if(winner === 'draw'){
        this.gameState.gameEnded = true;
        result = 'Ohhh!! Game is draw' ;
        this.setState ({
          result : result
        });
      }
      this.updateLocalStorage(result);


      if(this.gameState.turn === 'O' && !this.gameState.gameEnded) {
        this.computerCall();
      }

    }
  }  
  
  updateLocalStorage(result){
    localStorage.setItem('gameState',JSON.stringify(this.gameState));  
    localStorage.setItem('result',JSON.stringify(result));        
  }

  restartGame(){
    var intialgameState = {
      turn : 'X' , 
      turnLocked : false,
      boardArray : Array(9).fill('') ,
      count : 0 ,
      gameEnded : false
    }
    localStorage.setItem('gameState',JSON.stringify(intialgameState));
    localStorage.setItem('result',JSON.stringify(''));

    this.gameState = intialgameState;
    console.log(this.gameState);
    console.log("game restarted");
    
    for(var i=0;i<9;i++){
      document.querySelectorAll('.square')[i].innerText = this.gameState.boardArray[i] ;  
    }
    this.setState({
      result : 'Game is restarted'
    });
  }

  computerCall(){
    this.gameState.turnLocked = true;
    setTimeout(()=> {
      do {
        var random = Math.floor(Math.random()*9);
      } while(this.gameState.boardArray[random] !== '');
      this.gameState.turnLocked = false;
      this.handleClick(document.querySelectorAll('.square')[random]);
    }, 500);
  }  
  
  checkWinner(){
    var test = [[0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [3,6,9] , [0,4,8] , [2,4,6]];
    for(var i=0;i<test.length;i++){
      if(this.gameState.boardArray[test[i][0]] === this.gameState.boardArray[test[i][1]] ){
        if(this.gameState.boardArray[test[i][1]] === this.gameState.boardArray[test[i][2]] ){
          if(this.gameState.boardArray[test[i][0]] !== ''){
            return this.gameState.boardArray[test[i][0]];
          }
        }
      }
    }
    if(this.gameState.count === 9)return 'draw';
    return '';
  } 
  
  render() {
    return (
      <div id="game"> 
        <h1>tic_tac_toe Game</h1>
        <div id="board" onClick={ (e)=>this.handleClick(e.target) }>
            <div className="square" id="0"> {this.gameState.boardArray[0]} </div>
            <div className="square" id="1"> {this.gameState.boardArray[1]} </div>
            <div className="square" id="2"> {this.gameState.boardArray[2]} </div>
            <div className="square" id="3"> {this.gameState.boardArray[3]} </div>
            <div className="square" id="4"> {this.gameState.boardArray[4]} </div>
            <div className="square" id="5"> {this.gameState.boardArray[5]} </div> 
            <div className="square" id="6"> {this.gameState.boardArray[6]} </div>
            <div className="square" id="7"> {this.gameState.boardArray[7]} </div>
            <div className="square" id="8"> {this.gameState.boardArray[8]} </div>
        </div>
        <h2> {this.state.result} </h2>
        <button onClick={()=> this.restartGame()}> Restart Game </button>
      </div> 
    );
  }
}

export default App;
