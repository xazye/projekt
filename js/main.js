import {constants} from "./src/Constants.js"
import {StateMachine} from "./src/StateMachine.js"
import {TitleScreenState} from "./src/states/TitleScreenState.js"
import {CountDownState} from "./src/states/CountdownState.js"
import {PlayState} from "./src/states/PlayState.js"
import {ScoreState} from "./src/states/ScoreState.js"

// need to do this or p5.js doesn't see functions.
// why? cuz i'm using type="module"
window.setup=setup;
window.draw=draw;
window.preload=preload;
window.mousePressed=mousePressed;
window.keyPressed=keyPressed;
window.touchStarted=touchStarted;


// keyspressed dict so we can monitor 
// nececary butttons
let keysPressed = {
    space : false,
    enter : false
}

// make gstateMachine global, 
// so thhat we can reach it from every module
window.gStateMachine;

// variables created in p5.js stay there
// so we decleare them here;
let backgroundScroll;
let groundScroll;
let BACKGROUND_SCROLL_SPEED 
let GROUND_SCROLL_SPEED
let BACKGROUND_LOOPING_POINT

let scales 

// i need to load textures see preload()
var gTextures;
var gFonts;

function preload(){
    // i cannot import these from media.js cuz 
    // i create new p5.js elemnt and if i import
    // it crashes this page
    gTextures = {
        background: loadImage("../js/graphics/background.png"),
        bird: loadImage("../js/graphics/bird.png"),
        pipe : loadImage("../js/graphics/pipe.png"),
        ground : loadImage("../js/graphics/ground.png")
    }
    gFonts = {
        smallFont : loadFont("../js/fonts/font.ttf"),
        flappyFont : loadFont("../js/fonts/flappy.ttf")
    }

}

function setup(){
    // to do 
    // change scaling ot nearest neighbo.
    backgroundScroll = 0;
    groundScroll = 0;
    BACKGROUND_SCROLL_SPEED = 30
    GROUND_SCROLL_SPEED = 60
    BACKGROUND_LOOPING_POINT = 413

    window.gStateMachine = new StateMachine({
        'title' :  TitleScreenState.TitleScreenState,
        'countdown' : CountDownState.CountDownState,
        'play' :  PlayState.PlayState,
        'score' : ScoreState.ScoreState
    })
    
    fill(255)
    strokeWeight(0)
    let my_canvas = createCanvas(constants['CANV_WIDTH'],constants['CANV_HEIGHT']);
    my_canvas.parent("game")
    document.getElementsByTagName("canvas")[0].style.width ="100%";
    document.getElementsByTagName("canvas")[0].style.height ="auto";
    gStateMachine.change("title")

    // i found that choosing max work best for me textures.
    let x = constants['CANV_WIDTH'] / constants['VIRTUAL_WIDTH'];
    let y = constants['CANV_HEIGHT'] / constants['VIRTUAL_WIDTH'];
    scales = max(x,y)
};


function draw(){// just a p5.js wrapper for my render function()
    // sacl needs to be apllied every draw
    scale(scales)
    render()
    
};

function update(dt)
{
    // make the ground and background scroll
    backgroundScroll = (backgroundScroll + BACKGROUND_SCROLL_SPEED * dt) % BACKGROUND_LOOPING_POINT
    groundScroll = (groundScroll + GROUND_SCROLL_SPEED * dt) % constants['VIRTUAL_WIDTH'];

    //call update and provide them with deltatime
    // and keyspressed dict
    gStateMachine.update(dt,keysPressed)

    // reset the keyspressed dict
    // makes arrays of keys then 
    // for each elemtn in array calls a function
    // that changes keyspressed[key] to false.
    Object.keys(keysPressed).map(function(key,index){
        keysPressed[key] = false;
    } ) 

}

function render(){ 
    // p5.js doesn't have a function for logic so i call update()
    image(gTextures['background'],-backgroundScroll, 0)
    update(deltaTime / 1000) // cuz deltatime is in seconds and me code needs it in ms
    gStateMachine.render();
    image(gTextures['ground'],-groundScroll, constants['VIRTUAL_HEIGHT']- 15)
}

function keyPressed (){
   
    if (keyCode == 32){
        keysPressed['space'] = true
    }
    else if (keyCode == 13)
    {
        keysPressed['enter'] = true
    }
    return false
}
function mousePressed()
{
    if ((mouseX <= width && mouseX >=0)
        && (mouseY <= height && mouseY >=0))
    {
        keysPressed['space'] = true
        keysPressed['enter'] = true

    }
}
function touchStarted()
{ 
    if ((mouseX <= width && mouseX >=0)
    && (mouseY <= height && mouseY >=0))
    {
        keysPressed['space'] = true
        keysPressed['enter'] = true
        return false
        // return fales makes mousepressd not do it's code 
        // if it's not there mousepressed will be called after end of this code.
        // if i have it outisde loop it hijacks touch on this page.
        // i mean it hijcaks touch nonetheless.
        // but atleas you can scroll to the game
    }
}