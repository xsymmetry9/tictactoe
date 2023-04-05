const playerInput = document.querySelectorAll('.playerInput');
const displayBox = document.querySelector('#displayBox');
let typeOfGame;

var round = 1;
var turn = 'player1';
var board = ['','','','','','','','',''];
var gameOver = false;
var numTurn = 0; //To check for draws

const playerFactory = (name, symbol, isComputer=false) =>{
   
    return{name, symbol, isComputer};
}

// Playing around with objects
// var Players = {
//     X: playerFactory(),
//     Y: playerFactory()
// }

var player1 = playerFactory();
var player2 = playerFactory();

const getSquares = document.querySelectorAll('.square');

function clearBoard(){
    board = ['','','','','','','','',''];
    getSquares.forEach(item =>{
       item.innerHTML = "";
       player1.moves=[];
       player2.moves=[];
       gameOver = false;
    });
   clearWindow();
   removeDrawingBoard();
   round = 1; //resets the number of moves
   displayBox.innerHTML = `It's ${getPlayerTurn().name}'s turn`;
}
function clearWindow(){
   const delMenu = document.querySelector('.newGame-menu');
   delMenu.remove();
}
function newGameMenu(){
   var menuContainer = document.createElement('div'); //Creates a display menu
   var againBtn = document.createElement('button'); //Creates a button for 'Play again'
   var menuBtn = document.createElement('button'); //Creates a button to go back to 'Menu'

   menuContainer.classList.add('newGame-menu'); //Adds style to menu
   //Adds style to button container
   

   againBtn.classList.add('btn-secondary');
   againBtn.setAttribute('id','newGame');
   againBtn.textContent='Again?';

   menuContainer.appendChild(againBtn);

   menuBtn.classList.add('btn-secondary');
   menuBtn.setAttribute('id','menu-btn');
   menuBtn.textContent='Menu';
   menuContainer.appendChild(menuBtn);

   document.querySelector('.window').appendChild(menuContainer);

   var playAgain = document.getElementById('newGame');
   playAgain.addEventListener('click', clearBoard); //Fix this code so that when it is drawn, it deletes the button

   var menu = document.getElementById('menu-btn');
   menu.addEventListener('click', backMenu); 
}

function backMenu(){
    clearBoard();
    boardGame.classList.add('visually-hidden');
    displayName.classList.add('visually-hidden');
    menu.classList.remove('visually-hidden');
}

function result(name){
   if (name ==='no winners'){
    return "It's a draw";
   }
   else{
    return `The winner is ${name}`;
   }
   
}
function move(index, player){
    board[index] = player.symbol; //Adds the move to the board
    getSquares[index].innerHTML = player.symbol; //Displays where the player move on the board
    if (winning(board, player.symbol) && (emptyIndexes != 0))
    {
        gameOver = true; //Can't make more moves after game is over
        displayBox.innerHTML = `${player.name} is the winner`;
        newGameMenu();
    }
    else if(emptyIndexes(board).length == 0)
    {
        gameOver = true;
        displayBox.innerHTML = `It's a draw`;
        newGameMenu();
    }
    else{
        round++;
        displayBox.innerHTML = `It's ${getPlayerTurn().name}'s turn`;
    }
}

function handleSquareClick(event){
    const index = event.target.id;
    if(board[index] === '' && !gameOver) //If this square is empty and there is no winner
    {
        move(index, getPlayerTurn());
        if (getPlayerTurn().isComputer)
        {
            console.log("It's the computer's turn");
            move(computer(), getPlayerTurn());
        }
   
    }
}

function winning(board, player){
    symbol = player;
    if (
        (board[0] == symbol && board[1] == symbol && board[2] == symbol)|| 
        (board[3] == symbol && board[4] == symbol && board[5] == symbol) ||
        (board[6] == symbol && board[7] == symbol && board[8] == symbol) ||
        (board[0] == symbol && board[3] == symbol && board[6] == symbol) ||
        (board[1] == symbol && board[4] == symbol && board[7] == symbol) ||
        (board[2] == symbol && board[5] == symbol && board[8] == symbol) ||
        (board[0] == symbol && board[4] == symbol && board[8] == symbol) ||
        (board[2] == symbol && board[4] == symbol && board[6] == symbol)
    )
    {
        return true;
    }
    else{
        return false;

    }
}

