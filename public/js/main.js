console.log("Created by Ada Ada Ada.\nfxhash: Ada Ada Ada.\nTwitter: @ada_ada_ada_art.\nLicensed under CC BY-NC-SA 4.0.\nBuilt with p5.js.");
var initialRand = fxrand();
var colorRamp = fettepalette.generateRandomColorRamp({
    total: 9,
    centerHue: 0,
    hueCycle: 0.3,
    curveMethod: 'lame',
    curveAccent: 0,
    offsetTint: 0.01,
    offsetShade: 0.01,
    tintShadeHueShift: 0.01,
    offsetCurveModTint: 0.03,
    offsetCurveModShade: 0.03,
    minSaturationLight: [0, 0],
    maxSaturationLight: [1, 1]
});
var lona = new p5(startSketch, document.getElementById('sketch') || undefined);
var bikes = null;
var cars = null;
var busses = null;
var passengerCount = 100;
var backgroundColor = colorRamp.light[8];
function startSketch(s) {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var offset = 30;
    var bikePathPoints = [];
    var carPathPoints = [];
    var busPathPoints = [];
    s.setup = function () {
        s.createCanvas(canvasWidth, canvasHeight);
        s.colorMode(s.HSL, 360, 100, 100, 100);
        s.rectMode(s.CENTER);
        s.noFill();
        s.strokeWeight(5);
        bikePathPoints = [
            s.createVector(-offset * 3, offset * 3),
            s.createVector(offset * 3, offset * 3),
            s.createVector(s.width - offset * 3, offset * 3),
            s.createVector(s.width + offset * 3, offset * 3)
        ];
        carPathPoints = [
            s.createVector(-offset * 3, s.height - offset * 3),
            s.createVector(offset * 3, s.height - offset * 3),
            s.createVector(s.width - offset * 3, s.height - offset * 5),
            s.createVector(s.width + offset * 3, s.height - offset * 5)
        ];
        cars = new VehicleGroup(s, carPathPoints, 24, 1.5, passengerCount, 271, colorRamp);
        busPathPoints = [
            s.createVector(-offset * 3, s.height - offset * 9),
            s.createVector(offset * 3, s.height - offset * 9),
            s.createVector(s.width - offset * 3, s.height - offset * 12),
            s.createVector(s.width + offset * 3, s.height - offset * 9)
        ];
        busses = new VehicleGroup(s, busPathPoints, 40, 20, passengerCount, 101, colorRamp);
    };
    s.draw = function () {
        s.background(backgroundColor[0], backgroundColor[1] * 100, backgroundColor[2] * 100, 5);
        cars.run();
        busses.run();
    };
}
//# sourceMappingURL=main.js.map