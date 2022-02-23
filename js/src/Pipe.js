import {gTextures} from "../media.js"
import {constants} from "./Constants.js"
class Pipe {
    constructor(orientation,y){
        // gap_heihgt is half of the actual height
        this.GAP_HEIGHT = 45;
        this.x = 0
        this.y = y
        this.image = gTextures['pipe']
        this.orientation = orientation    
    }
    render(){
        push()
        translate(constants['VIRTUAL_WIDTH'],this.y)
        if (this.orientation == 'top')
        {
            scale(1,-1)
        }
        image(this.image,this.x,this.GAP_HEIGHT)
        pop()
    }
    enter(params){
    }
}

export {Pipe}