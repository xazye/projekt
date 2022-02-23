import {BaseState} from "./states/BaseState.js"

export const StateMachine = (function(states){
    class StateMachine extends BaseState.BaseState
    {
        constructor(states){
            
            super()
            
            this.current = {
                render : function(){},
                update : function(){},
                enter : function(){},
                exit : function(){}
            };
            this.states = states ? states : {};
            
        };
    
        change(stateName, enterParams)
        {
            enterParams = enterParams || {};
            this.current.exit();
            this.current = this.states[stateName];
            this.current.enter(enterParams);
            
        };
    
        update(dt,keysPressed)
        {
            this.current.update(dt,keysPressed)
        }
        
        render(){
            this.current.render()
        }
    };
    return new StateMachine(states) // return a StateMAchine class
});
