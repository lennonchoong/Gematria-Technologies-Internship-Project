import {displayScoreOnEnd, displayTimeOnEnd, writeScoreToHTML, writeTimeToHTML, createGrid, highlightSelectedNode, positionAnnotation} from './helper.js'

import {clearPreviousCoins, addRandomCoins, clearExistingMaze, generateMaze, create2DArr} from './mazegenerator.js'

import {controlNode} from './controls.js'

let startNode;

let endNode;

let state = true;

let size = gridSize.value;

let board;

let timer;

let time = 0;

let score = 0;

function handlePlayerInput(e) { //handles player keypresses
    let playerStateAndScore;
    let blurredPage = document.querySelector(".blurredpage");
    let playAgainBtn = document.querySelector(".play-again-btn");

    if (blurredPage.classList.contains('hidden')) { // if page is not visible, means player is playing
        playerStateAndScore = controlNode(e.code, board, score); // allow player to control 
        score = playerStateAndScore[1]; // update global score var
    }
    
    if (playerStateAndScore[0]) { // if player reaches end node, return true
        stopTimer(timer);
        displayTimeOnEnd(time);
        displayScoreOnEnd(score);
        blurredPage.classList.remove('hidden');
        playAgainBtn.classList.remove('hidden');
        score = 0;
    }

    writeScoreToHTML(score);
}

function startGame() { // start game
    document.querySelector(".start-btn").classList.add('hidden');
    document.querySelector(".blurredpage").classList.add('hidden');
    timer = startTimer()
}

function playAgain() { // play again
    document.querySelector(".blurredpage").classList.add('hidden');
    document.querySelector(".play-again-btn").classList.add('hidden');
    clearPreviousCoins();
    generateMaze();
    resetStartAndEndNodes();
    setTimeout(() => addRandomCoins(), 200);
    timer = startTimer()
}

function startTimer() { // start timer
    return (setInterval(() => {
        time += 1;
        writeTimeToHTML(time);
    }, 1000))
}

function stopTimer(func) { // stops timer
    clearInterval(func);
    writeTimeToHTML(0);
}

function resetStartAndEndNodes() { // resets player and end node
    document.querySelector('.startNode').classList.remove('startNode');
    document.querySelector('.endNode').classList.remove('endNode');
    addStartAndEndNodes();
}

function addStartAndEndNodes() { // adds player and end node 
    let rows = Array.from(document.querySelectorAll('tr'));

    startNode = Array.from(rows[1].querySelectorAll('td'))[1];

    startNode.classList.add('startNode');

    endNode = Array.from(rows[rows.length - 1].querySelectorAll('td'))[rows.length - 2];

    endNode.classList.add('endNode');
    setTimeout(() => {endNode.classList.remove('selectedCell'); endNode.classList.add('unselectedCell')}, 200);
}

function moveStartNode(event) { // allows player to move start node
    if (event.target.tagName.toLowerCase() != 'td') return;
    startNode.classList.remove('startNode');
    event.target.classList.add('unselectedCell');
    event.target.classList.add('startNode');
    startNode = event.target
}

function moveEndNode(event) { // allows player to move end node
    if (event.target.tagName.toLowerCase() != 'td') return;
    endNode.classList.remove('endNode');
    event.target.classList.add('unselectedCell');
    event.target.classList.add('endNode');
    endNode = event.target
}

function startGeneration() { // generates maze
    createGrid(size); // creates grid on size

    addStartAndEndNodes(); // adds start and end

    generateMaze(); // generates maze inside our grid

    setTimeout(() => addRandomCoins(), 500); // adds collectable coins

    board = create2DArr() // creates a 2D representation of our grid
}

document.querySelector('.start-btn').addEventListener('click', () => startGame()); // starts the game by adding click on blurred screen

document.querySelector('.play-again-btn').addEventListener('click', () => playAgain()); // plays again by adding click on blurred screen

window.addEventListener('drag', function(event) {
    event.preventDefault();
})

window.addEventListener('dragstart', function(event) {
    event.preventDefault();
})

window.addEventListener('mouseover', function(e) {
    positionAnnotation(e);
})

window.addEventListener('keydown', function(e) { // handles key down events by player
    return handlePlayerInput(e);
})

gridContainer.addEventListener('mousedown', function(event) { // allows player to move start and end nodes and draw on grid
    if (!state) return;
    if (event.target.classList.contains('startNode')) {
        gridContainer.addEventListener('mouseover', moveStartNode);
    } else if (event.target.classList.contains('endNode')) {
        gridContainer.addEventListener('mouseover', moveEndNode);
    } else {
        if (event.target.classList.contains('weightedCell')) return;
        highlightSelectedNode(event);
        gridContainer.addEventListener('mouseover', highlightSelectedNode);
    }
})

gridContainer.addEventListener('mouseup', function() { // stops mouseover action when player releases mouse 
    gridContainer.removeEventListener('mouseover', moveStartNode);
    gridContainer.removeEventListener('mouseover', moveEndNode);
    gridContainer.removeEventListener('mouseover', highlightSelectedNode);
})

generatemazebtn.addEventListener('click', () => { // resets maze on reset maze click
    if (!state) return;
    generateMaze();
})

gridSize.addEventListener("change", (e) => { // gridSize range slider
    size = e.target.value;
    clearExistingMaze();
    startGeneration(size);
})

gridSize.addEventListener('keydown', (e) => { // prevents arrow key action on gridSize range slider
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp'|| e.code === 'ArrowLeft'|| e.code === 'ArrowRight') {
        e.preventDefault();
    }
})

startGeneration(); // generates initial grid