import {BaseState} from "./BaseState.js"
import {gFonts} from "../../media.js"
import {constants} from "..//Constants.js"

export const TitleScreenState = (() => {
    class TitleScreenState extends BaseState.BaseState {
        constructor(){
            super()
        }
        update(dt,keysPressed){
            if (keysPressed['enter'] == true) {
                gStateMachine.change('countdown')
            }
        };
        render(){
            textFont(gFonts['flappyFont'],28)
            textAlign("center")
            text("Not Flappy Bird",constants['VIRTUAL_WIDTH']/2,92)
            textFont(gFonts["flappyFont"],18)
            text("Press Enter or Click",constants['VIRTUAL_WIDTH']/2,118)
        }
        enter(params){
        }
    }
    return {TitleScreenState: new TitleScreenState()}

})();