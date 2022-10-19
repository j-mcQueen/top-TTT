const store_dom = (() => {
    // store all elements relevant to the game without attaching them to global scope
    const blocks = document.getElementsByClassName("block");
    const restart = document.querySelector(".restart > button");
    return { blocks, restart };
})();

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
            let data_id = Number(e.target.getAttribute("data-id")); // needs to be an integer for splicing in next step
            game.board.splice(data_id, 1, mark); // update board array with mark at the appropriate position
            game.fill_board(); // render contents of array to game board
        } else {
            // call a display object function to indicate to the user that you can't place a mark here maybe?
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