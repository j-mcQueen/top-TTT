# TIC TAC TOE

A simple game of tic-tac-toe where one player controls both X and O. This project was developed as part of The Odin Project's Full Stack JavaScript course - check out my [live version](https://j-mcqueen.github.io/top-TTT/).

## new things I've learned

- Experience using the Revealing Module Pattern for functions which are only needed once (game board, DOM element storage, display control, etc.), and how to use the pattern to remove global scope pollution
- Experience using factory functions for when I need to use something multiple times (players)
- Making use of toggleAttribute() more to use less of setAttribute() to apply inline styles
- Understanding how to use pseudocode a little more effectively when problem solving
- The importance of code documentation through comments!
- Developed understanding of scope and the concepts of closure & namespacing
- How to use the debugger statement in javascript to step through the code and find problem sources

## biggest challenges

- Detecting a win or tie condition
- How to effectively problem solve at every stage (understanding the problem and explaining it in plain English, pseudocoding the problem then breaking the problem up into parts and implementing each small part)

## technologies used

- HTML
- CSS
- JavaScript

## known bugs/ areas for improvement

- The array which contains the game board is NOT private and can be accessed in the dev tools' console. I have made it this way so that other functions outside of the block in which it is contained can access it too. I am aware this is generally undesirable (never trust the user, right?) so I am contemplating ways to privatise the board array while giving the other functions what they need to operate
- As of 02/11/22, the game is only single player and the user controls both the X and O turn
- On iOS, there appears to be a slight delay when tapping marks onto tiles, preventing "fast tap" gameplay. This could be fairly annoying from a UX perspective, and I have followed the suggestions made in [this article](https://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari) to try and implement a solution, but to no avail yet.
- The current method by which I search for the triggering of a win condition is computationally expensive - I have been informed that recursion can be an effective way of handling this problem, but I have not studied this in depth and tried to apply the principles yet.
    - Similarly, the way that the entire board gets re-rendered after every mark addition to the board appears computationally expensive

## notes

- Experimented with a snake_case naming convention for variables
- I have used a factory for handling players (even though there is only one player made in this current version) so that should I return to develop TTT further, the major pieces of functionality (like adding a mark or rendering the mark addition to the board) held inside will already exist for more players.
- In the game's current iteration, there are only two house rules:
    - computer is always O
    - X goes first
