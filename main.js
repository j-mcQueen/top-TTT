// UNDERSTAND

// A board array contains all the Xs and Os used in the TTT game. My code loops through the array and adds an X or O to the text content of each corresponding game board block. For example, for block 1, if the first item in the array is an X, X becomes the text content of block 1. 

// The problem arises when players come to click on the game board blocks to add marks. Assuming that a clicked block adds an X or O to the board array, if a player clicks on block 5, this will become item 1 in the board array (assuming it was previously empty), so when the function to render the content of the array to the game board is executed, the mark that was supposed to appear at block 5 will instead appear at block 1. If another block is clicked, this mark will appear at block 2, and so on.

// PLAN

// I think the problem lies in how the function renders the content to the game board. What if you create an array composed of 9 empty strings, and when a block is clicked the intended mark is spliced to that position? Following which, you can associate array item with board space position

// PSEUDOCODE

// 3 - On click, add X to space
// 4 - If space has text, do nothing

const store_dom = (() => {
    // store all elements relevant to the game without attaching them to global scope
    const blocks = document.getElementsByClassName("block");
    const restart = document.querySelector(".restart > button");
    return { blocks, restart };
})();

// create module for all required events
// name click event for game board space variable
// attach event listeners to game board spaces

const game = (() => {
    const board = ["", "", "", 
                   "", "", "", 
                   "", "", "",]; // each empty string represents the corresponding space on the game board
    
    const fill_board = () => {
        for (let i = 0; i < store_dom.blocks.length; i++) {
            store_dom.blocks[i].textContent = board[i];
        };
    };
    return { board, fill_board };
})(); // execute game.fill_board() every time a new marker is added to the board/ array

game.fill_board();

const Player = (mark) => {
    const add_mark = (e) => {
        // on click, add mark to text content of event target button
        if (e.target.textContent === "") {
            e.target.textContent = mark;
        } else {
            // call a display object function maybe?
        }
    };
    return { add_mark };
};

const x = Player("X");
const o = Player("O");

const display = (() => {

})();

const events = ((mark) => {
    for (let i = 0; i < store_dom.blocks.length; i++) {
        store_dom.blocks[i].addEventListener("click", mark.add_mark); // add click events to all 9 game board spaces, and call the function which adds marks to spaces
    };
})(x); // <- should be dynamic, not specifically x or o