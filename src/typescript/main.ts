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
// const initialRand: number = 595953.3256006886
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
    // Throw a dice to see if we want to add more text
    if (rand > 0.5 && idx !== 0) {
      if (idx === arr.length - 1) {
        jumbledArr.push(`${cur}`.trim())
        return cur
      } else if (str.length <= maxStringLength) {
        // If string is not long enough, keep trying to add more
        return str
      } else {
        // If string is long enough, add what we have so far and keep going
        shouldMakePitStop = true
      }
    }
    if (shouldMakePitStop) {
      jumbledArr.push(`${prev}`.trim())
      // If we're at the last word, add that one as well as a separate entry
      if (idx === arr.length - 1) {
        jumbledArr.push(`${cur}`.trim())
      }
      return cur
    }
    // If dice didn't work, just add what we have now and reset the ongoing string
    jumbledArr.push(str.trim())
    return ''
  }, '')
  console.log(sentence, jumbledArr)

  let leftOffset = s.width / 10
  let rightOffset = s.width / 10
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
    // s.background(backgroundColor[0], backgroundColor[1] * 0, backgroundColor[2] * 100)
    s.background(0, 0, 100)

    s.textFont(mainFont)
    const textColor = s.color('#222')
    const startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
    const endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
    textY = fontSize + textMargin
    let circleBounds = {
      x: leftOffset,
      y: textY,
      w: 0,
      h: 0
    }
    for (let i = 0; i < jumbledArr.length; i++) {
      const txt = jumbledArr[i].trim()
      const nextTxt = i < jumbledArr.length - 1 ? jumbledArr[i + 1].trim() : ''
      const textX = i === 0 ? circleBounds.x + circleBounds.w : circleBounds.x + circleBounds.w + fontSize
      const textBox = drawText({
        txt,
        baseX: textX,
        baseY: textY,
        color: textColor,
        font: mainFont
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
        startColor: s.color('red'),
        endColor: s.color('burgundy'),
        isSimulation: true
      })

      const simulatedNextTextBox = drawText({
        isSimulation: true,
        txt: nextTxt,
        baseX: circleBounds.x + circleBounds.w + fontSize,
        baseY: textY,
        color: textColor,
        font: mainFont
      })

      // If the next text was going to be out of bounds, we fill with circles
      if (simulatedNextTextBox.wasMovedDown) {
        circleCount = s.width - baseCircleX - rightOffset - circleRadius
        // console.log('Finalized circles for: ', txt)
      } else if (circleBounds.x + circleBounds.w > s.width - rightOffset) {
        // If the circles were going to go out of bounds, we make sure not to go out of bounds
        circleCount = s.width - rightOffset - circleBounds.x
        // console.log('Limit circles for: ', txt)
      }
      if (circleCount > 0) {
        circleBounds = drawCircles({
          baseX: baseCircleX,
          baseY: baseCircleY,
          circleCount,
          circleRadius,
          startColor,
          endColor
          // isSimulation: true
        })
      }
    }
    s.noLoop()
  }

  function drawText (opts: DrawTextOpts): TextBounds {
    let textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
    let wasMovedDown = false
    if (textBox.x + textBox.w > s.width - rightOffset) {
      opts.baseX = leftOffset
      opts.baseY += textMargin
      if (!opts.isSimulation) {
        textY += textMargin
      }
      textBox = opts.font.textBounds(opts.txt, opts.baseX, opts.baseY) as RectBounds
      wasMovedDown = true
      // console.log(`"${opts.txt}" was moved down in a ${opts.isSimulation ? 'non-' : ''}simulation.`)
    }
    if (!opts.isSimulation) {
      s.fill(opts.color)
      s.noStroke()
      s.text(opts.txt, opts.baseX, opts.baseY)
      // const textPoints = opts.font.textToPoints(opts.txt, opts.baseX, opts.baseY, fontSize, {
      //   sampleFactor: 0.5
      // })
      // const startColor = s.color('red')
      // const endColor = s.color('blue')
      // s.colorMode(s.RGB)
      // for (let i = 0; i < textPoints.length; i++) {
      //   const lerpVal = s.map(i, 0, textPoints.length, 0, 1)
      //   const interColor = s.lerpColor(startColor, endColor, lerpVal)
      //   s.stroke(interColor)
      //   const po = textPoints[i]
      //   s.point(po.x, po.y)
      // }
    }
    return {
      ...textBox,
      wasMovedDown
    }
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
        s.noStroke()
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
