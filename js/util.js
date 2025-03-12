'use strict'


function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


// יצירת טבלה, רינדור בורד. 
// קליק תמיד יפעיל לי משהו שיגריל על הבורד בכל מקום מלבד איפה שלחצתי עד מספר מוגדר של מוקשים
// לולאת שכנים שעוברת בכל תא וסופרת מכל תא כמה מוקדשים יש - זה מה שיהיה כתוב על התא.




// function onCellClicked(elCell, rowIdx, colIdx) {
//     // console.log('elCell:', elCell)
//     // console.log('rowIdx:', rowIdx)
//     // console.log('colIdx:', colIdx)

//     if (elCell.innerText === LIFE) {

//         // UPDATE THE MODEL
//         gBoard[rowIdx][colIdx] = SUPER_LIFE

//         // UPDATE THE DOM
//         elCell.innerText = SUPER_LIFE

//         blowUpNegs(rowIdx, colIdx)

//     }
// }

// function blowUpNegs(rowIdx, colIdx) {
//     // console.log('rowIdx,colIdx:', rowIdx, colIdx)

//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i > gBoard.length - 1) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || i > gBoard[0].length - 1) continue
//             if (i === rowIdx && j === colIdx) continue
//             var cell = gBoard[i][j]
//             // console.log('cell:', cell)
//             if (cell === LIFE) {
//                 // console.log('i,j:', i, j)

//                 // UPDATE THE MODEL
//                 gBoard[i][j] = ''

//                 // UPDATE THE DOM
//                 var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//                 // console.log('elCell:', elCell)
//                 elCell.innerText = ''
//                 elCell.classList.remove('occupied')
//             }
//         }
//     }
// }
