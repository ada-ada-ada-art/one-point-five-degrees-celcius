/*

    Created by Ada Ada Ada.
    fxhash: Ada Ada Ada.
    Twitter: @ada_ada_ada_art.
    Licensed under CC BY-NC-SA 4.0

    Built with p5.js.

*/
console.log(`Created by Ada Ada Ada.
fxhash: Ada Ada Ada.
Twitter: @ada_ada_ada_art.
Licensed under CC BY-NC-SA 4.0.
Built with p5.js.`)

const initialRand: number = fxrand()

const fettepaletteSettings = {
  total: 9,
  centerHue: fxrand() * 360,
  hueCycle: fxrand(),
  curveMethod: 'lame',
  // curveMethod: 'powX',
  curveAccent: 0,
  // curveAccent: 0.5,
  offsetTint: 0.01,
  offsetShade: 0.01,
  tintShadeHueShift: 0.01,
  offsetCurveModTint: 0.03,
  offsetCurveModShade: 0.03,
  minSaturationLight: [0, 0],
  maxSaturationLight: [1, 1]
}
console.log(fettepaletteSettings)
const colorRamp = fettepalette.generateRandomColorRamp(fettepaletteSettings)

// Init sketch
// eslint-disable-next-line new-cap
const lona = new p5(startSketch,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  document.getElementById('sketch') || undefined
)

function startSketch (s: p5): void {
  const canvasWidth = window.innerHeight || window.innerWidth
  const canvasHeight = window.innerHeight
  const backgroundColor = colorRamp.light[0]

  const sentence = s.random(sentences)
  const sentenceArr = sentence.split(' ') as string[]
  // Can be jumbled better. Can currently only include two words.
  const jumbledArr = [] as string[]
  let shouldSkipNext = false
  for (let i = 0; i < sentenceArr.length; i++) {
    const val = sentenceArr[i]
    const rand = s.random()
    if (shouldSkipNext) {
      shouldSkipNext = false
    } else if (rand > 0.5 && i < sentenceArr.length - 1) {
      jumbledArr.push(`${val} ${sentenceArr[i + 1]}`)
      shouldSkipNext = true
    } else {
      jumbledArr.push(val)
    }
  }
  console.log('jumbledArr', jumbledArr)

  let leftOffset = s.width / 10
  const topOffset = s.width / 10
  let textMargin = s.height / jumbledArr.length
  const fontSize = 30
  let mainFont: p5.Font

  s.preload = () => {
    // mainFont = s.loadFont('./public/fonts/Inter-Light.otf')
    mainFont = s.loadFont('./public/fonts/Inter-Bold.otf')
  }

  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight)
    s.colorMode(s.HSL, 360, 100, 100, 100)
    s.ellipseMode(s.CENTER)
    s.textSize(fontSize)
    s.textAlign(s.LEFT)

    leftOffset = s.width / 10
    textMargin = s.height / jumbledArr.length
  }

  s.draw = () => {
    s.background(backgroundColor[0], backgroundColor[1] * 100, backgroundColor[2] * 100)

    s.textFont(mainFont)
    const textColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100)
    const ellipseColor = s.color(colorRamp.light[8][0], colorRamp.light[8][1] * 100, colorRamp.light[8][2] * 100)
    for (let i = 0; i < jumbledArr.length; i++) {
      const txt = jumbledArr[i]
      const textBox = mainFont.textBounds(txt, leftOffset, fontSize + textMargin * i) as RectBounds
      s.fill(textColor)
      s.noStroke()
      s.text(txt, leftOffset, fontSize + textMargin * i)
      const ellipseCount = s.random(50, s.width / 3)
      const circleBounds = drawCircles(ellipseCount, textColor, ellipseColor, textBox)
      s.stroke('red')
      s.noFill()
      s.rect(circleBounds.x, circleBounds.y, circleBounds.w, circleBounds.h)
    }
    s.noLoop()
  }

  function drawCircles (ellipseCount: number, startColor: p5.Color, endColor: p5.Color, textBox: RectBounds): RectBounds {
    const baseX = textBox.x + textBox.w + fontSize
    const baseY = textBox.y + textBox.h / 2
    const startX = baseX - fontSize / 2
    let finalX = 0
    for (let e = 0; e < ellipseCount; e++) {
      s.colorMode(s.RGB)
      const lerpVal = s.map(e, 0, ellipseCount, 0, 1)
      const interColor = s.lerpColor(startColor, endColor, lerpVal)
      s.fill(interColor)
      s.ellipse(baseX + e, baseY, fontSize)
      finalX = baseX + e + fontSize / 2
    }
    return {
      x: startX,
      y: baseY - fontSize / 2,
      w: finalX - startX,
      h: fontSize
    }
  }
}
