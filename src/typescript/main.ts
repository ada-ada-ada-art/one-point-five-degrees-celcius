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
// const initialRand: number = 301189.93446179386
console.log('initialRand', initialRand)

function findShapeType (): string {
  const shapeRandom = fxrand()
  if (shapeRandom > 0.8) {
    return 'Hexagon'
  } else if (shapeRandom > 0.6) {
    return 'Ellipse'
  } else if (shapeRandom > 0.4) {
    return 'Diamond'
  } else {
    return 'Line'
  }
}

function getBackgroundType (): string {
  const bgRandom = fxrand()
  if (bgRandom > 0.85) {
    return 'Reverse'
  } else {
    return 'Regular'
  }
}

window.$fxhashFeatures = {
  Shape: fxrand() > 0.1 ? findShapeType() : 'Mix',
  Background: getBackgroundType()
}

const fettepaletteSettings = {
  total: 9,
  centerHue: fxrand() * 360,
  hueCycle: window.$fxhashFeatures.Background === 'Reverse' ? 0.75 + fxrand() * 0.25 : fxrand(),
  curveMethod: 'lame',
  // curveMethod: 'powX',
  curveAccent: window.$fxhashFeatures.Background === 'Reverse' ? 0.75 + fxrand() * 0.25 : fxrand(),
  // curveAccent: 0.5,
  offsetTint: 0.01,
  offsetShade: 0.01,
  tintShadeHueShift: 0.01,
  offsetCurveModTint: 0.03,
  offsetCurveModShade: 0.03,
  minSaturationLight: [
    window.$fxhashFeatures.Background === 'Reverse' ? 0.5 : 0,
    0
  ],
  maxSaturationLight: [
    1,
    1
  ]
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
  let backgroundColor = s.color(255, 255, 255)
  let backgroundColorEnd = s.color(255, 255, 255)
  let textColor = s.color('#000')
  let startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
  let endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)

  const sentence = s.random(sentences)
  /* let sentence = ''
  const sklurtCount = s.random(20, 40)
  for (let i = 0; i < sklurtCount; i++) {
    sentence += 'sklurt '
  } */
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
        jumbledArr.push(`${prev} ${cur}`.trim())
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
  let topOffset = s.height / 10
  let bottomOffset = s.height / 10
  let textMargin = s.height / jumbledArr.length
  let fontSize = 30
  let mainFont: p5.Font

  s.preload = () => {
    mainFont = s.loadFont('./public/fonts/Inter-Light.otf')
    // mainFont = s.loadFont('./public/fonts/Inter-Bold.otf')
  }

  const synth = window.speechSynthesis
  let voices = [] as SpeechSynthesisVoice[]

  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight)
    const minFontSize = s.map(s.width, 200, 1920, 10, 20, true)
    const maxFontSize = s.map(s.width, 200, 1920, 20, 50, true)
    fontSize = s.map(sentence.length, 80, 180, maxFontSize, minFontSize, true)
    initGraphic(s)

    if (window.$fxhashFeatures.Background === 'Regular') {
      backgroundColor = s.color(0, 0, 100)
      backgroundColorEnd = s.color(0, 0, 100)
      textColor = s.color('#000')
      startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
      endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
    } else {
      backgroundColor = s.color(colorRamp.dark[0][0], colorRamp.dark[0][1] * 100, colorRamp.dark[0][2] * 100)
      backgroundColorEnd = s.color(colorRamp.base[1][0], colorRamp.base[1][1] * 100, colorRamp.base[1][2] * 100)
      startColor = s.color(colorRamp.light[7][0], colorRamp.light[7][1] * 100, colorRamp.light[7][2] * 100)
      endColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100)
      textColor = s.color('#fff')
    }

    leftOffset = s.width / 10
    rightOffset = s.width / 10
    topOffset = s.height / 10
    bottomOffset = s.height / 10
    textMargin = s.height / jumbledArr.length

    voices = synth.getVoices()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        voices = synth.getVoices()
      }
    }
  }

  function initGraphic (graphic: p5): p5 {
    graphic.colorMode(s.HSL, 360, 100, 100, 100)
    graphic.ellipseMode(s.CENTER)
    graphic.rectMode(s.CENTER)
    graphic.textSize(fontSize)
    graphic.textAlign(s.LEFT, s.CENTER)
    graphic.textFont(mainFont)
    graphic.angleMode(s.DEGREES)
  }

  let textY = fontSize + textMargin
  const allLineGraphics = [] as p5[]
  s.draw = () => {
    // s.background(backgroundColor)
    s.colorMode(s.RGB)
    for (let i = 0; i < s.height; i++) {
      const lerpVal = s.map(i, 0, s.height, 0, 1)
      const interColor = s.lerpColor(backgroundColor, backgroundColorEnd, lerpVal)
      s.stroke(interColor)
      s.noFill()
      s.line(0, i, s.width, i)
    }
    s.colorMode(s.HSL, 360, 100, 100)

    calculateLines()
    drawAllLines()

    s.noLoop()
  }

  s.mousePressed = () => {
    const utterThis = new SpeechSynthesisUtterance(sentence)
    utterThis.voice = voices.find((vo) => vo.default)
    synth.speak(utterThis)
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
      const y = (boundingBox.y + i * lineGap + leading / 2) - topOffset
      s.image(graphic, 0, y)
    }
  }

  function calculateLines (): void {
    const shapeType = window.$fxhashFeatures.Shape

    // Establish base values for lines
    textY = fontSize + textMargin
    let shapeBounds = {
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
      const textX = i === 0 ? shapeBounds.x + shapeBounds.w : shapeBounds.x + shapeBounds.w + fontSize / 2
      const shapeRadius = fontSize / 2

      // Simulate the text we're about to write
      const simulatedBox = drawText({
        txt,
        baseX: textX,
        baseY: textY,
        color: textColor,
        font: mainFont,
        isSimulation: true
      })
      let shouldSkipText = false
      // If it goes out of bounds, we might want to start with a circle on next line
      if (simulatedBox.wentOutOfBounds) {
        shouldSkipText = s.random() > 0.5
      }
      if (!shouldSkipText) {
        drawText({
          txt,
          baseX: textX,
          baseY: textY,
          color: textColor,
          font: mainFont,
          graphics: activeLineGraphic
        })
      }
      let baseShapeX = shouldSkipText ? simulatedBox.x + shapeRadius : simulatedBox.x + simulatedBox.w + fontSize
      let baseShapeY = simulatedBox.y + simulatedBox.h / 2
      let totalShapeWidth = s.random(s.width / 10, s.width / 5)
      // Draw shapes now if we have skipped the text, else just simulate them so we can make sure we don't go off bounds
      shapeBounds = drawShapes({
        baseX: baseShapeX,
        baseY: baseShapeY,
        totalShapeWidth,
        shapeRadius,
        startColor,
        endColor,
        graphics: activeLineGraphic,
        isSimulation: !shouldSkipText,
        shapeType
      })

      if (shouldSkipText) {
        // If we skipped text, we want to draw it now after the shapes we just drew
        const skippedTextBox = drawText({
          txt,
          baseX: shapeBounds.x + shapeBounds.w + fontSize / 2,
          baseY: textY,
          color: textColor,
          font: mainFont,
          graphics: activeLineGraphic
        })
        // And then we draw shapes once again
        baseShapeX = skippedTextBox.x + skippedTextBox.w + fontSize
        baseShapeY = skippedTextBox.y + skippedTextBox.h / 2
        shapeBounds = drawShapes({
          baseX: baseShapeX,
          baseY: baseShapeY,
          totalShapeWidth,
          shapeRadius,
          startColor: s.color('red'),
          endColor: s.color('green'),
          graphics: activeLineGraphic,
          isSimulation: true,
          shapeType
        })
      }
      // Simulate the next piece of text to find out if it's going to go out of bounds
      const simulatedNextTextBox = drawText({
        txt: nextTxt,
        baseX: shapeBounds.x + shapeBounds.w + fontSize,
        baseY: textY,
        color: textColor,
        font: mainFont,
        isSimulation: true
      })

      // If the next text was going to be out of bounds, we fill with shapes
      if (simulatedNextTextBox.wentOutOfBounds) {
        totalShapeWidth = s.width - baseShapeX - rightOffset - shapeRadius
      } else if (shapeBounds.x + shapeBounds.w > s.width - rightOffset) {
        // If the shapes were going to go out of bounds, we make sure not to go out of bounds
        totalShapeWidth = s.width - rightOffset - shapeBounds.x
      }
      if (totalShapeWidth > 0) {
        shapeBounds = drawShapes({
          baseX: baseShapeX,
          baseY: baseShapeY,
          totalShapeWidth,
          shapeRadius,
          startColor,
          endColor,
          graphics: activeLineGraphic,
          shapeType
        })
      }

      // If the next text was gonna go out of bounds, we move to the next line
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
      opts.graphics.text(opts.txt, opts.baseX, topOffset + (leading - fontSize) * 1.5)
    }
    return {
      ...textBox,
      wentOutOfBounds
    }
  }

  function drawShapes (opts: DrawShapesOpts): RectBounds {
    const startX = opts.baseX - opts.shapeRadius
    let finalX = 0
    s.colorMode(s.RGB)
    const incrementer = 2
    if (opts.shapeType === 'Mix') opts.shapeType = findShapeType()
    const startRotation = s.random(0, 180)
    for (let i = 0; i < opts.totalShapeWidth; i += incrementer) {
      const lerpVal = s.map(i, 0, opts.totalShapeWidth, 0, 1)
      const interColor = s.lerpColor(opts.startColor, opts.endColor, lerpVal)
      if (!opts.isSimulation && opts.graphics !== undefined) {
        opts.graphics.stroke(interColor)
        opts.graphics.noFill()
        opts.graphics.push()
        opts.graphics.translate(opts.baseX + i, topOffset + opts.shapeRadius)
        if (opts.shapeType === 'Ellipse') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.ellipse(0, 0, opts.shapeRadius * 2, opts.shapeRadius)
        } else if (opts.shapeType === 'Diamond') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.rect(0, 0, opts.shapeRadius * 1.5)
        } else if (opts.shapeType === 'Hexagon') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.beginShape()
          const corners = 6
          for (let j = 0; j < s.TWO_PI; j += (s.TWO_PI / corners)) {
            const x = Math.cos(j) * opts.shapeRadius
            const y = Math.sin(j) * opts.shapeRadius
            opts.graphics.vertex(x, y)
          }
          opts.graphics.endShape(s.CLOSE)
        } else if (opts.shapeType === 'Line') {
          opts.graphics.rotate(i * 3)
          opts.graphics.beginShape()
          for (let j = 0; j < s.TWO_PI; j += s.PI) {
            const x = Math.cos(j) * opts.shapeRadius
            const y = Math.sin(j) * opts.shapeRadius
            opts.graphics.vertex(x, y)
          }
          opts.graphics.endShape(s.CLOSE)
        }
        opts.graphics.pop()
      }
      finalX = opts.baseX + i + opts.shapeRadius
    }
    return {
      x: startX,
      y: opts.baseY - opts.shapeRadius,
      w: finalX - startX,
      h: opts.shapeRadius * 2
    }
  }
}
