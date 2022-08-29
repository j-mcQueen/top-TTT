const game = (() => {
    const board = ["X", "X", "O",
                   "X", "O", "O",
                   "X", "O"];

    return { board, };
})();

const Player = (mark) => {
    const add_mark = () => {

    };
    return { add_mark, };
};

// create players and assign marks to each;
const x = Player("X");
const o = Player("O");

const turn_handler = ((player) => {
    // control flow of game, pass turn from one player to another

    return {  };
})();

const detect_result = (() => {
    // detect win patterns (3 of same type in a column, row or along a diagonal) or tie (no resolution)
    const win = () => {

    };

    const tie = () => {

    };

    return { win, tie };
})();

const announcer = (() => {
    // announce turns, round & game wins

    return {  };
})();

const restart = (() => {
    // game over, restart game and empty contents of board array
    const clear_board = () => {

    };
    return { clear_board, };
})();