
namespace UI {
    export let playGameEnding: boolean = false

    export let playGameClosing: boolean = false

    export let playLineCompleted: boolean = false
    
    export let playE: boolean = false

    export let playGameLose: boolean = false

    export let playBootMelody: boolean = true

    export const pongPreview: Display.Data = [
        [false, false, false, false, false],
        [true, false, false, false, false],
        [true, false, false, false, true],
        [true, false, true, false, true],
        [false, false, false, false, true],]
    
    export const dodgePreview: Display.Data = [
        [true, true, true, false, true],
        [false, false, false, false, false],
        [true, false, true, true, true],
        [false, false, false, false, false],
        [false, false, true, false, false],]
    
    export const tetrisPreview: Display.Data = [
        [false, false, false, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, false, true],
        [true, true, true, true, true],
    ]

    export function countdown():void {
        Display.drawingData = false
        
        basic.showNumber(3)
        music.playMelody("E", 300)
        basic.showNumber(2)
        music.playMelody("E", 300)
        basic.showNumber(1)
        music.playMelody("A", 300)
        Display.drawingData = true
    }
    
    export function startAnimation():void {
        basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
        basic.showLeds(`
        # . . . #
        . # # # .
        # # . # #
        . # # # .
        # . . . #
        `)
        basic.showLeds(`
        # . . . #
        # . . . #
        # . . . #
        . # # # .
        # . . . #
        `)
        basic.showLeds(`
        # . . . #
        # . . . #
        . . . . .
        # . . . #
        . # # # .
        `)
        basic.pause(300)
    }

    export function pongShowWinner(pl: number):void {
        Display.drawingData = false
        if(pl == 1) {
            for(let i = 0; i < 3; i++) {

                basic.showLeds(`
                . . . . #
                # . . # .
                # . # . .
                # # . . .
                # # # # .
                `)
                basic.pause(100)
                basic.showLeds(`
                . . . . #
                . # . # .
                . # # . .
                . # # # .
                . . . . .
                `)
            }
        } else if (pl == 2) {
            for (let i = 0; i < 3; i++) {
                basic.showLeds(`
                # . . . .
                . # . . #
                . . # . #
                . . . # #
                . # # # #
                `)
                basic.pause(100)
                basic.showLeds(`
                # . . . .
                . # . # .
                . . # # .
                . # # # .
                . . . . .
                `)
            }
        }
        Display.drawingData = true

    }
   
    
    export function closeGame():void {
        Display.drawingData = false
        playGameClosing = true
        basic.showLeds(`
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
        basic.showLeds(`
        . # # # .
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        `)
        basic.showLeds(`
        # # # # #
        . # # # .
        . . . . .
        . . . . .
        . . . . .
        `)
        basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        . # # # .
        . . . . .
        `)
        basic.showLeds(`
        . # # # .
        # # # # #
        # # # # #
        # # # # #
        . # # # .
        `)
        basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        `)
        basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
        Display.drawingData = true
    }
}