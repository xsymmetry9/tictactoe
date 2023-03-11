const playerInput = document.querySelectorAll('.playerInput');
let typeOfGame;
const winningPattern = [
    //Base on Indexes
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8], 
    [0,4,8],
    [2,4,6]];

var turn = 'human';
var board = ['','','','','','','','',''];
let gameOver = false;
const playerFactory = (name, symbol, isComputer=false, isWinner = false) =>{
   
    return{name, symbol, isComputer, moves:[], isWinner};
}

var player1 = playerFactory();
var player2 = playerFactory('computer','x', true);

const getSquares = document.querySelectorAll('.square');
getSquares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
});

function clearBoard(){
    board = ['','','','','','','','',''];
    getSquares.forEach(item =>{
       item.innerHTML = "";
       player1.moves=[];
       player2.moves=[];
       gameOver = false;
    });
   clearWindow();
}
function clearWindow(){
   const result = document.getElementById('result');
   result.removeChild(result.children[0]);
   const delMenu = document.querySelector('.newGame-menu');
   delMenu.remove();
}
function newGameMenu(){
   const menu = document.createElement('div');
   const h2 = document.createElement('h2');
   const button = document.createElement('button');

   menu.classList.add('newGame-menu');
   h2.textContent = 'New Game';
   button.classList.add('btn');
   button.classList.add('btn-success');
   button.setAttribute('id','newGame');
   button.textContent='Play again';

   menu.appendChild(h2);
   menu.appendChild(button);

   document.querySelector('.window').appendChild(menu);

   const playAgain = document.getElementById('newGame');
   playAgain.addEventListener('click', clearBoard);
 
}

function result(name){
   const getContainer = document.getElementById('result');
   const h3 = document.createElement('h3');
   arr = ['text-center','fs-3','fw-semibold', 'text-primary'];
   arr.forEach(item =>{
       h3.classList.add(item);
   })
   h3.textContent = `The winner is ${name}`;
   getContainer.appendChild(h3);
}

function handleSquareClick(event){
    const square = event.target;
    const index = square.id;
    if(board[index] === '' && !gameOver) //If this square is empty and there is no winner
    {
        if (turn == player1.name) 
        {
            //Adds the player's moves
            player1.moves.push(index);
            board[index] = player1.symbol;
            square.innerHTML = player1.symbol;
            isWinner();
            if(gameOver)
            {
                result(player1.name);
                newGameMenu();
            }
            // else if(!checkBoard){
            //     alert('It is a draw');
            // }
            else{
                turn = player2.name;
            }
        }
         
        else{
            //comuter moves

            // Player 2's turn
            player2.moves.push(index);  
            board[index] = player2.symbol;
            square.innerHTML = player2.symbol;
            isWinner();
            if(gameOver){
                result(player2.name);
                newGameMenu();
            }
            // else if(!checkBoard){
            //     alert('It is a draw');
            // }
            else{
                turn = player1.name;
            }
        }
    }       
    else{
        alert('Draw!');
    }
}

function isWinner(){
    winningPattern.forEach(item=>{
        var [a,b,c] = item;
        //Checks the board for winners
        //Having the winning patterns, we should check each square with each pattern
        if (board[a] != '' && board[a] === board[b] && board[b] === board[c])
        {
            gameOver = true;
        }
        else{
            gameOver = false;
        }
    });
}

function checkBoard(){
    board.includes('');  
}

function randomNumber(){
    const num = (board.length);
    return Math.floor(Math.random()*num);
}
function computer(){
    let index;
    do{
        index = randomNumber();
    }
    while(board[index] !== '');
    board[index] = player2.symbol;
    player2.moves.push(index);
    const cell = document.querySelectorAll('.square');
    cell[index].innerHTML = player2.symbol;
}

playerInput.forEach(button =>{
    button.addEventListener('click', (event)=>{

        var i = event.currentTarget.getAttribute('key');

        if (i == 'o')
        {
             console.log('Player goes first');
        }
        else{
            console.log('Computer goes first.');
        }


    })
});

// Menu Section 

const submitbtn = document.getElementById('submit-btn');
submitbtn.addEventListener('click', openGame);

const menu = document.querySelector('.menu');
const boardGame = document.querySelector('.board');
const gameTypeOptions = document.querySelectorAll('.gameType');

// A function that checks if player will play against other players or against a computer
function getGametype(){
    let typeOfGame;
    gameTypeOptions.forEach(item =>{
        if(item.checked)
        {
            typeOfGame = (item.value);
        }
    });
    return typeOfGame;
}
// Add a function that disable Player 2 input
gameTypeOptions.forEach(item =>
    item.addEventListener('click', event =>{
        var getPlayer2 = document.getElementById('player2');
        let value = event.currentTarget.value;
        value === "double" ? getPlayer2.removeAttribute("disabled"): getPlayer2.setAttribute("disabled", true);
    }));
function openGame(event){
    boardGame.classList.remove('hidden');
    menu.classList.add('hidden');
    const inputName = document.querySelector('#player1Name');
    typeOfGame = getGametype();
    if(typeOfGame === 'single'){
        console.log('player vs computer');
    }
    else
    {
        console.log('player vs player');
    }

    //Creates Player 1 Name 
    player1.name = inputName.value;
    player1.symbol = "o";
    player1.isComputer = false;
}
