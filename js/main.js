'use strict'

// const EMPTY = ''
const MINE = '💣'
const MARK = '🚩'
const EMPTY = ''



var gLevel = { SIZE: 4, MINES: 2 }
var gBoard
var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gMarks = gLevel.MINES

function onInit() {
    const elModal = document.querySelector('.modal')
    elModal.querySelector('.btn').style.display = 'none'
    elModal.querySelector('h3').innerText = ''


    gGame = {
        isOn: false,
        revealedCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gBoard = createBoard(gLevel)
    console.table(gBoard)
    renderBoard(gBoard)
}




function creatCell() {
    return {
        minesAroundCount: null,
        isCovered: true,
        isMine: false,
        isMarked: false
    }

}

function onCellClicked(elCell, i, j, ev) {
    ev.preventDefault()

    const cell = gBoard[i][j]
    if (!cell.isCovered) return

    if (!gGame.isOn) {
        gGame.isOn = true
        placeMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
    }
    cell.isCovered = false
    elCell.classList.replace('covered', 'unCovered')
    gGame.revealedCount++

    if (cell.isMine) {
        gameOver(elCell)

    } else {
        elCell.innerHTML = (cell.minesAroundCount > 0) ? cell.minesAroundCount : ''
        if (cell.minesAroundCount === '') {
            // expandShown(gBoard, i, j)
            // console.log(`Expanding cell at [${i}, ${j}]`);

        }
    }
}

function setMinesNegsCount(board) {
    for (var rowIdx = 0; rowIdx < board.length; rowIdx++) {
        for (var colIdx = 0; colIdx < board[0].length; colIdx++) {
            const cell = board[rowIdx][colIdx]
            if (cell.isMine) continue

            var mineCount = 0
            for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
                if (i < 0 || i >= board.length) continue
                for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                    if (i === rowIdx && j === colIdx) continue
                    if (j < 0 || j >= board[0].length) continue
                    if (board[i][j].isMine) mineCount++
                }
            }

            cell.minesAroundCount = (mineCount > 0) ? mineCount : ''
        }
    }
}


function checkVictory() {
    if (gGame.revealedCount === gBoard.length * gBoard[0].length - gLevel.MINES) {
        gGame.isOn = false
        const elModal = document.querySelector('.modal')
        elModal.querySelector('.btn').style.display = 'block'
        elModal.querySelector('.btn span').innerText = 'Play Again!'
        elModal.querySelector('h3').innerText = 'WIN!'
        const elStatusBtn = document.querySelector('.statusBtn button')
        elStatusBtn.innerText = '🎉😊🎉'

    } else if (gGame.isOn){ 
         const elModal = document.querySelector('.modal')
        elModal.querySelector('.btn').style.display = 'block'
        elModal.querySelector('.btn span').innerText = 'Try Again'
        elModal.querySelector('h3').innerText = 'Game Over'
        const elStatusBtn = document.querySelector('.statusBtn button')
        elStatusBtn.innerText = '🤯'

    }


}


function gameOver(elCell) {
    elCell.style.backgroundColor = 'rgb(230, 122, 122)'

    revealAllCells()
    checkVictory()

}



function revealAllCells() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            cell.isCovered = false

            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.replace('covered', 'unCovered')
            elCell.innerHTML = (cell.isMine) ? MINE : (cell.minesAroundCount || '')
        }

    }

}


// function expandShown(board, i, j) {
//     const cell = board[i][j]

//     // אם התא כבר נחשף או שהוא מוקש, אין צורך לבצע שום דבר
//     if (!cell.isCovered || cell.isMine) return

//     // משנה את המצב של התא ל-unCovered
//     const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//     elCell.classList.replace('covered', 'unCovered')
//     elCell.innerHTML = (cell.minesAroundCount > 0) ? cell.minesAroundCount : ''

//     // עכשיו נבדוק את 8 התאים שסובבים את התא הנלחץ
//     for (let row = i - 1; row <= i + 1; row++) {
//         if (row < 0 || row >= board.length) continue  // אם השורה מחוץ לגבולות הלוח
//         for (let col = j - 1; col <= j + 1; col++) {
//             if (col < 0 || col >= board[0].length) continue  // אם העמודה מחוץ לגבולות הלוח
//             if (row === i && col === j) continue  // אם זה התא הנוכחי, דלג עליו

//             const neighborCell = board[row][col]

//             // אם התא לא מכוסה ואין בו מוקש
//             if (neighborCell.isCovered && !neighborCell.isMine) {
//                 const elNeighborCell = document.querySelector(`[data-i="${row}"][data-j="${col}"]`)
//                 elNeighborCell.classList.replace('covered', 'unCovered')
//                 elNeighborCell.innerHTML = (neighborCell.minesAroundCount > 0) ? neighborCell.minesAroundCount : ''

//                 // אם התא הזה לא מכיל מוקשים, נבצע קריאה רקורסיבית
//                 if (neighborCell.minesAroundCount === 0) {
//                     expandShown(board, row, col)  // קריאה רקורסיבית
//                 }
//             }
//         }
//     }
// }


// function expandShown(board, i, j) {
//     const cell = board[i][j]
//     if (!cell.isCovered || cell.isMine) return

//     const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//     elCell.classList.replace('covered', 'unCovered')
//     elCell.innerHTML = (cell.minesAroundCount > 0) ? cell.minesAroundCount : ''
//     if (cell.minesAroundCount === 0) {

//         for (const row = i - 1; row <= i + 1; row++) {
//             if (row < 0 || row >= board.length) continue
//             for (const col = j-1; col <= j + 1; col++) {
//                 if (col < 0 || col >= board[0].length) continue
//                 if (row === i && col === j) continue
//                 expandShown(board, row, col)
//             }
//         }
//     }
// }


function placeMines(board, numMines, firstClickPos) {
    const emptyCells = getEmptyCells(board)
    emptyCells.splice(emptyCells.findIndex(cell => cell.i === firstClickPos.i && cell.j === firstClickPos.j), 1)
    var minesPlaced = 0
    while (minesPlaced < numMines && emptyCells.length > 0) {
        const randomIdx = getRandomInt(0, emptyCells.length - 1)
        const randomCell = emptyCells[randomIdx]
        const cell = board[randomCell.i][randomCell.j]
        if (!cell.isMine) {
            cell.isMine = true
            minesPlaced++
            emptyCells.splice(randomIdx, 1)
        }

    }
}

function getEmptyCells(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isCovered) emptyCells.push({ i, j })
        }
    }
    return emptyCells
}


function onSetLevel(size, mines) {
    gLevel = { SIZE: +size, MINES: +mines }
    onInit()
}

function createBoard(gLevel) {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = creatCell()
        }
    }
    // console.table(board)
    return board
}

function renderBoard(board) {
    console.log('Rendering board...')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            var className = (cell.isCovered) ? 'covered' : 'unCovered'
            var cellContent = (cell.isMine) ? MINE : (cell.minesAroundCount || '')
            // var cellMark = (cell.isMarked) ? MARK : ''
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onmousedown="onCellClicked(this,${i},${j},event)">
            ${cellContent}
            </td>`
        }

        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    console.log(elBoard)
    elBoard.innerHTML = strHTML

}