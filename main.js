// to follow through the flow of the game, start from the bottom at the events IIFE

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

        // return game_board array to its default state
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
    const result = (player, outcome, color) => {
        // setting color below makes it easier to apply the same color to both the announcer and restart elements
        store_dom.announcer.textContent = `${player} ${outcome}! Restart game?`;
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
        }; // computationally expensive - every time a mark is added the board the array is re-rendered to the tiles. Could plug in an argument which specifies which tile to place the mark on then add a conditional and loop for when the game needs to be restarted
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

    const result_listener = (mark) => {
        let search = win_conditions.find(condition => condition.every(index => board[index] === mark)); // computationally expensive - can use recursion to improve this
        if (search !== undefined) { // if true, win condition has been found
            search.forEach(i => {// highlight winning spaces
                store_dom.tiles[i].classList.toggle("winner"); // toggle on
                console.log(store_dom.tiles[i].getAttribute("class"));
            });
            mark === "X" ? display_control.result("X", "wins", "color: #fbf67f")
                         : display_control.result("O", "wins", "color: pink"); // announce winner
        } else {
            if (!board.includes("")) {
                display_control.result("Game", "tied", "color: #60ffa5"); // prevents early tie being called
            } else {
                return false; // useful for testing applicability of automatically placing the computer's mark
            };
        };
    };
    return { board, fill, result_listener };
})();

const Player = (mark) => {
    const add_mark = (e) => {
        const render = (id, index, val) => {
            game_board.board.splice(id, index, val); // update board array with mark at the appropriate position
            game_board.fill(); // render contents of array to board
        };

        const place_O = (index, start, val, test) => {
            setTimeout(() => {
                render(index, start, val);
                display_control.turn("X");
                if (test === true) game_board.result_listener("O");
            }, 300); // might be computationally expensive because of re-checking certain board array indexes
        };

        if (e.target.textContent === "") {
            let identifier = Number(e.target.getAttribute("data-id")); // needs to be an integer for splicing in next step
            render(identifier, 1, mark);
        };

        // set up opportunity to choose an empty index at random
        let vacancies = game_board.board.reduce((tile, value, index) => tile.concat(value === "" ? index : []), []);
        let random = Math.floor(Math.random() * vacancies.length);
        let index = vacancies[random];

        if (vacancies.length < 5) { // win condition territory
            if (game_board.result_listener(mark) === false) {
                let test = true; // determines if you want the result listener to run after placing O
                place_O(index, 1, "O", test);
            };
        } else { // not enough marks on the board for any win conditions to be triggered
            let test = false;
            place_O(index, 1, "O", test);
        };
    };
    return { add_mark };
};

const game = (() => {
    const x = Player("X");
    let mark = x;

    const turn_handler = (e) => { // supply target of click event, otherwise it gets lost when add_mark() is called
        const empty_board = (item) => item === "";
        if (game_board.board.every(empty_board)) { // if entire game_board board array is empty -> new game -> X goes first -> add X
            display_control.turn("O");
            mark.add_mark(e);
        } else { 
            if (e.target.textContent === "") {
                store_dom.announcer.textContent.startsWith("X") ? display_control.turn("O") : display_control.turn("X");
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

// dont need to alternate value of mark anymore