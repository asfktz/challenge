'use strict'

/*globals PIXI,TimelineMax, TweenMax */

var DEBUG = 1;

var winWidth = window.innerWidth
var winHeight = window.innerHeight

var renderer = PIXI.autoDetectRenderer(winWidth, winHeight, {
    antialias: true,
    view: document.getElementById('canvas'),
    transparent: true
});

var stage = new PIXI.Container();


// graphics.drawRect(100,100, 100, 100)

var arcs = new PIXI.Container();
var images = new PIXI.Container();

stage.addChild(arcs);
stage.addChild(images);

var paths = [
    'images/img1.jpg',
    'images/img2.jpg'
];

paths.forEach(function(path, i) {
    var y = paths.length;
    let img = PIXI.Sprite.fromImage(path)

    img.width = winWidth;
    img.height = window.innerHeight;

    let mask = new PIXI.Graphics()
    mask.lineStyle(3, 0x0000FF, 1)
    mask.beginFill(0xFF700B, 1)
    mask.fillAlpha = 0
    console.log(i)

    let startAngle = Math.PI * (2 / y) * (i)
    let endAngle = Math.PI * (2 / y) * (i + 1)

    mask.moveTo(0, 0)
    mask.arc(0, 0, winWidth * 1.4, startAngle, endAngle)
    mask.endFill()

    //if (!DEBUG)
        img.mask = mask;

    images.addChild(img)
    arcs.addChild(mask)
});

arcs.x = winWidth * 0.5
arcs.y = winHeight

images.alpha = 1

images.pivot.x = images.width / 2;
images.pivot.y = images.height / 2;

images.x = winWidth / 2;
images.y = window.innerHeight / 2;

stage.x = 0;
stage.y = 0;


var border = new PIXI.Graphics();

border.lineStyle(10, 0x000000, 1);

if (!DEBUG) {
    border.beginFill(0XFFFFFF)
    stage.mask = border;
}

border.drawRect(0,0, winWidth, window.innerHeight);


stage.addChild(border)

if (DEBUG)
    stage.scale.set(0.7)

stage.x = winWidth * 0.5
stage.y = winHeight * 0.5

stage.pivot.x = winWidth * 0.5
stage.pivot.y = winHeight * 0.5

var tm = new TimelineMax()//.stop();

tm.add([
    TweenMax.to(images.scale, 10, {
        x : 1.5,
        y : 1.5
    }),


    new TimelineMax()
        .add(
            TweenMax.set(arcs, {
                x : winWidth,
                y : 0,
                rotation : Math.PI * 0.5
            })
        )
        .add(
            TweenMax.to(arcs, 3, {
                    x : 0, 
                    y : winHeight, rotation : Math.PI * -1.5,
                    ease : Power4.easeInOut 
            }),
            '+=1'
        )
        .add(
            TweenMax.to(arcs, 3, {
                rotation : Math.PI * -1.5, 
                ease : Power4.easeInOut
            }), 
            '+=1'
        )
        // .add(
        //     TweenMax.to(arcs, 1, 
        //         { rotation : Math.PI * -2.5  }
        //     ), '+=1'
        // )
        // .add(
        //     TweenMax.to(arcs, 1, 
        //         { rotation : Math.PI * -1.5  }
        //     ), '+=2'
        // )
])
// .to(stage.scale, 1.5, {
//     x : 0.5,
//     y : 0.5
// }, '-=1.5')


;(function render(argument) {
    requestAnimationFrame(function() {
        renderer.render(stage)
        render();
    })
})();
