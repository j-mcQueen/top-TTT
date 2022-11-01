const store_dom = (() => {
    // store all elements relevant to the game_board without attaching them to global scope
    const restart = document.querySelector(".restart > button");
    const announcer = document.querySelector(".announcements > p");
    const tiles = document.getElementsByClassName("tile");
    return { restart, announcer, tiles };
})();

const display_control = (() => {
    const reset = () => {
        store_dom.announcer.textContent = "X turn";
        store_dom.announcer.removeAttribute("style");

        store_dom.restart.removeAttribute("style");
        store_dom.restart.toggleAttribute("disabled", true);
        store_dom.restart.removeEventListener("click", display_control.reset);

        for (let i = 0; i < game_board.board.length; i++) {
            game_board.board[i] = "";
        }
        game_board.fill();

        for (let i = 0; i < store_dom.tiles.length; i++) {
            store_dom.tiles[i].toggleAttribute("disabled", false);
            if (store_dom.tiles[i].className === "tile winner") store_dom.tiles[i].classList.toggle("winner"); // toggle off
        };
        // remove locked buttons
    };
    const result = (player, res, color) => {
        // setting color below makes it easier to apply the same color to both the announcer and restart elements
        store_dom.announcer.textContent = `${player} ${res}! Restart game?`;
        store_dom.announcer.setAttribute("style", color);

        store_dom.restart.toggleAttribute("disabled", false);
        store_dom.restart.setAttribute("style", `background-${color};`);
        store_dom.restart.addEventListener("click", display_control.reset);

        // lock game board
        for (let i = 0; i < store_dom.tiles.length; i++) {
            store_dom.tiles[i].toggleAttribute("disabled", true);
        }; // stored inside result so that locking game board occurs on game win OR tie
    };
    const turn = (player) => {
        store_dom.announcer.textContent = `${player} turn`;
    };
    return { result, turn, reset };
})();

const game_board = (() => {
    const board = ["", "", "", 
                   "", "", "", 
                   "", "", "",]; // each empty string represents the corresponding space on the game board
    
    const fill = () => {
        for (let i = 0; i < store_dom.tiles.length; i++) {
            store_dom.tiles[i].textContent = game_board.board[i];
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
        let search = win_conditions.find(condition => condition.every(index => board[index] === mark));
        if (search !== undefined) { // if true, win condition has been found
            // highlight winning spaces
            search.forEach(i => {
                store_dom.tiles[i].classList.toggle("winner"); // toggle on
            });
            // announce winner
            mark === "X" ? display_control.result("X", "wins", "color: #fbf67f")
                                : display_control.result("O", "wins", "color: pink");
        } else {
            if (!board.includes("")) display_control.result("Game", "tied", "color: #60ffa5"); // prevents early tie being called
        };
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
        if (game_board.board.every(empty_board)) { // if entire game_board board array is empty -> new game -> X goes first -> add X
            display_control.turn("O");
            mark = x;
            mark.add_mark(e);
        } else { 
            if (e.target.textContent === "") {
                store_dom.announcer.textContent.startsWith("X") ? display_control.turn("O") : display_control.turn("X");
                mark === x ? mark = o : mark = x;
                mark.add_mark(e); // ensures correct alternation of x and o - prevents "breaking" the turn via multiple clicks on the same space
            };
        };
    };
    return { turn_handler };
})();

const events = (() => {
    for (let i = 0; i < store_dom.tiles.length; i++) {
        store_dom.tiles[i].addEventListener("click", game.turn_handler);
    };
})();