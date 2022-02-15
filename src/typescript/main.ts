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
// const initialRand: number = 88807.58624848444
console.log('initialRand', initialRand)

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

  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight
  const backgroundColor = colorRamp.dark[8]

  const sentence = s.random(sentences)
  const sentenceArr = sentence.split(' ') as string[]
  const jumbledArr = [] as string[]
  // We set a limit for the string, so we don't have to deal with splitting a too long string and move to next line and shit
  const maxStringLength = 20
  sentenceArr.reduce((prev, cur, idx, arr) => {
    const rand = s.random()
    const str = `${prev} ${cur}`
    let shouldMakePitStop = str.length > maxStringLength
    console.log('----', cur, '----')
    // Throw a dice to see if we want to add more text
    if (rand > 0.5 && idx !== 0) {
      console.log('MORE TEXT')
      if (idx === arr.length - 1) {
        console.log('BUT THIS IS LAST')
        jumbledArr.push(`${prev} ${cur}`.trim())
        return cur
      } else if (str.length <= maxStringLength) {
        console.log('LETS GOOO')
        // If string is not long enough, keep trying to add more
        return str
      } else {
        console.log('MAKE PIT STOP')
        // If string is long enough, add what we have so far and keep going
        shouldMakePitStop = true
      }
    }
    if (shouldMakePitStop) {
      console.log('IN THE PIT STOP')
      jumbledArr.push(`${prev}`.trim())
      // If we're at the last word, add that one as well as a separate entry
      if (idx === arr.length - 1) {
        console.log('LAST WORD')
        jumbledArr.push(`${cur}`.trim())
      }
      return cur
    }
    console.log('ADD WHAT WE HAVE')
    // If dice didn't work, just add what we have now and reset the ongoing string
    jumbledArr.push(str.trim())
    return ''
  }, '')
  console.log(sentence, jumbledArr)

  let leftOffset = s.width / 10
  let rightOffset = s.width / 10
  let topOffset = s.height / 10
  let bottomOffset = s.height / 10
  let textMargin = s.height / jumbledArr.length
  let fontSize = 30
  let mainFont: p5.Font

  s.preload = () => {
    // mainFont = s.loadFont('./public/fonts/Inter-Light.otf')
    mainFont = s.loadFont('./public/fonts/Inter-Bold.otf')
  }

  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight)
    fontSize = s.map(sentence.length, 80, 180, 50, 30)
    initGraphic(s)

    leftOffset = s.width / 10
    rightOffset = s.width / 10
    topOffset = s.height / 10
    bottomOffset = s.height / 10
    textMargin = s.height / jumbledArr.length
  }

  function initGraphic (graphic: p5): p5 {
    graphic.colorMode(s.HSL, 360, 100, 100, 100)
    graphic.ellipseMode(s.CENTER)
    graphic.textSize(fontSize)
    graphic.textAlign(s.LEFT, s.CENTER)
    graphic.textFont(mainFont)
  }

  let textY = fontSize + textMargin
  const allLineGraphics = [] as p5[]
  s.draw = () => {
    // s.background(backgroundColor[0], backgroundColor[1] * 0, backgroundColor[2] * 100)
    s.background(0, 0, 100)

    calculateLines()
    drawAllLines()

    s.noLoop()
  }

  function drawAllLines (): void {
    const boundingBox: RectBounds = {
      x: leftOffset,
      y: topOffset,
      w: s.width - leftOffset - rightOffset,
      h: s.height - topOffset - bottomOffset
    }
    const leading = s.textLeading()
    const lineGap = boundingBox.h / allLineGraphics.length
    for (let i = 0; i < allLineGraphics.length; i++) {
      const graphic = allLineGraphics[i]
      const y = boundingBox.y + i * lineGap
      s.image(graphic, 0, y + leading / 2)
    }
  }

  function calculateLines (): void {
    // Find colors
    const textColor = s.color('#000')
    const startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
    const endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)

    // Establish base values for lines
    textY = fontSize + textMargin
    let circleBounds = {
      x: leftOffset,
      y: textY,
      w: 0,
      h: 0
    }

    let activeLineGraphic = s.createGraphics(s.width, s.height)
    initGraphic(activeLineGraphic)
    for (let i = 0; i < jumbledArr.length; i++) {
      const txt = jumbledArr[i].trim()
      const nextTxt = i < jumbledArr.length - 1 ? jumbledArr[i + 1].trim() : ''
      const textX = i === 0 ? circleBounds.x + circleBounds.w : circleBounds.x + circleBounds.w + fontSize / 2
      const textBox = drawText({
        txt,
        baseX: textX,
        baseY: textY,
        color: textColor,
        font: mainFont,
        graphics: activeLineGraphic
      })
      const baseCircleX = textBox.x + textBox.w + fontSize
      const baseCircleY = textBox.y + textBox.h / 2
      const circleRadius = fontSize / 2
      let circleCount = s.random(50, s.width / 3)
      circleBounds = drawCircles({
        baseX: baseCircleX,
        baseY: baseCircleY,
        circleCount,
        circleRadius,
        startColor: s.color('black'),
        endColor: s.color('grey'),
        isSimulation: true
      })

      // Simulate the next piece of text to find out if it's going to go out of bounds
      const simulatedNextTextBox = drawText({
        txt: nextTxt,
        baseX: circleBounds.x + circleBounds.w + fontSize,
        baseY: textY,
        color: textColor,
        font: mainFont,
        isSimulation: true
      })

      // If the next text was going to be out of bounds, we fill with circles
      if (simulatedNextTextBox.wentOutOfBounds) {
        circleCount = s.width - baseCircleX - rightOffset - circleRadius
      } else if (circleBounds.x + circleBounds.w > s.width - rightOffset) {
        // If the circles were going to go out of bounds, we make sure not to go out of bounds
        circleCount = s.width - rightOffset - circleBounds.x
      }
      if (circleCount > 0) {
        circleBounds = drawCircles({
          baseX: baseCircleX,
          baseY: baseCircleY,
          circleCount,
          circleRadius,
          startColor,
          endColor,
          graphics: activeLineGraphic
        })
      }

      if (simulatedNextTextBox.wentOutOfBounds) {
        allLineGraphics.push(activeLineGraphic)
        activeLineGraphic = s.createGraphics(s.width, s.height)
        initGraphic(activeLineGraphic)
      }
    }
  }

  function drawText (opts: DrawTextOpts): TextBounds {
    let textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
    let wentOutOfBounds = false
    if (textBox.x + textBox.w > s.width - rightOffset) {
      opts.baseX = leftOffset
      textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
      wentOutOfBounds = true
    }
    if (!opts.isSimulation && opts.graphics !== undefined) {
      opts.graphics.fill(opts.color)
      opts.graphics.noStroke()
      const leading = opts.graphics.textLeading()
      opts.graphics.text(opts.txt, opts.baseX, (leading - fontSize) * 1.5)
    }
    return {
      ...textBox,
      wentOutOfBounds
    }
  }

  function drawCircles (opts: DrawCirclesOpts): RectBounds {
    const startX = opts.baseX - opts.circleRadius
    let finalX = 0
    s.colorMode(s.RGB)
    for (let i = 0; i < opts.circleCount; i++) {
      const lerpVal = s.map(i, 0, opts.circleCount, 0, 1)
      const interColor = s.lerpColor(opts.startColor, opts.endColor, lerpVal)
      if (!opts.isSimulation && opts.graphics !== undefined) {
        opts.graphics.fill(interColor)
        opts.graphics.noStroke()
        opts.graphics.ellipse(opts.baseX + i, opts.circleRadius, opts.circleRadius * 2)
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
