var React = require('react')
var PIXI = require('pixi.js')
var gsap = require('gsap');

/*globals TweenMax, TimelineMax */


var Background = React.createClass({
    getInitialState () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },

    componentDidMount () {
        setImmediate(() => {
            console.clear();

            let {holder, canvas} = this.refs;
            let {width, height} = this.state;

            this.renderer = PIXI.autoDetectRenderer(width, height, { 
                antialias: true, 
                view : canvas.getDOMNode()
            });

            this.stage = new PIXI.Container();
                

            var img = PIXI.Sprite.fromImage('images/img1.jpg');
            this.stage.addChild(img);

            console.log(this.state.height);
            
            function createMask (w, h) {
                let graphics = new PIXI.Graphics()

                // set a fill and a line style again and draw a rectangle
                graphics.lineStyle(0, 0x0000FF, 1);
                graphics.beginFill(0xFF700B, 1);
                graphics.arcTo(0, 0, w, h);

                return graphics;
            }

            var mask = createMask(500, 500);
            this.stage.addChild(mask);

            mask.x = 100;
            mask.y = 100;

            // window.img = img;
            window.mask = mask;

            //img.mask = mask;

            // new TimelineMax()
            //     .to(mask, 1, {
            //         x : 200
            //     })
            //     .to(mask, 1, {
            //         y : 100
            //     })
            //     .to(mask, 1, {
            //         x : 0
            //     })
            //     .to(mask, 1, {
            //         y : 0
            //     })


            this.frameLoop();
            window.addEventListener('resize', this.handleResize, true);
        })
    },

    componentWillUnmount () {
        cancelAnimationFrame(this._frame);
        window.removeEventListener('resize', this.handleResize, true);
    },

    componentDidUpdate (prevProps, prevState) {
        this.renderer.resize(this.state.width, this.state.height);
    },

    frameLoop () {
        this._frame = requestAnimationFrame(() => {
            this.renderer.render(this.stage)
            this.frameLoop()
        });
    },

    handleResize () {
        console.log('resize');
        
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    },

    render: function() {
        var style = {
            backgroundColor : 'red',
            position: 'absolute',
            top : 0,
            right: 0,
            bottom: 0,
            left: 0
        }

        return (
            <div ref="holder" style={style}>
                <canvas ref="canvas"></canvas>
            </div>
        );
    }
});

module.exports = Background;


