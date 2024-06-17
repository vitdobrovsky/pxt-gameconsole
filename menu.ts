
namespace Menu {
    export let gameViewing: number = 1

    export function switchGame(currentGame: number, direction: number, maxGames: number):number {
        let note: string = "B3"
        let result: number = currentGame + direction
        if (result > maxGames || result < 1) {
            result = currentGame
            note = "B1"
        }
        music.playMelody(note, 300)
        return result
    }

    export function previewGame(currentGame: number):void{
        if(currentGame === State.pong) {
            Display.data = UI.pongPreview
        } else if (currentGame === State.dodge) {
            Display.data = UI.dodgePreview
        } else if (currentGame === State.tetris) {
            Display.data = UI.tetrisPreview
        }

    }



}