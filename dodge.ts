// Add your code here

namespace Dodge {
    game.pause()
    
    let row: number = 0

    export let character: game.LedSprite = game.createSprite(2, 4)
    let obstacles: game.LedSprite[] = []

    export let score: number = 0

    let speed: number = 300


    function createObstacles():void {
        if (row % 3 == 0) {
            let emptyLed: number = randint(0, 4)
            for (let index = 0; index <= 4; index++) {
                if (index != emptyLed) {
                    obstacles.push(game.createSprite(index, 0))
                }
            }
        }
    }

    function moveObstacles():void {
        for (let obstacle of obstacles) {
            obstacle.change(LedSpriteProperty.Y, +1)
        }
    }

    function removeObstacles():void {
        while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.Y) == Display.size.y) {
            obstacles.removeAt(0).delete()
            score += 1
            UI.playE = true
            if (speed > 0) speed -= 5
        }
    }

    export function reset():void {
        while (obstacles.length > 0) {
            obstacles.removeAt(0).delete()
        }
        speed = 300
        row = 0
        game.pause()
        character.set(LedSpriteProperty.X, 2)
    }


    function gameOver():void {
        for (let obstacle of obstacles) {
            if (obstacle.get(LedSpriteProperty.X) == character.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == character.get(LedSpriteProperty.Y)) {
                reset()
                UI.playGameLose = true
                whaleysans.showNumber(Math.round(score / 4))
                basic.pause(1500)
                score = 0
                consoleState = State.mainMenu
            }
        }
    }

    export function move(direction: number):void {
        Dodge.character.change(LedSpriteProperty.X, direction)
    }

    export function update():void {
        game.resume()
        removeObstacles()
        moveObstacles()
        createObstacles()
        row += 1
        gameOver()
        basic.pause(speed)
    }
}