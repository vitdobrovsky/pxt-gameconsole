// Add your code here
namespace Tetris {
    export namespace Piece {

        export let pos: Display.DotObject = {
            x: 2,
            y: 0
        }

        export function fall(dot: Display.DotObject):void {
            dot.y += 1
            if (dot.y > 4 || data[dot.y][dot.x]) {
                UI.playE = true
                data[dot.y - 1][dot.x] = true
                dot.y = 0
            }
            basic.pause(speed)
        }

        export function move(position: Display.DotObject, dSizeX: number, tilt: number):void {
            if (Math.round(tilt) > position.x) {
                if (position.x < dSizeX && !data[position.y][position.x + 1]) position.x += 1
            } else if (Math.round(tilt) < position.x) {
                if (position.x > 0 && !data[position.y][position.x - 1]) position.x -= 1
            }
        }
    }

    export let score: number = 0
    let speed: number = 200

    export let data: Display.Data = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]

    function completeLine(dData: Display.Data):void {
        let numberOfBlocksInRow: number
        for (let i = 0; i < 5; i++) {
            numberOfBlocksInRow = 0
            for (let value of dData[i]) {
                if (value) numberOfBlocksInRow += 1
            }
            if (numberOfBlocksInRow == 5) {
                score += 1
                if(speed > 0) speed -= 10
                UI.playLineCompleted = true
                for(let j = 0; j < 2; j++){
                    for (let col = 0; col < 5; col++) {
                        led.unplot(col, i)
                        basic.pause(20)
                        led.plot(col, i)
                        basic.pause(20)
                    }
                }
            
                for (let row = i; row > 0; row--) {
                    dData[row] = dData[row - 1]
                }
            }
        }
    }

    export function reset(dData: Display.Data):void {
        consoleState = State.mainMenu
        speed = 100
        Display.clear(dData)

    }

    function gameOver(dData: Display.Data):void {
        if (dData[0][Piece.pos.x]) {
            UI.playGameLose = true
            reset(dData)
            whaleysans.showNumber(Math.round(score))
            score = 0
            basic.pause(2000)
        }
    }

    export function update():void {
        completeLine(data)
        gameOver(data)
    }
}