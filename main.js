const store_dom = (() => {
    // store all elements relevant to the game_board without attaching them to global scope
    const blocks = document.getElementsByClassName("block");
    const restart = document.querySelector(".restart > button");
    return { blocks, restart };
})();

const game_board = (() => {
    const board = ["", "", "", 
                   "", "", "", 
                   "", "", "",]; // each empty string represents the corresponding space on the game_board board
    
    const fill = () => {
        for (let i = 0; i < store_dom.blocks.length; i++) {
            store_dom.blocks[i].textContent = board[i];
        };
    };

    return { board, fill };
})(); // execute game_board.fill() every time a new marker is added to the board/ array

const Player = (mark) => {
    const add_mark = (e) => {
        // on click, add mark to text content of event target button
        if (e.target.textContent === "") {
            let data_id = Number(e.target.getAttribute("data-id")); // needs to be an integer for splicing in next step
            game_board.board.splice(data_id, 1, mark); // update board array with mark at the appropriate position
            game_board.fill(); // render contents of array to game_board board
        } else {
            // call a display object function to indicate to the user that you can't place a mark here maybe?
        };
    };
    return { add_mark };
};


const game = (() => {
    let mark;
    const x = Player("X");
    const o = Player("O");

    const turn_handler = (e) => { // supply target of click event, otherwise it gets lost when add_mark() is called
        const empty_board = (item) => item === "";
        if (game_board.board.every(empty_board)) { // if the entire game_board board array is empty, it is a new game, so X goes first, therefore add X
            mark = x;
            mark.add_mark(e);
        } else { // if the board is not empty
            if (e.target.textContent !== "") {
                // call display function here which tells the user "Invalid placement"
            } else {
                mark === x ? mark = o : mark = x;
                mark.add_mark(e);
                // ensures correct alternation of x and o - prevents "breaking" the turn via multiple clicks on the same space
            }
        }
    };
    
    return { turn_handler };
})();

const display = (() => {

})();

const events = (() => {
    for (let i = 0; i < store_dom.blocks.length; i++) {
        store_dom.blocks[i].addEventListener("click", game.turn_handler); // add click events to all 9 board spaces, and call the function which handles the turn and consequently which mark gets rendered to the board
    };
})();