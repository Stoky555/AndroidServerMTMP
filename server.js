var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/process_get', function(req, res) {
    res.end(JSON.stringify(calculate(req.query.speed, req.query.angle)));
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

const calculate = (v0, angle) => {
    let points = []

    if (!v0 || !angle)
        return {
            error: 'Invalid input',
        }
    let x = 0.0,
        y = 0.0
    let g = 9.81,
        t = 0.0
    angle = deg2rad(angle)
	let timestop = (2 * v0 * Math.sin(angle)) / g	

    for (; t < timestop; t+=0.1) {
        x = v0 * t * Math.cos(angle)
        y = v0 * t * Math.sin(angle) - ((g * t * t) / 2)

        points.push({
            x,
            y,
            t
        })
    }
		points.push({
            x,
            y:0,
            t:timestop
        })

    return points
}

const deg2rad = (degrees) => {
    return degrees * (Math.PI / 180)
}