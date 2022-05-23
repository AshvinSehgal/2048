document.addEventListener('DOMContentLoaded', () => {
    console.clear()
    
    const gridDisplay=document.querySelector('.grid')
    const scoreDisplay=document.getElementById('score')
    const resultDisplay=document.getElementById('result')
    const startScreen=document.getElementById('startscreen')
    const gameScreen=document.getElementById('game')

    const easyButton=document.getElementsByClassName('easy')[0]
    const mediumButton=document.getElementsByClassName('medium')[0]
    const hardButton=document.getElementsByClassName('hard')[0]
    const insaneButton=document.getElementsByClassName('insane')[0]

    const width=4;
    let squares=[];
    let score=0
    let difficulty=0
    let isGameOver=false

    //startScreen.style.display="inline"
    //createBoard()

    function easyGame() {
        difficulty=1
        createBoard()
    }

    function mediumGame() {
        difficulty=2
        createBoard()
    }

    function hardGame() {
        difficulty=3
        createBoard()
    }

    function insaneGame() {
        difficulty=4
        createBoard()
    }

    easyButton.addEventListener('click',easyGame)
    mediumButton.addEventListener('click',mediumGame)
    hardButton.addEventListener('click',hardGame)
    insaneButton.addEventListener('click',insaneGame)

    // Creating the playing board
    function createBoard() {
        startScreen.style.display="none"
        gameScreen.style.display="inline"
        for(let i=0;i<width*width;i++) {
            square=document.createElement('div')
            square.innerHTML=0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        diffGenerate()
    }

    function diffGenerate() {
        for(let i=0;i<difficulty&&!isGameOver;i++)
            generate()
    }

    // Generate a number randomly on the board
    function generate() {
        let randomNumber=Math.floor(Math.random()*squares.length)
        if(squares[randomNumber].innerHTML==0) {
        squares[randomNumber].innerHTML=2
        colorBoard()
        checkLose()
        if(isGameOver)
                return
        } else generate()
    }

    // Color squares
    function colorBoard()
    {
        for(let i=0;i<16;i++)
        {
            if(squares[i].innerHTML==0)
            squares[i].style.backgroundColor="#fffff0"
            else if(squares[i].innerHTML==2)
            squares[i].style.backgroundColor="#ffffa0"
            else if(squares[i].innerHTML==4)
            squares[i].style.backgroundColor="#ffff50"
            else if(squares[i].innerHTML==8)
            squares[i].style.backgroundColor="#ffff00"
            else if(squares[i].innerHTML==16)
            squares[i].style.backgroundColor="#ffbb00"
            else if(squares[i].innerHTML==32)
            squares[i].style.backgroundColor="#ff7700"
            else if(squares[i].innerHTML==64)
            squares[i].style.backgroundColor="#ff3300"
            else if(squares[i].innerHTML==128)
            squares[i].style.backgroundColor="#ff0000"
            else if(squares[i].innerHTML==256)
            squares[i].style.backgroundColor="#cc0000"
            else if(squares[i].innerHTML==512)
            squares[i].style.backgroundColor="#aa0000"
            else if(squares[i].innerHTML==1024)
            squares[i].style.backgroundColor="#880000"
            else if(squares[i].innerHTML==2048)
            squares[i].style.backgroundColor="#440000"
        }
    }

    // Swipe right
    function moveRight() {
        for(let i=0;i<16;i++) {
            if(i%4==0) {
                let totalOne=squares[i].innerHTML
                let totalTwo=squares[i+1].innerHTML
                let totalThree=squares[i+2].innerHTML
                let totalFour=squares[i+3].innerHTML
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredRow=row.filter(num=>num)
                let missing=4-filteredRow.length
                let zeroes=Array(missing).fill(0)
                let newRow=zeroes.concat(filteredRow)

                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
        }
    }

    // Swipe left
    function moveLeft() {
        for(let i=0;i<16;i++) {
            if(i%4==0) {
                let totalOne=squares[i].innerHTML
                let totalTwo=squares[i+1].innerHTML
                let totalThree=squares[i+2].innerHTML
                let totalFour=squares[i+3].innerHTML
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredRow=row.filter(num=>num)
                let missing=4-filteredRow.length
                let zeroes=Array(missing).fill(0)
                let newRow=filteredRow.concat(zeroes)

                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
        }
    }

    // Swipe down
    function moveDown() {
        for(let i=0;i<4;i++) {
                let totalOne=squares[i].innerHTML
                let totalTwo=squares[i+width].innerHTML
                let totalThree=squares[i+(width*2)].innerHTML
                let totalFour=squares[i+(width*3)].innerHTML
                let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredColumn=column.filter(num=>num)
                let missing=4-filteredColumn.length
                let zeroes=Array(missing).fill(0)
                let newColumn=zeroes.concat(filteredColumn)

                squares[i].innerHTML=newColumn[0]
                squares[i+width].innerHTML=newColumn[1]
                squares[i+(width*2)].innerHTML=newColumn[2]
                squares[i+(width*3)].innerHTML=newColumn[3]
        }
    }

    // Swipe up
    function moveUp() {
        for(let i=0;i<4;i++) {
                let totalOne=squares[i].innerHTML
                let totalTwo=squares[i+width].innerHTML
                let totalThree=squares[i+(width*2)].innerHTML
                let totalFour=squares[i+(width*3)].innerHTML
                let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredColumn=column.filter(num=>num)
                let missing=4-filteredColumn.length
                let zeroes=Array(missing).fill(0)
                let newColumn=filteredColumn.concat(zeroes)

                squares[i].innerHTML=newColumn[0]
                squares[i+width].innerHTML=newColumn[1]
                squares[i+(width*2)].innerHTML=newColumn[2]
                squares[i+(width*3)].innerHTML=newColumn[3]
        }
    }
    
    // Combine the new rows
    function combineRow() {
        for(let i=0;i<15;i++) {
            if(squares[i].innerHTML==squares[i+1].innerHTML) {
                let combinedTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML=combinedTotal
                squares[i+1].innerHTML=0
                score+=combinedTotal
                scoreDisplay.innerHTML="Score: "+score
            }
        }
        colorBoard()
        checkWin()
    }

    // Combine the new columns
    function combineColumn() {
        for(let i=0;i<12;i++) {
            if(squares[i].innerHTML==squares[i+width].innerHTML) {
                let combinedTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML=combinedTotal
                squares[i+width].innerHTML=0
                score+=combinedTotal
                scoreDisplay.innerHTML="Score: "+score
            }
        }
        colorBoard()
        checkWin()
    }

    // Assign keys
    function checkKey(e) {
        e=e||window.event;
        
        if(e.key=="ArrowDown") {
            keyDown()
        } else if(e.key=="ArrowRight") {
            keyRight()
        } else if(e.key=="ArrowUp") {
            keyUp()
        } else if(e.key=="ArrowLeft") {
            keyLeft()
        }
    }

    document.addEventListener('keydown',checkKey)

    function keyRight()
    {
        moveRight()
        combineRow()
        moveRight()
        diffGenerate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        diffGenerate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        diffGenerate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        diffGenerate()
    }

    // Check win
    function checkWin() {
        for(let i=0;i<squares.length;i++) {
            if(squares[i].innerHTML==2048) {
                resultDisplay.innerHTML="YOU WIN!"
                document.removeEventListener('keyup',control)
                isGameOver=true
            }
        }
    }

    // Check lose
    function checkLose() {
        let zeroes=0
        for(let i=0;i<squares.length;i++) {
            if(squares[i].innerHTML==0)
            zeroes++
        }
        if(zeroes==0) {
            resultDisplay.innerHTML="GAME OVER!"
            document.removeEventListener('keyup',control)
            isGameOver=true
        }
    }
})