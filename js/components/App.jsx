var React = require('react')
var Background = require('./Background.jsx')

var App = React.createClass({
    render: function() {
        return ( 
            <div>
                <Background/>
                {/*
                <div className="logo">
                    You
                    <br/>gotta
                    <br/>love
                    <br/>frontend
                </div>
                */}
            </div>
        );
    }
});


module.exports = App;