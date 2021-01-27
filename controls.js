export {controlNode}

function controlNode(key, board, score) { // controls the players key functions and relays it to the moving node, returns [bool, score], bool referring if we reach end of maze
    let playerX, playerY, nextMoveX, nextMoveY; 
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[j][i].classList.contains('startNode')) {
                playerY = j
                playerX = i
                break;
            }
        }
    }
    
    switch (key) {
        case "ArrowUp":
        case "KeyW":
            nextMoveX = playerX;
            nextMoveY = playerY - 1;
            break;
        case "ArrowDown":
        case "KeyS":
            nextMoveX = playerX;
            nextMoveY = playerY + 1;
            break;
        case "ArrowLeft":
        case "KeyA":
            nextMoveX = playerX - 1;
            nextMoveY = playerY;
            break;
        case "ArrowRight":
        case "KeyD":
            nextMoveX = playerX + 1;
            nextMoveY = playerY;
            break;
        
    }

    if(isPassage(nextMoveX, nextMoveY, board)) {
        if (board[nextMoveY][nextMoveX].classList.contains('coins')) {
            board[nextMoveY][nextMoveX].classList.remove('coins');
            score += 1;
        }
        board[nextMoveY][nextMoveX].classList.add('startNode');
        board[playerY][playerX].classList.remove('startNode');
    };

    if (checkReached(nextMoveX, nextMoveY, board)) {
        return [true, score];
    }
    return [false, score];
}

function checkReached(x, y, board) { // checks if we reached the end of the maze
    if (board[y][x].classList.contains('startNode') && board[y][x].classList.contains('endNode')) {
        return true
    }
    return false
}

function isPassage(x, y, board) { // checks if the cell that player wants to move is a passage not a wall
    if (board[y][x].classList.contains('selectedCell')) {
        return false
    }
    return true
}