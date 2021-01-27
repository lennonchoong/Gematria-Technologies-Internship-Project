export {clearPreviousCoins, addRandomCoins, generateMaze, clearExistingMaze, create2DArr}

function clearExistingMaze() { // clears existing maze
    Array.from(document.querySelectorAll('tr')).map((x) => {x.remove()})
}

function clearPreviousCoins() { // clears existing coins 
    Array.from(document.querySelectorAll('.coins')).map((x) => x.classList.remove('coins'));
}

function addRandomCoins() { // adds random coins to maze
    let availableCells = shuffle(Array.from(document.querySelectorAll('.unselectedCell')));
    availableCells.slice(0, availableCells.length * 0.2).map((x) => {
        if (!x.classList.contains('startNode') && !x.classList.contains('endNode')) {
            x.classList.add("coins")
        }
    });
}

function create2DArr() { // creates 2D representation of our grid
    let rows = Array.from(document.querySelectorAll('tr'));

    let result = [];

    for (let i = 0; i < rows.length; i++) {
        result.push([...rows[i].querySelectorAll('td')]);
    }
    
    return result
}

function generateMaze() { // recursive DFS function to generate a maze on our grid
    let arr = create2DArr();
    
    let visited = new Set();
    
    let speed = 0;

    Array.from(document.querySelectorAll('td')).map((x) => { // resets classes in grid cells
        x.classList.remove('unselectedCell');
        x.classList.add('selectedCell');
    })

    function createMaze(x, y) { // creates a maze
        let allDir = [['right', [1, 0]] , ['left', [-1, 0]], ['up', [0, 1]], ['down', [0, -1]]];
        
        allDir = shuffle(allDir);

        while (allDir.length > 0) {
            let directionToTry = allDir.pop();

            let dir = directionToTry[0];

            let nodeX = x + (directionToTry[1][0] * 2);
            let nodeY = y + (directionToTry[1][1] * 2);
            

            if (isInBounds(nodeX, nodeY) && arr[nodeY][nodeX].classList.contains('unselectedCell')) {
                carvePath(dir, nodeX, nodeY);
            } else if (isInBounds(nodeX, nodeY) && arr[nodeY][nodeX].classList.contains('selectedCell') && !visited.has(arr[nodeY][nodeX])) {
                carvePath(dir, nodeX, nodeY);
                visited.add(arr[nodeY][nodeX]);
                createMaze(nodeX, nodeY);
            }
        }
    }

    function isInBounds(x, y) { // checks if carve function is out of bounds
        if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
            return true;
        } else {
            return false;
        }
    }

    function carvePath(dir, nodeX, nodeY) { // carves passages into the grid creating a maze
        setTimeout(() => {
            switch (dir) {
                case "right":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX - 1].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY][nodeX - 1].classList.add('unselectedCell');
                    break;
                case "left":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX + 1].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY][nodeX + 1].classList.add('unselectedCell');
                    break;
                case "up":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY - 1][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY - 1][nodeX].classList.add('unselectedCell');
                    break;
                case "down":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY + 1][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY + 1][nodeX].classList.add('unselectedCell');
                    break;
            }
        }, speed)
        speed += 2.5;
    }

    createMaze(1, 1);
}

function shuffle(array) { // randomization shuffling for maze and coin generation, Knuth shuffle
    let m = array.length, t, i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}