import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result : '' 
    }
    this.gameState = {
      turn : 'X' , 
      turnLocked : false ,
      boardArray : Array(9).fill('') ,
      count : 0 ,
      gameEnded : false 
    }
  }

  handleClick(square){
    if(this.gameState.gameEnded || this.gameState.turnLocked) return;

    var squareId = square.id;
    if(this.gameState.boardArray[squareId] === ''){
      
      square.innerText = this.gameState.turn;
      this.gameState.boardArray[squareId] = this.gameState.turn;
      this.gameState.count = this.gameState.count + 1 ;

      var result = this.checkWinner();
      if(result === 'X'){
        this.gameState.gameEnded = true;
        this.setState({
          result : 'Congratulation You won the game'  
        });
      }else if(result === 'O'){
        this.gameState.gameEnded = true;
        this.setState({
          result : 'Sorry!! computer won the game' 
        });
      }else if(result === 'draw'){
        this.gameState.gameEnded = true;
        this.setState ({
          result : 'Ohhh!! Game is draw'
        });
      }
      console.log(this.gameState.turn);

      this.gameState.turn = (this.gameState.turn === 'X') ? 'O' : 'X';

      if(this.gameState.turn === 'O' && !this.gameState.gameEnded) {
        this.computerCall();
      }

    }
  }  
  
  computerCall(){
    this.gameState.turnLocked = true;
    setTimeout(()=> {
      do {
        var random = Math.floor(Math.random()*9);
      } while(this.gameState.boardArray[random] !== '');
      this.gameState.turnLocked = false;
      this.handleClick(document.querySelectorAll('.square')[random]);
    }, 1000);
  }  
  
  checkWinner(){
    var test = [[0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [3,6,9] , [0,4,8] , [2,4,6]];
    for(var i=0;i<test.length;i++){
      if(this.gameState.boardArray[test[i][0]] === this.gameState.boardArray[test[i][1]] ){
        if(this.gameState.boardArray[test[i][1]] === this.gameState.boardArray[test[i][2]] ){
          if(this.gameState.boardArray[test[i][0]] !== ''){
            return this.gameState.turn;
          }
        }
      }
    }
    if(this.gameState.count === 9)return 'draw';
    return '';
  } 

  restartGame(){

  }
  
  render() {
    return (
      <div id="game"> 
        <h1>tic_tac_toe Game</h1>
        <div id="board" onClick={ (e)=>this.handleClick(e.target) }>
            <div className="square" id="0"> </div>
            <div className="square" id="1"> </div>
            <div className="square" id="2"> </div>
            <div className="square" id="3"> </div>
            <div className="square" id="4"> </div>
            <div className="square" id="5"> </div>
            <div className="square" id="6"> </div>
            <div className="square" id="7"> </div>
            <div className="square" id="8"> </div>
        </div>
        <h2> {this.state.result} </h2>
      </div> 
    );
  }
}

export default App;
