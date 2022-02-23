import {constants} from "./Constants.js"
import {Pipe} from "./Pipe.js"

class PipePair {
    constructor(y,speed){
        this.PIPE_HEIGHT = 70
        // this is where pipes will spawn
        this.x = 0
        //  y is for the topm pipe; gap is a vertical shift of second
        this.y = y
        this.speed= speed ? speed : 70;
        this.pipes = {
            upper : new Pipe('top', this.y),
            lower : new Pipe('bottom', this.y)
        }
        this.remove = false;
        this.scored = false;
    }
    update(dt){
        
        if (this.x > -constants['VIRTUAL_WIDTH'] - this.PIPE_HEIGHT) {
            this.x = this.x - this.speed * dt
            this.pipes['lower'].x = this.x
            this.pipes['upper'].x = this.x
        }
        else{
            // i hope this is the only pointer to pipes
            // i hope i did it right so the garbage collector can free this.
            this.pipes['lower'].x = null;
            this.pipes['upper'].x = null;
        } 
    };

    render(){
        Object.keys(this.pipes).forEach((key,index) =>{
            this.pipes[key].render()
        })
    }
}

export {PipePair}