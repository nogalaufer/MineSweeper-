'use strict'

// const EMPTY = ''
const MINE = '💣'
const MARK = '🚩'



var gLevel = { SIZE: 4, MINES: 2 }
var gBoard
var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

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

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (!cell.isCovered) return

    if (!gGame.isOn) {
        gGame.isOn = true
        cell.isCovered = false
        elCell.classList.replace('covered', 'unCovered')
        placeMines(gBoard, gLevel.MINES)
        setMinesNegsCount(gBoard)

    }
    if (gGame.isOn) {
        cell.isCovered = false
        elCell.classList.replace('covered', 'unCovered')
        elCell.innerHTML = (cell.isMine) ? MINE : (cell.minesAroundCount || '')
        gGame.revealedCount++
        if (cell.isMine) {
            gameOver(elCell)
        }
        // if (!cell.isMine){
        //     elCell.innerHTML = cell.minesAroundCount

        // }

    }
    // console.log("place MINES", gBoard)
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

function gameOver(elCell) {
    elCell.style.backgroundColor = 'rgb(230, 122, 122)'
    revealAllCells()
    onFinishGameModal()

}

function onFinishGameModal() {
    // if (reason === lost){  
    const elModal = document.querySelector('.modal')
    elModal.querySelector('.btn').style.display = 'block'
    elModal.querySelector('.btn span').innerText = 'Try Again'
    elModal.querySelector('h3').innerText = 'Game Over'

    // } else {
    // const elModal = document.querySelector('.modal')
    // elModal.querySelector('.btn').style.display ='block' 
    // elModal.querySelector('.btn span').innerText = 'Play Again'
    // elModal.querySelector('h3').innerText = 'WIN!'

}
// }

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

function placeMines(board, numMines) {
    const emptyCells = getEmptyCells(board)
    var minesPlaced = 0
    while (minesPlaced < numMines) {
        const randomIdx = getRandomInt(0, emptyCells.length)
        const randomCell = emptyCells[randomIdx]
        const cell = board[randomCell.i][randomCell.j]
        if (!cell.isMine) {
            cell.isMine = true
            minesPlaced++


        }

        emptyCells.splice(randomIdx, 1)
    }
    return board

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
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onclick="onCellClicked(this,${i},${j})">
            ${cellContent}
            </td>`
        }

        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    console.log(elBoard)
    elBoard.innerHTML = strHTML

}