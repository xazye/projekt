import {gTextures} from "../media.js"
import {constants} from "./Constants.js"
class Bird {
    constructor(){
        this.GRAVITY = 20
        this.ANTI_GRAVITY = -5 

        this.image = gTextures['bird']
        this.width = 38
        this.height = 24

        this.x = constants['VIRTUAL_WIDTH'] / 2 - (self.width / 2)
        this.y = constants['VIRTUAL_HEIGHT'] / 2 - (self.height / 2)

        this.dy = 0
    }
    
    update(dt,keysPressed){
        this.dy = this.dy + this.GRAVITY * dt
        if (keysPressed['space'] == true){
            this.dy = this.ANTI_GRAVITY
        }
        this.y = this.y + this.dy 
    };
    render(){
        image(this.image,this.x, this.y)
    }
    collides(pipe)
    {
        // -- 2 is the left and top offset
        // -- 8 is the right and bottom offset
        // -- if the bird is beetween pipe x edges
        
        if (((-pipe.x) >= this.x - 24) &&
            (((-pipe.x)- 70 <= this.x - 8 )))
        {
            if (pipe.orientation == 'top')
                {
                    if (this.y + 6  <= pipe.y - 45 )
                    {
                        // console.log(this.y," ", pipe.y - 45)
                        // console.log('ycols top')
                        return true
                    }
                }
                else {
                    if (this.y + this.height - 6 >= pipe.y + 45 )
                    {
                        // console.log(this.y," ", pipe.y + 45)
                        // console.log('ycols bot')
                        return true
                    }
                }

        }       
        return false
    }
    exit()
    {
        this.x = constants['VIRTUAL_WIDTH'] / 2 - (self.width / 2)
        this.y = constants['VIRTUAL_HEIGHT'] / 2 - (self.height / 2)
        this.dy = 0
    }
}

export {Bird}