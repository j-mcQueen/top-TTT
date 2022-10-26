const store_dom = (() => {
    // store all elements relevant to the game_board without attaching them to global scope
    const restart = document.querySelector(".restart > button");
    const announcer = document.querySelector(".announcements > p");
    const blocks = document.getElementsByClassName("block");
    return { restart, announcer, blocks };
})();

const display_control = (() => {
    const winner = (player, color) => {
        store_dom.announcer.textContent = `${player} wins! Restart game?`;
        store_dom.announcer.setAttribute("style", color);
    }
    return { winner };
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

    const win_conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const results = (mark) => {
       const search = win_conditions.find(condition => condition.every(index => board[index] === mark));
       if (search !== undefined) {
        // highlight winning spaces
        search.forEach(i => {
            store_dom.blocks[i].setAttribute("style", "background-color: rgb(46, 135, 83); transition: 0.7s ease");
        });
        // lock game board
        for (let i = 0; i < store_dom.blocks.length; i++) {
            store_dom.blocks[i].setAttribute("disabled", "disabled");
        };
        // announce winner on display
        if (mark === "X") {
            display_control.winner("P1", "color: gold");
        } else {
            display_control.winner("P2", "color: pink");
        }
       } else {
            // call display function which announces tie to the user
        if (!board.includes("")) console.log("tie"); // prevents early tie being called
       }
    };
    return { board, fill, results };
})();

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
        game_board.results(mark);
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
                mark.add_mark(e); // ensures correct alternation of x and o - prevents "breaking" the turn via multiple clicks on the same space
            }
        }
    };
    return { turn_handler };
})();

const events = (() => {
    for (let i = 0; i < store_dom.blocks.length; i++) {
        store_dom.blocks[i].addEventListener("click", game.turn_handler); // add click events to all 9 board spaces, and call the function which handles the turn and consequently which mark gets rendered to the board
    };
})();