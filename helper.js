export {displayScoreOnEnd, displayTimeOnEnd, writeScoreToHTML, writeTimeToHTML, createGrid, highlightSelectedNode, positionAnnotation}

function createGrid(n) { // creates grid 
    for (let i = 0; i < n; i++) {
        let row = document.createElement('tr');
        for (let i = 0; i < n; i++) {
            let cell = document.createElement('td');
            cell.classList.add('unselectedCell')
            row.append(cell);
        }
    
        grid.append(row);
    }

    setCellDimensions();
}

function highlightSelectedNode(event) { // allows for user to draw on maze
    if (event.target.nodeName.toLowerCase() !== 'td' || event.target.classList.contains('startNode') || event.target.classList.contains('endNode')) return;
    
    if (event.target.classList.contains('selectedCell')) {
        event.target.classList.remove('selectedCell');
        event.target.classList.add('unselectedCell');
    } else {
        event.target.classList.remove('unselectedCell');
        event.target.classList.add('selectedCell');
    }
}

function setCellDimensions() { // sets grid and cell dimensions based on window height
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    let grid = document.getElementById("grid");
    grid.style.width = scrollHeight * 0.80 + 'px';
    grid.style.height = scrollHeight * 0.80 + 'px';
}

function positionAnnotation(event) { // positions floating annotation for user to draw
    if (event.target.closest('#gridContainer')) {
        insertHTMLText('Draw obstacles by dragging on the cells!');
        annotationBubble.style.display = 'block';
        arrowdown.style.display = 'block';
        annotationBubble.style.left = gridContainer.getBoundingClientRect().left + Math.abs(annotationBubble.offsetWidth - gridContainer.offsetWidth)/2 + 'px';
        annotationBubble.style.top = gridContainer.getBoundingClientRect().top - 38 + 'px';
        arrowdown.style.left = gridContainer.getBoundingClientRect().left + Math.abs(arrowdown.offsetWidth - gridContainer.offsetWidth)/2 + 'px';
        arrowdown.style.top = gridContainer.getBoundingClientRect().top - 14 + 'px';
    } else {
        arrowdown.style.display = 'none';
        arrowup.style.display = 'none';
        annotationBubble.style.display = 'none';
    }
}

function insertHTMLText(text) { // inserts HTML text into annotation bubble
    annotationBubble.innerHTML = text
}

function writeTimeToHTML(time) { // writes Time to Timer
    document.getElementById('time').innerHTML = parseTime(time);
}

function displayTimeOnEnd(time) { // displays time on play again screen
    document.getElementById('time-score').innerHTML = "Time: " + parseTime(time);
}

function writeScoreToHTML(score) { // writes score to Score tracker
    document.getElementById('score').innerHTML = "Score: " + score;
}

function displayScoreOnEnd(score) { // displays score on play again screen
    document.getElementById('point-score').innerHTML = "Score: " + score;
}

function parseTime(time) { // parses seconds into hrs, mins and secs. eg. 00:10:12
    let hrs = 0, min = 0, sec = 0;

    sec = time % 60;

    min = Math.floor(sec / 60);
    
    hrs = Math.floor(min / 60);
    
    if (sec < 10){
        sec = '0' + sec
    }

    if (min < 10) {
        min = '0' + min
    }

    if (hrs < 10) {
        hrs = '0' + hrs
    }

    return `${hrs}:${min}:${sec}`;
}