//Returns list of the indexes of empty spots on the board
function emptyIndexes(board){
    let newArr =[];
    for(let i = 0; i <board.length; i++){
        if (board[i] === ''){
            newArr.push(i);
        }
    }
    return newArr;
}
 let scores ={
    X: 1,
    O: -1,
    tie: 0
 };
function minimax(newBoard, player, depth, isMaximizing){
    let result = winning(newBoard, player);
    if(result !== null){
        return scores[result];
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        for (let i = 0; i < board.length - 1; i++){
            if (board[i] == ''){
                board[i] = player2.symbol;
                let score = minimax(board, player2, depth + 1, false);
                board[i] = '';
                bestScore = max(score, bestScore);
            }
        }
        return bestScore;
    }
    else{
        let bestScore = -Infinity;
        for (let i = 0; i < board.length - 1; i++){
            if (board[i] == ''){
                board[i] = player1.symbol;
                let score = minimax(board, player1, depth + 1, true);
                board[i] = '';
                bestScore = min(score, bestScore);
            }
        }
        return bestScore;
    }


}


function drawBoard(a,b,c)
{
    var square = [a,b,c];
    square.forEach(item => {
        var color = document.getElementById(item);
        color.classList.add('drawWinner');
    });
}

function removeDrawingBoard(){
    //All styles are classes
    let elements = document.querySelectorAll('.drawWinner');
    elements.forEach(ele => ele.classList.remove('drawWinner'));
}

function randomNumber(emptyBoard){
    const num = (emptyBoard.length);
    return emptyBoard[Math.floor(Math.random()*num)];
}
function computer(){

    // let bestScore = -Infinity;

    // let move ={};
    let getEmptyBoard = emptyIndexes(board);

    // for (let i = 0; i< board.length-1; i++)
    // {
    //     if (board[i] == '')
    //     {
    //         board[i] = ai; //player2.symbol is a computer
    //         let score = minimax(board, 0, false);
    //         board[i] = '';
    //         if (score > bestScore){
    //             bestScore = score;
    //             move = {i}
    //         }
    //     }
    // }

    if (getEmptyBoard.length > 0)
    {
        return randomNumber(getEmptyBoard);
    }
    else{
        console.log("error");
    }
}

const getPlayerTurn = () =>{
    //If there is no winner, display the player to move first
    //Else display winner
    if (round % 2 != 0)
    {
        return player1;
    }
    else{
        return player2;
    }
}
function displayPlayerName(player1, player2)
{
    const getPlayer1Name = document.getElementById('player1_name');
    const getPlayer2Name = document.getElementById('player2_name');
    getPlayer1Name.innerHTML = player1.name;
    getPlayer2Name.innerHTML = player2.name;
}


// Menu Section 

const submitbtn = document.getElementById('submit-btn');
submitbtn.addEventListener('click', openGame);

const menu = document.querySelector('.menu');
const boardGame = document.querySelector('.board');
const gameTypeOptions = document.querySelectorAll('.gameType');
const displayName = document.getElementById('displayName');

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

function createPlayer(type){
    const SecondPlayerName = document.querySelector('#player2');
    let player = playerFactory();
    if(type === 'single'){
        player = playerFactory('Computer','X', true);
    }
    else
    {
        player = playerFactory(SecondPlayerName.value, 'X', false);
    }
    return player;
}
function openGame(event){

    boardGame.classList.remove('visually-hidden');
    displayName.classList.remove('visually-hidden');
    menu.classList.add('visually-hidden');

    const inputName = document.querySelector('#player1');
    typeOfGame = getGametype();

    //Creates Player 1 Name 
    player1 = playerFactory(inputName.value, "O", false);
    player2 = createPlayer(typeOfGame);

    //Displays player 1 and player 2
    displayPlayerName(player1, player2);
    displayBox.innerHTML = `It's ${getPlayerTurn().name} turn`;

    getSquares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
}


