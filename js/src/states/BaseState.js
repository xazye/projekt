// boilerplate code so we have at leats empty classes in StateMachine
export const BaseState = (() => {
    class BaseState {
        init(){}
        enter(){}
        exit(){}
        update(){}
        render(){}
    };
    return {BaseState: BaseState}; // return a dict with BaseState class

})(); //an anonymous function is created and called.