namespace Pong {

    export namespace Ball {
        export let isFirstTouch: boolean = true
        export let pos: Display.DotObject = {
            x: 2,
            y: 1
        }
        export let velocity: Velocity = {
            x: 1,
            y: 0
        }

        let hadZeroAngle: boolean
        let lastVelY: number

        type Velocity = {
            x: number,
            y: number
        }

        export function move(): void {
            collisions()
            if (firstFrame) {
                basic.pause(300)
                firstFrame = false
            }


            pos.y += velocity.y
            pos.x += velocity.x
        }

        function bounceX(): void {
            velocity.x *= -1

            if (isFirstTouch) {
                velocity.y = 1
                isFirstTouch = false
            }

            if (!hadZeroAngle) {
                if (Math.randomBoolean()) {
                    hadZeroAngle = true
                    lastVelY = velocity.y
                    velocity.y = 0
                }
            } else {
                velocity.y = lastVelY
                hadZeroAngle = false
            }

            UI.playE = true


        }

        function bounceY(): void {
            velocity.y *= -1

        }

        function collisions(): void {

            if (leftBat.x + 1 >= pos.x && velocity.x == -1) {
                if (leftBat.topy === pos.y || leftBat.topy === pos.y - 1) bounceX()
            } else if (rightBat.x - 1 <= pos.x && velocity.x == 1) {
                if (rightBat.topy === pos.y || rightBat.topy === pos.y - 1) bounceX()
            }

            if (pos.y >= Display.size.y || pos.y <= 0) bounceY()

        }
    }
    type Score = {
        p1: number,
        p2: number
    }

    let score: Score = {
        p1: 0,
        p2: 0
    }

    let firstFrame: boolean = true

    export function reset():void {
        score.p1 = 0
        score.p2 = 0
        slowLoopSpeed = defaultSlowLoopSpeed

        consoleState = State.mainMenu
        Ball.isFirstTouch = true
        firstFrame = true
        Ball.pos.y = 1
        Ball.pos.x = 2
        Ball.velocity.y = 0

    }

    export function scoringSystem():void {
        if ((Ball.pos.x > Display.size.x || Ball.pos.x < 0)) {
            if (Ball.pos.x > Display.size.x) {
                Ball.velocity.x = 1
                score.p1 += 1

            } else if (Ball.pos.x < 0) {
                Ball.velocity.x = -1
                score.p2 += 1
            }
            
            if (score.p1 != 10 && score.p2 != 10) {
                music.playMelody("B4", 300)
                Display.drawingData = false
                whaleysans.showNumber(+`${score.p1}${score.p2}`)
                basic.pause(2000)
                Display.drawingData = true
            }

            if (slowLoopSpeed > 0) slowLoopSpeed -= 10
            Ball.pos.y = 1
            Ball.pos.x = 2
            Ball.velocity.y = 0
            Ball.isFirstTouch = true
            firstFrame = true


        }

        if (score.p1 >= 10 || score.p2 >= 10) {
            UI.playGameEnding = true
            if (score.p1 > score.p2) {
                UI.pongShowWinner(1)
            } else {
                UI.pongShowWinner(2)
            }

            reset()
        }

    }

    export function isLedEmpty(x: number, y: number): boolean {
        let empty: boolean = true

        if ((leftBat.topy === y || leftBat.topy === y - 1) && leftBat.x === x) empty = false
        if ((rightBat.topy === y || rightBat.topy === y - 1) && rightBat.x === x) empty = false

        return empty
    }

    export function update():void {
        Ball.move()
        scoringSystem()
    }

    export class PongBat {
        size: number
        public topy: number
        public x: number
        public body: Array<Array<number>>

        constructor(sz: number, sd: number, ty: number) {
            this.size = sz
            this.topy = ty
            this.x = sd
            this.body = []

            for (let i = 0; i < this.size; i++) {
                this.body.push([this.x, this.topy + i]);
            }

        }

        updateBody(): void {
            for (let i = 0; i < this.size; i++) {
                this.body[i][1] = this.topy + i
            }
        }

        public moveUp(): void {
            if (this.topy > 0) {
                this.topy -= 1
                this.updateBody()
            }
        }

        public moveDown(): void {
            if (this.topy + this.size <= Display.size.y) {
                this.topy += 1
                this.updateBody()

            }

        }


    }

   

    export const leftBat = new PongBat(2, 0, 0)
    export const rightBat = new PongBat(2, 4, 0)
}