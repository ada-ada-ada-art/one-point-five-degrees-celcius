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

const initialRand: number = fxrand() * 999999
// const initialRand: number = 1

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
  s.randomSeed(initialRand)
  s.noiseSeed(initialRand)

  const canvasWidth = window.innerHeight || window.innerWidth
  const canvasHeight = window.innerHeight
  const backgroundColor = colorRamp.light[0]

  const sentence = s.random(sentences)
  const sentenceArr = sentence.split(' ') as string[]
  const jumbledArr = sentenceArr.map((val, idx) => {
    const rand = s.random()
    if (rand > 0.5 && idx !== 0) return `|${val}`
    else return val
  })
  const finalJumbledArr = jumbledArr.join(' ').split('|')
  console.log('finalJumbledArr', finalJumbledArr)

  let leftOffset = s.width / 10
  let rightOffset = s.width / 10
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
    rightOffset = s.width / 10
    textMargin = s.height / jumbledArr.length
  }

  let textY = fontSize + textMargin
  s.draw = () => {
    s.background(backgroundColor[0], backgroundColor[1] * 100, backgroundColor[2] * 100)

    s.textFont(mainFont)
    const textColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100)
    const ellipseColor = s.color(colorRamp.light[8][0], colorRamp.light[8][1] * 100, colorRamp.light[8][2] * 100)
    textY = fontSize + textMargin
    let circleBounds = { x: leftOffset, y: textY, w: 0, h: 0 }
    for (let i = 0; i < finalJumbledArr.length; i++) {
      const txt = finalJumbledArr[i]
      const nextTxt = i < finalJumbledArr.length - 1 ? finalJumbledArr[i + 1] : '·'
      const textX = i === 0 ? circleBounds.x + circleBounds.w : circleBounds.x + circleBounds.w + fontSize
      const textBox = drawText({
        txt,
        baseX: textX,
        baseY: textY,
        color: textColor,
        font: mainFont
      })
      // if (nextTextBox.x + nextTextBox.w > s.width -rightOffset) {

      // }
      const baseCircleX = textBox.x + textBox.w + fontSize
      const baseCircleY = textBox.y + textBox.h / 2
      const circleRadius = fontSize / 2
      let circleCount = s.random(50, s.width / 3)
      circleBounds = drawCircles({
        baseX: baseCircleX,
        baseY: baseCircleY,
        circleCount,
        circleRadius,
        startColor: s.color('red'),
        endColor: s.color('burgundy'),
        isSimulation: true
      })

      const simulatedNextTextBox = drawText({
        isSimulation: true,
        txt: nextTxt,
        baseX: circleBounds.x + circleBounds.w,
        baseY: textY,
        color: textColor,
        font: mainFont
      })

      // If the next text was going to be out of bounds, we fill with circles
      if (simulatedNextTextBox.wasMovedDown) {
        circleCount = s.width - baseCircleX - rightOffset - circleRadius
      } else if (circleBounds.x + circleBounds.w > s.width - rightOffset) {
        // If the circles were going to go out of bounds, we make sure not to go out of bounds
        circleCount = s.width - rightOffset - circleBounds.x
      }
      circleBounds = drawCircles({
        baseX: baseCircleX,
        baseY: baseCircleY,
        circleCount,
        circleRadius,
        startColor: textColor,
        endColor: ellipseColor
      })
    }
    s.noLoop()
  }

  function drawText (opts: DrawTextOpts): TextBounds {
    let textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
    let wasMovedDown = false
    if (textBox.x + textBox.w > s.width - rightOffset) {
      opts.baseX = leftOffset
      textY += textMargin
      opts.baseY += textMargin
      textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
      wasMovedDown = true
    }
    if (!opts.isSimulation) {
      s.fill(opts.color)
      s.noStroke()
      s.text(opts.txt, opts.baseX, opts.baseY)
    }
    return { ...textBox, wasMovedDown }
  }

  function drawCircles (opts: DrawCirclesOpts): RectBounds {
    const startX = opts.baseX - opts.circleRadius
    let finalX = 0
    for (let i = 0; i < opts.circleCount; i++) {
      s.colorMode(s.RGB)
      const lerpVal = s.map(i, 0, opts.circleCount, 0, 1)
      const interColor = s.lerpColor(opts.startColor, opts.endColor, lerpVal)
      if (!opts.isSimulation) {
        s.fill(interColor)
        s.ellipse(opts.baseX + i, opts.baseY, opts.circleRadius * 2)
      }
      finalX = opts.baseX + i + opts.circleRadius
    }
    return {
      x: startX,
      y: opts.baseY - opts.circleRadius,
      w: finalX - startX,
      h: opts.circleRadius * 2
    }
  }
}
