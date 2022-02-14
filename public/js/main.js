console.log("Created by Ada Ada Ada.\nfxhash: Ada Ada Ada.\nTwitter: @ada_ada_ada_art.\nLicensed under CC BY-NC-SA 4.0.\nBuilt with p5.js.");
var initialRand = fxrand();
var fettepaletteSettings = {
    total: 9,
    centerHue: fxrand() * 360,
    hueCycle: fxrand(),
    curveMethod: 'lame',
    curveAccent: 0,
    offsetTint: 0.01,
    offsetShade: 0.01,
    tintShadeHueShift: 0.01,
    offsetCurveModTint: 0.03,
    offsetCurveModShade: 0.03,
    minSaturationLight: [0, 0],
    maxSaturationLight: [1, 1]
};
console.log(fettepaletteSettings);
var colorRamp = fettepalette.generateRandomColorRamp(fettepaletteSettings);
var lona = new p5(startSketch, document.getElementById('sketch') || undefined);
function startSketch(s) {
    var canvasWidth = window.innerHeight || window.innerWidth;
    var canvasHeight = window.innerHeight;
    var backgroundColor = colorRamp.light[0];
    var sentence = s.random(sentences);
    var sentenceArr = sentence.split(' ');
    var jumbledArr = [];
    var shouldSkipNext = false;
    for (var i = 0; i < sentenceArr.length; i++) {
        var val = sentenceArr[i];
        var rand = s.random();
        if (shouldSkipNext) {
            shouldSkipNext = false;
        }
        else if (rand > 0.5 && i < sentenceArr.length - 1) {
            jumbledArr.push("".concat(val, " ").concat(sentenceArr[i + 1]));
            shouldSkipNext = true;
        }
        else {
            jumbledArr.push(val);
        }
    }
    console.log('jumbledArr', jumbledArr);
    var leftOffset = s.width / 10;
    var topOffset = s.width / 10;
    var textMargin = s.height / jumbledArr.length;
    var fontSize = 30;
    var mainFont;
    s.preload = function () {
        mainFont = s.loadFont('./public/fonts/Inter-Bold.otf');
    };
    s.setup = function () {
        s.createCanvas(canvasWidth, canvasHeight);
        s.colorMode(s.HSL, 360, 100, 100, 100);
        s.ellipseMode(s.CENTER);
        s.textSize(fontSize);
        s.textAlign(s.LEFT);
        leftOffset = s.width / 10;
        textMargin = s.height / jumbledArr.length;
    };
    s.draw = function () {
        s.background(backgroundColor[0], backgroundColor[1] * 100, backgroundColor[2] * 100);
        s.textFont(mainFont);
        var textColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100);
        var ellipseColor = s.color(colorRamp.light[8][0], colorRamp.light[8][1] * 100, colorRamp.light[8][2] * 100);
        for (var i = 0; i < jumbledArr.length; i++) {
            var txt = jumbledArr[i];
            var textBox = mainFont.textBounds(txt, leftOffset, fontSize + textMargin * i);
            s.fill(textColor);
            s.noStroke();
            s.text(txt, leftOffset, fontSize + textMargin * i);
            var ellipseCount = s.random(50, s.width / 3);
            var circleBounds = drawCircles(ellipseCount, textColor, ellipseColor, textBox);
            s.stroke('red');
            s.noFill();
            s.rect(circleBounds.x, circleBounds.y, circleBounds.w, circleBounds.h);
        }
        s.noLoop();
    };
    function drawCircles(ellipseCount, startColor, endColor, textBox) {
        var baseX = textBox.x + textBox.w + fontSize;
        var baseY = textBox.y + textBox.h / 2;
        var startX = baseX - fontSize / 2;
        var finalX = 0;
        for (var e = 0; e < ellipseCount; e++) {
            s.colorMode(s.RGB);
            var lerpVal = s.map(e, 0, ellipseCount, 0, 1);
            var interColor = s.lerpColor(startColor, endColor, lerpVal);
            s.fill(interColor);
            s.ellipse(baseX + e, baseY, fontSize);
            finalX = baseX + e + fontSize / 2;
        }
        return {
            x: startX,
            y: baseY - fontSize / 2,
            w: finalX - startX,
            h: fontSize
        };
    }
}
//# sourceMappingURL=main.js.map