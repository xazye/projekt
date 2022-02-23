import {BaseState} from "./BaseState.js"
import {Bird} from "../Bird.js"
import {constants} from "..//Constants.js"
import { PipePair } from "../PipePair.js";
import {gFonts} from "../../media.js"
export const PlayState = (() => {
    class PlayState extends BaseState.BaseState {
        constructor(){
            super()
            this.init()

        }


        init(){
            this.bird = new Bird()
            this.pipePairs = []
            this.timer = 0
            this.score = 0 
            this.PIPE_SPEED = 70;
            this.spawnTime = 2;
            // so we can keep track of the last gap, removes the possibilty
            // of impossible gaps0
            this.lastY = Math.random()*80 + 20
        }

        update(dt,keysPressed){
            this.timer = this.timer + dt

            if(this.timer >this.spawnTime ){
                let y = Math.max(50 // to make sure it doesn;t spawn outside upper edge
                    ,Math.min(
                    this.lastY + Math.random()*80 -Math.random()*80,
                        constants['VIRTUAL_HEIGHT']-50))
                            // the second arg in min is the lowest the pipe can potentialy render
                            // which is 5px above thie virtual height
                this.lastY = y
                this.pipePairs.push(new PipePair(y,this.PIPE_SPEED)) 
                this.PIPE_SPEED = this.PIPE_SPEED >= 800 ? 800: this.PIPE_SPEED + 10;
                this.spawnTime = this.spawnTime -0.1 <= 0.5 ? 0.5 : this.spawnTime - 0.1;
                this.timer = 0
            }
            for (let i =0; i < this.pipePairs.length;i++)
            {
                if (( -this.pipePairs[i].x >= this.bird.x) && (!this.pipePairs[i].scored))
                {
                    this.pipePairs[i].scored = true
                    this.score = this.score + 1
                }
                this.pipePairs[i].update(dt)
            }
            this.bird.update(dt,keysPressed)
            for (let i =0; i < this.pipePairs.length;i++)
            {
                for (const [key,value] of Object.entries(this.pipePairs[i].pipes))
                {
                    let colid = this.bird.collides(value)
                    if (colid) {
                        gStateMachine.change('score', this.score)
                    }
                    
                }
            }
            if (this.bird.y + this.bird.height >= constants['VIRTUAL_HEIGHT']){
                gStateMachine.change('score', this.score)    
            }
        };

        render(){
            this.bird.render()
            for (let i =0; i < this.pipePairs.length;i++)
            {
                this.pipePairs[i].render()
            }
            push()
            textFont(gFonts["flappyFont"],28)
            textAlign("left")
            text('Score: '+ this.score, 8, 22)
            pop()
        
        }

        enter(params){
            this.bird.x = constants['VIRTUAL_WIDTH'] / 2 
            this.bird.y = constants['VIRTUAL_HEIGHT'] / 2 
            this.bird.dy = 0
            this.score = 0;
        }

        exit()
        {
            this.init()
        
        }
    }
    return {PlayState: new PlayState()}
})();