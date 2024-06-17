// STATE
enum State {mainMenu,pong,tetris,dodge}
let consoleState = State.mainMenu

// LOOP SPEED
const defaultSlowLoopSpeed: number = 400
let slowLoopSpeed: number = defaultSlowLoopSpeed

namespace Display {
    // SIZE
    type Size = {
        x: number,
        y: number
    }
    export const size: Size = {
        x: 4,
        y: 4
    }
    export type DotObject = {
        x: number,
        y: number
    }

    // DATA
    export let drawingData: boolean = true
    export type Data = Array<Array<boolean>>
    function buildScreen(width: number, height: number): Data {
        let dData = []
        for (let row = 0; row <= height; row++) {
            dData.push([])
            for (let col = 0; col <= width; col++) dData[row].push(false)
        }
        return dData
    }
    export let data: Data = buildScreen(size.x, size.y)

    // UPDATE
    export function update(data: Data, state: State): void {
        if (drawingData) {
            for (let y = 0; y <= size.y; y++) {
                for (let x = 0; x <= size.x; x++) {
                    if (state === State.mainMenu) {
                        if (data[y][x]) {
                            led.plotBrightness(x, y, 50)
                        } else led.unplot(x, y)

                    } else if (state === State.pong) {

                        if (Pong.isLedEmpty(x, y)) led.unplot(x, y)
                        else led.plot(x, y)

                    } else if (state === State.tetris) {
                        if (Tetris.data[y][x]) {
                            led.plotBrightness(x, y, 50)
                        } else led.unplot(x, y)
                    }
                }

                if (state === State.pong) led.plotBrightness(Pong.Ball.pos.x, Pong.Ball.pos.y, 10)
                if (state === State.tetris) led.plot(Tetris.Piece.pos.x, Tetris.Piece.pos.y)
            }
        }
    }
    export function clear(dData: Display.Data): void {
        for (let y = 0; y <= size.y; y++) {
            for (let x = 0; x <= size.x; x++) {
                led.unplot(x, y)
                dData[y][x] = false
            }
        }
    }

}


basic.forever(() => {
    basic.pause(slowLoopSpeed)

    // BOOT MELODY
    if (UI.playBootMelody) {
        music.playMelody("C4 D E F G A B C5", 300)
        UI.playBootMelody = false
    }

    // PONG
    if (consoleState === State.pong) Pong.update()
    // TETRIS
    else if (consoleState === State.tetris) Tetris.Piece.fall(Tetris.Piece.pos)
    // DODGE
    else if (consoleState == State.dodge) Dodge.update()
})


UI.startAnimation()


basic.forever(() => {
    // MAIN MENU
    if (consoleState === State.mainMenu) Menu.previewGame(Menu.gameViewing)

    // TETRIS
    else if (consoleState === State.tetris) Tetris.update()


    Display.update(Display.data, consoleState)
    basic.pause(100)
})



// INPUT
enum Pins {
    left = DigitalPin.P1,
    right = DigitalPin.P0
}
const treshold: number = 500

let sensitivity: number = 10
let pauseTime: number = 100

basic.forever(() => {
    // ir sensors
    if (consoleState === State.pong) {
        let irSignalL = pins.analogReadPin(Pins.left as number)
        let irSignalR = pins.analogReadPin(Pins.right as number)

        if (irSignalL > treshold) Pong.leftBat.moveUp()
        else Pong.leftBat.moveDown()

        if (irSignalR > treshold) Pong.rightBat.moveUp()
        else Pong.rightBat.moveDown()
    }
    
    // tilting
    if (consoleState === State.tetris) {
        Tetris.Piece.move(Tetris.Piece.pos, Display.size.x, Math.map(input.acceleration(Dimension.X), -500, 500, 0, 4))
        basic.pause(pauseTime)
    }

    // MUSIC
    if (UI.playLineCompleted) {
        music.playMelody("G3 A3 D4", 500)
        UI.playLineCompleted = false
    } else if (UI.playE) {
        music.playMelody("E2", 400)
        UI.playE = false


    } 
    else if (UI.playGameLose) {
        music.playMelody("G3", 400)
        music.playMelody("F3", 300)
        music.playMelody("D3", 100)
        UI.playGameLose = false
    } else if (UI.playGameEnding) {
        music.playMelody("D3", 300)
        music.playMelody("D4", 400)
        music.playMelody("A4", 100)
        UI.playGameEnding = false
    } else if (UI.playGameClosing) {
        music.playMelody("G3", 400)
        music.playMelody("F3", 300)
        music.playMelody("D3", 100)
        UI.playGameClosing = false
    }

    basic.pause(100)
})

// buttons
input.onButtonPressed(Button.A, () => {
    if (consoleState === State.mainMenu) {
        Menu.gameViewing = Menu.switchGame(Menu.gameViewing, -1, 3)
    } else if(consoleState === State.dodge) {
        Dodge.move(-1)
    }
})

input.onButtonPressed(Button.B, () => {
    if (consoleState === State.mainMenu) {
        Menu.gameViewing = Menu.switchGame(Menu.gameViewing, 1, 3)
    } else if (consoleState === State.dodge) {
        Dodge.move(1)
    }
})


input.onButtonPressed(Button.AB,() => {
    if (consoleState === State.mainMenu) {
        UI.countdown()
        consoleState = Menu.gameViewing
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    if (consoleState === State.pong) {
        Pong.reset()
        UI.closeGame()

    } else if (consoleState === State.tetris) {
        Tetris.reset(Tetris.data)
        Tetris.score  = 0
        UI.closeGame()
    } else if (consoleState === State.dodge) {
        Dodge.reset()
        Dodge.score = 0
        consoleState = State.mainMenu
        UI.closeGame()
    }
})