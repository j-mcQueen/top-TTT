const store_dom = (() => {
    // store all elements relevant to the game without attaching them to global scope
    let blocks = document.getElementsByClassName("block");
    let restart = document.querySelector(".restart > button");

    return { blocks, restart };
})();

const game = (() => {
    const board = ["X", "O", "X", 
                   "X", "O", "O",
                   "X", "X", "O"];
    
    const fill_board = () => {
        for (let i = 0; i < store_dom.blocks.length; i++) {
            store_dom.blocks[i].textContent = board[i];
        }
    };

    return { fill_board };
})();

game.fill_board();

const Player = () => {

};

const display = (() => {

})();