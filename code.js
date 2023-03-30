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

var turn = 'player1';
var board = ['','','','','','','','',''];
var gameOver = false;
var numTurn = 0; //To check for draws

const playerFactory = (name, symbol, isComputer=false, isWinner = false) =>{
   
    return{name, symbol, isComputer, moves:[], isWinner};
}

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
   numTurn = 0; //resets the number of moves
}
function clearWindow(){
   const result = document.getElementById('result');
   result.removeChild(result.children[0]);
   const delMenu = document.querySelector('.newGame-menu');
   delMenu.remove();
}
function newGameMenu(){
   var menu = document.createElement('div'); //Creates a display menu
   var h2 = document.createElement('h2'); //Creates a h2 heading
   var container = document.createElement('div');
   var againBtn = document.createElement('button'); //Creates a button for 'Play again'
   var menuBtn = document.createElement('button'); //Creates a button to go back to 'Menu'

   menu.classList.add('newGame-menu'); //Adds style to menu
   //Adds style to button container
   var containerClassList = ['d-flex', 'gap-3']; 
   containerClassList.forEach(item => container.classList.add(item));

   h2.textContent = 'New Game';

   var againBtnClassList = ['btn', 'btn-primary'];
   againBtnClassList.forEach(item => againBtn.classList.add(item));
   againBtn.setAttribute('id','newGame');
   againBtn.textContent='Play again';

   menu.appendChild(h2);
   container.appendChild(againBtn);

   var menuBtnClassList = ['btn', 'btn-success'];
   menuBtnClassList.forEach(item => menuBtn.classList.add(item));
   menuBtn.setAttribute('id','menu-btn');
   menuBtn.textContent='Menu';

   menu.appendChild(h2);
   container.appendChild(menuBtn);
   menu.append(container);

   document.querySelector('.window').appendChild(menu);

   var playAgain = document.getElementById('newGame');
   playAgain.addEventListener('click', clearBoard); //Fix this code so that when it is drawn, it deletes the button

   var menu = document.getElementById('menu-btn');
   menu.addEventListener('click', backMenu); 
}

function backMenu(){
    clearBoard();
    boardGame.classList.add('hidden');
    displayName.classList.add('hidden');
    menu.classList.remove('hidden');
}

function result(name){
   const getContainer = document.getElementById('result');
   const h3 = document.createElement('h3');
   arr = ['text-center','fs-3','fw-semibold', 'text-primary'];
   arr.forEach(item =>{
       h3.classList.add(item);
   })
   if (name ==='no winners'){
    h3.textContent = "It's a draw";
   }
   else{
    h3.textContent = `The winner is ${name}`;
   }
   getContainer.appendChild(h3);
}

function handleSquareClick(event){
    const square = event.target;
    const index = square.id;
    if(board[index] === '' && !gameOver) //If this square is empty and there is no winner
    {
        //Player vs Player
        //Player1 makes a move
        if (turn === 'player1') //Checks if it's player1's turn
        {
            player1.moves.push(index); 
            numTurn++;
            board[index]= player1.symbol; //Stores the move in the board[]
            square.innerHTML = player1.symbol; //Draws the move to the board
            isWinner(); //returns if the game is over
            if(gameOver){
                result(player1.name); //Displays the winner
                newGameMenu(); //Displays if the player wants a rematch
            }
            else if(numTurn === 9)
            {
                result("no winners");
                newGameMenu();
            }
            else{
                if(player2.isComputer)
                {
                    computer();//Computer moves but doesn't check if computer has won the game or not
                    numTurn++;
                    isWinner();
                    if(gameOver){
                        result(player2.name);
                        newGameMenu();
                    }
                    else if(numTurn === 9)
                    {
                        result("no winners");
                        newGameMenu();
                    }
                    else{
                        turn = "player1";
                    }
                }
                else{
                    turn ='player2';
                }
            }
        }
        else{ //Player2's turn
            player2.moves.push(index); //Player2 human makes a move
            numTurn++;
            board[index]= player2.symbol; //Stores the move in the board[]
            square.innerHTML = player2.symbol; //Draws the moves on the board
            isWinner(); //Returns if game is over or not
            if(gameOver){
                result(player2.name); //Displays Player2's name
                newGameMenu();//Display if the player wants a rematch
            }
            else if(numTurn === 9)
            {
                alert("It's a draw.");
                newGameMenu();
            }
            else{
                turn ='player1'; //Back to Player 1 turn
            }
        }
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
            drawBoard(a,b,c);
        }
    });
}
var styleArr = ['bg-danger','text-light'];
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
    const getPlayer1Name = document.getElementById('player1_name');
    const getPlayer2Name = document.getElementById('player2_name');
    boardGame.classList.remove('hidden');
    displayName.classList.remove('hidden');
    menu.classList.add('hidden');
    const inputName = document.querySelector('#player1Name');
    typeOfGame = getGametype();

    getSquares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
    player2 = createPlayer(typeOfGame);
    getPlayer2Name.innerHTML = player2.name;


    //Creates Player 1 Name 
    player1 = playerFactory(inputName.value, "O", false);
    //Displays player 1 and player 2
    getPlayer1Name.innerHTML = player1.name;
    getPlayer2Name.innerHTML = player2.name;
}
