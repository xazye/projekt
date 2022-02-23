import {BaseState} from "./BaseState.js"
import {gFonts} from "../../media.js"
import {constants} from "..//Constants.js"
export const ScoreState = (() => {
    class ScoreState extends BaseState.BaseState {
        constructor(){
            super()
        }

        update(dt,keysPressed){
            if (keysPressed['enter'] == true) {
                gStateMachine.change('title')
            }

        };

        render(){
            textFont(gFonts["flappyFont"],28)
            textAlign("center")
            text("You lost !",constants['VIRTUAL_WIDTH']/2,78)
            textFont(gFonts["flappyFont"],14)
            text("Score : " + this.score ,constants['VIRTUAL_WIDTH']/2,107)
            text("Press Enter or Click to Play Again! ",constants['VIRTUAL_WIDTH']/2,167)

        }
        
        enter(params){
            this.score = typeof(params) == "object" ? 0: params;
        }
        exit()
        {
        }
       
    }
    return {ScoreState: new ScoreState()}

})();