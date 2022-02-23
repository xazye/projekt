new p5();
const gTextures = {
        background: loadImage("../js/graphics/background.png"),
        bird: loadImage("../js/graphics/bird.png"),
        pipe : loadImage("../js/graphics/pipe.png"),
        ground : loadImage("../js/graphics/ground.png")
}
const gFonts = {
    smallFont : loadFont("../js/fonts/font.ttf"),
    flappyFont : loadFont("../js/fonts/flappy.ttf")
}
export {gTextures, gFonts}