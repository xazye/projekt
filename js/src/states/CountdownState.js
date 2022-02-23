import {BaseState} from "./BaseState.js"
import {gFonts} from "../../media.js"
import {constants} from "..//Constants.js"


export const CountDownState = (() => {
    class CountDownState extends BaseState.BaseState {
        constructor(){
            super()
            this.COUNTDOWN_TIME = 0.75
            this.count = 3
            this.timer = 0
        }
        update(dt){
            this.timer = this.timer +dt
    
            if (this.timer > this.COUNTDOWN_TIME) {
                this.timer = this.timer % this.COUNTDOWN_TIME
                this.count = this.count - 1
        
                if (this.count == 0)
                {   
                    gStateMachine.change('play')
                }
                    
            }
        };
        render(){
            textFont(gFonts["flappyFont"],56)
            textAlign("center")
            text(`${this.count}`,constants['VIRTUAL_WIDTH']/2,176)
        }
        enter(params){
        }
        exit()
        {
            this.count = 3
        }
       
    }
    return {CountDownState: new CountDownState()}

})();