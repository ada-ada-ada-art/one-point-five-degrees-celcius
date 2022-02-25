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

declare function fxrand (): number
declare function fxpreview (): void

const initialRand: number = fxrand() * 999999
// const initialRand: number = 430980.98573948024

function findShapeType (): string {
  const rand = fxrand()
  if (rand > (1 / 6) * 5) {
    return 'Star'
  } else if (rand > (1 / 6) * 4) {
    return 'Hexagon'
  } else if (rand > (1 / 6) * 3) {
    return 'Ellipse'
  } else if (rand > (1 / 6) * 2) {
    return 'Square'
  } else if (rand > (1 / 6) * 1) {
    return 'Chaos'
  } else {
    return 'Line'
  }
}

function getBackgroundType (): string {
  const rand = fxrand()
  if (rand > 0.66) {
    return 'Dark'
  } else if (rand > 0.33) {
    return 'Reverse'
  } else {
    return 'Regular'
  }
}

function getSpecialText (): string {
  const rand = fxrand()
  if (rand < 0.94) {
    return 'None'
  } else if (rand < 0.96) {
    return 'Real'
  } else if (rand < 0.98) {
    return 'Firehouse'
  } else {
    return 'Delay'
  }
}

let strikethroughThreshold = 0.5
let shakyLineThreshold = 0.5
function getCensorshipType (): string {
  const rand = fxrand()
  if (rand > 0.95) {
    strikethroughThreshold = 1
    shakyLineThreshold = 1
    return 'None'
  } else if (rand > 0.8) {
    strikethroughThreshold = 0.5
    shakyLineThreshold = 0.5
    return '50/50'
  } else {
    strikethroughThreshold = 0.8
    shakyLineThreshold = 0.8
    return '80/20'
  }
}

let ditherEffect = 'atkinson'
function getDitherEffect (): string {
  const rand = fxrand()
  if (rand > 0.95) {
    ditherEffect = 'none'
    return 'None'
  } else if (rand > 0.66) {
    ditherEffect = 'bayer'
    return 'Bayer'
  } else if (rand > 0.33) {
    ditherEffect = 'floydsteinberg'
    return 'Floyd-Steinberg'
  } else {
    ditherEffect = 'atkinson'
    return 'Atkinson'
  }
}

let shapeSize = 'Regular'
function getShapeSize (): string {
  const rand = fxrand()
  if (rand > 0.875) {
    shapeSize = 'Massive'
  } else if (rand > 0.65) {
    shapeSize = 'Triple'
  } else {
    shapeSize = 'Regular'
  }
  return shapeSize
}

declare interface FXHashFeatures {
  Shape: string
  Background: string
  'Special text': string
  Censorship: string
  Dithering: string
  'Shape Size': string
}
const $fxhashFeatures: FXHashFeatures = {
  Shape: fxrand() > 0.1 ? findShapeType() : 'Mix',
  Background: getBackgroundType(),
  'Special text': getSpecialText(),
  Censorship: getCensorshipType(),
  Dithering: getDitherEffect(),
  'Shape Size': getShapeSize()
}

console.table($fxhashFeatures)

const fettepaletteSettings = {
  total: 9,
  centerHue: $fxhashFeatures.Background === 'Reverse' ? (345 + fxrand() * 180) % 360 : fxrand() * 360,
  hueCycle: fxrand(),
  curveMethod: 'lame',
  // curveMethod: 'powX',
  curveAccent: $fxhashFeatures.Background === 'Reverse' ? 0.5 : fxrand(),
  // curveAccent: 0.5,
  offsetTint: 0.01,
  offsetShade: 0.01,
  tintShadeHueShift: 0.01,
  offsetCurveModTint: 0.03,
  offsetCurveModShade: 0.03,
  minSaturationLight: [
    0,
    0
  ],
  maxSaturationLight: [
    $fxhashFeatures.Background === 'Reverse' ? 0.7 : 1,
    $fxhashFeatures.Background === 'Reverse' ? 0.7 : 1
  ]
}
// console.log(fettepaletteSettings)
const colorRamp = fettepalette.generateRandomColorRamp(fettepaletteSettings)

// SRC: https://www.freecodecamp.org/news/javascript-debounce-example/
function debounce (func: any, timeout = 300): any {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

// Init sketch
let resetFunction = (): void => { console.log('Starting.') }
// eslint-disable-next-line new-cap
let lona = new p5(startSketch,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  document.getElementById('sketch') || undefined
)

const resizeReset = debounce(() => resetFunction())
window.onresize = (evt) => {
  if (lona) {
    resizeReset()
  } else {
    // eslint-disable-next-line new-cap
    lona = new p5(startSketch,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      document.getElementById('sketch') || undefined
    )
  }
}

function startSketch (s: p5): void {
  s.randomSeed(initialRand)
  s.noiseSeed(initialRand)

  let canvasWidth = window.innerWidth
  let canvasHeight = window.innerHeight
  let backgroundColor = s.color(255, 255, 255)
  let textColor = s.color('#000')
  let startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
  let endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)

  let sentenceId: number|string = Math.floor(s.random(0, sentences.length))
  let sentence: string = sentences[sentenceId]
  console.log(`Quote #${sentenceId} of ${sentences.length}`)
  if ($fxhashFeatures['Special text'] === 'Firehouse') {
    sentenceId = 'our house is on fire'
    sentence = 'Our house is on fire.'
    for (let i = 0; i < 4; i++) {
      sentence += ' Our house is on fire.'
    }
  } else if ($fxhashFeatures['Special text'] === 'Real') {
    sentenceId = 'the climate crisis is real'
    sentence = 'The climate crisis is real.'
    for (let i = 0; i < 4; i++) {
      sentence += ' The climate crisis is real.'
    }
  } else if ($fxhashFeatures['Special text'] === 'Delay') {
    sentenceId = 'climate delay is the new climate denial'
    sentence = 'Climate delay is the new climate denial.'
    for (let i = 0; i < 3; i++) {
      sentence += ' Climate delay is the new climate denial.'
    }
  }
  let sentenceArr = sentence.split(' ')
  let jumbledArr = [] as string[]
  // We set a limit for the string, so we don't have to deal with splitting a too long string and move to next line and shit
  const maxStringLength = 20
  sentenceArr.reduce((prev, cur, idx, arr) => {
    const rand = s.random()
    const str = `${prev} ${cur}`
    let shouldMakePitStop = str.length > maxStringLength
    // Throw a dice to see if we want to add more text
    if (!shouldMakePitStop && rand > 0.3 && idx !== 0) {
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
      if (prev !== '') jumbledArr.push(`${prev}`.trim())
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
  // console.log(sentence, jumbledArr)
  console.log(`“${sentence}”`)

  let leftOffset = s.width / 10
  let rightOffset = s.width / 10
  let topOffset = s.height / 10
  let bottomOffset = s.height / 10
  let textMargin = s.height / jumbledArr.length
  let fontSize = 30
  let mainFont: p5.Font

  function resetSketch (): void {
    s.randomSeed(initialRand)
    s.noiseSeed(initialRand)

    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    let sentenceId: number|string = Math.round(s.random(0, sentences.length))
    let sentence: string = sentences[sentenceId]
    console.log(`Quote #${sentenceId} of ${sentences.length}`)
    if ($fxhashFeatures['Special text'] === 'Firehouse') {
      sentenceId = 'our house is on fire'
      sentence = 'Our house is on fire.'
      for (let i = 0; i < 4; i++) {
        sentence += ' Our house is on fire.'
      }
    } else if ($fxhashFeatures['Special text'] === 'Real') {
      sentenceId = 'the climate crisis is real'
      sentence = 'The climate crisis is real.'
      for (let i = 0; i < 4; i++) {
        sentence += ' The climate crisis is real.'
      }
    } else if ($fxhashFeatures['Special text'] === 'Delay') {
      sentenceId = 'climate delay is the new climate denial'
      sentence = 'Climate delay is the new climate denial.'
      for (let i = 0; i < 3; i++) {
        sentence += ' Climate delay is the new climate denial.'
      }
    }
    sentenceArr = sentence.split(' ')
    jumbledArr = [] as string[]
    // We set a limit for the string, so we don't have to deal with splitting a too long string and move to next line and shit
    sentenceArr.reduce((prev, cur, idx, arr) => {
      const rand = s.random()
      const str = `${prev} ${cur}`
      let shouldMakePitStop = str.length > maxStringLength
      // Throw a dice to see if we want to add more text
      if (!shouldMakePitStop && rand > 0.3 && idx !== 0) {
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
        if (prev !== '') jumbledArr.push(`${prev}`.trim())
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
    // console.log(sentence, jumbledArr)
    console.log(`“${sentence}”`)

    leftOffset = s.width / 10
    rightOffset = s.width / 10
    topOffset = s.height / 10
    bottomOffset = s.height / 10
    textMargin = s.height / jumbledArr.length

    s.setup()
    s.draw()
  }
  resetFunction = resetSketch

  s.preload = () => {
    mainFont = s.loadFont('./public/fonts/Inter-Light.otf')
  }

  const synth = window.speechSynthesis
  let voices = [] as SpeechSynthesisVoice[]

  let canv = null
  s.setup = () => {
    canv = s.createCanvas(canvasWidth, canvasHeight)
    const minFontSize = s.map(s.width, 200, 1920, 10, 20, true)
    const maxFontSize = s.map(s.width, 200, 1920, 20, 50, true)
    fontSize = s.map(sentence.length, 80, 180, maxFontSize, minFontSize, true)
    initGraphic(s)

    if ($fxhashFeatures.Background === 'Regular') {
      backgroundColor = s.color(s.random(0, 360), s.random(0, 10), s.random(30, 100))
      textColor = s.color('#000')
      startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
      endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
    } else if ($fxhashFeatures.Background === 'Dark') {
      backgroundColor = s.color(0, 0, 10)
      startColor = s.color(colorRamp.light[7][0], colorRamp.light[7][1] * 100, colorRamp.light[7][2] * 100)
      endColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100)
      textColor = s.color('#fff')
    } else {
      backgroundColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
      startColor = s.color(colorRamp.base[4][0], 100, 40)
      endColor = s.color(colorRamp.base[4][0], 100, 90)
      textColor = s.color(0, 0, 100)
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
    return graphic
  }

  let textY = fontSize + textMargin
  let allLineGraphics = [] as p5.Graphics[]
  s.draw = () => {
    allLineGraphics = [] as p5.Graphics[]
    s.background(backgroundColor)
    s.colorMode(s.HSL, 360, 100, 100)

    prepareLines()
    drawAllLines()
    drawLabels()

    dither(s, ditherEffect)

    s.noLoop()

    fxpreview()
  }

  s.doubleClicked = () => {
    const utterThis = new SpeechSynthesisUtterance(sentence)
    utterThis.voice = voices.find((vo) => vo.default)
    synth.speak(utterThis)
  }

  function drawLabels (): void {
    const labelFontSize = 15
    // s.textFont(labelFont)
    s.textSize(labelFontSize)
    s.stroke(textColor)
    const lineY = s.height - bottomOffset - labelFontSize
    s.strokeWeight(1)
    s.line(leftOffset, lineY, leftOffset * 2, lineY)
    s.line(s.width - rightOffset, lineY, s.width - rightOffset * 2, lineY)
    s.noStroke()
    s.fill(textColor)
    s.textAlign(s.LEFT)
    s.text('one point five degrees celcius', leftOffset, s.height - bottomOffset + labelFontSize)
    s.textAlign(s.RIGHT)
    let idLabelTxt = `quote #${sentenceId}`
    if (typeof sentenceId !== 'number') {
      idLabelTxt = sentenceId
    }
    s.text(idLabelTxt, s.width - rightOffset, s.height - bottomOffset + labelFontSize)
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

  function prepareLines (): void {
    const shapeType = $fxhashFeatures.Shape

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
      const isStrikethrough = s.random() > strikethroughThreshold
      const isShakyText = s.random() > shakyLineThreshold
      opts.graphics.fill(opts.color)
      opts.graphics.noStroke()
      const leading = opts.graphics.textLeading()
      if (isStrikethrough) {
        opts.graphics.text(opts.txt, opts.baseX, topOffset + (leading - fontSize) * 1.5)
        opts.graphics.stroke(backgroundColor)
        opts.graphics.noFill()
        opts.graphics.strokeWeight(fontSize / 8)
        opts.graphics.rect(textBox.x + textBox.w / 2, topOffset + leading / 2, textBox.w, 1)
      } else if (!isShakyText) {
        const txtPoints = mainFont.textToPoints(opts.txt, opts.baseX, topOffset + (leading - fontSize / 2), fontSize, {
          sampleFactor: 1
        }) as Array<{x: number, y: number, alpha: number}>
        opts.graphics.stroke(opts.color)
        opts.graphics.noFill()
        opts.graphics.strokeWeight(1)
        opts.graphics.beginShape()
        for (const po of txtPoints) {
          const xRandom = s.random()
          const yRandom = s.random()
          if (s.random() > 0.33) opts.graphics.point(po.x + xRandom, po.y + yRandom)
        }
        opts.graphics.endShape()
      } else {
        opts.graphics.text(opts.txt, opts.baseX, topOffset + (leading - fontSize) * 1.5)
      }
      opts.graphics.textSize(fontSize)
    }
    return {
      ...textBox,
      wentOutOfBounds
    }
  }

  function drawShapes (opts: DrawShapesOpts): RectBounds {
    let drawnShapeRadius = opts.shapeRadius
    if ($fxhashFeatures['Shape Size'] === 'Triple') {
      drawnShapeRadius = opts.shapeRadius * 3
    } else if ($fxhashFeatures['Shape Size'] === 'Massive') {
      drawnShapeRadius = opts.shapeRadius * 10
    }
    const startX = opts.baseX - opts.shapeRadius
    let finalX = 0
    s.colorMode(s.RGB)
    const incrementer = 2
    if (opts.shapeType === 'Mix') opts.shapeType = findShapeType()
    const startRotation = s.random(0, 180)
    for (let i = 0; i < opts.totalShapeWidth; i += incrementer) {
      const lerpVal = s.map(i, 0, opts.totalShapeWidth, 0, 1)
      const interColor = s.lerpColor(opts.startColor, opts.endColor, lerpVal)
      if ($fxhashFeatures['Shape Size'] === 'Massive') interColor.setAlpha(99)
      if (!opts.isSimulation && opts.graphics !== undefined) {
        opts.graphics.stroke(interColor)
        opts.graphics.noFill()
        opts.graphics.push()
        opts.graphics.translate(opts.baseX + i, topOffset + opts.shapeRadius)
        if (opts.shapeType === 'Ellipse') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.ellipse(0, 0, drawnShapeRadius * 2, drawnShapeRadius)
        } else if (opts.shapeType === 'Square') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.rect(0, 0, drawnShapeRadius * 1.5)
        } else if (opts.shapeType === 'Hexagon') {
          opts.graphics.rotate(startRotation - i)
          opts.graphics.beginShape()
          const corners = 6
          for (let j = 0; j < s.TWO_PI; j += (s.TWO_PI / corners)) {
            const x = Math.cos(j) * drawnShapeRadius
            const y = Math.sin(j) * drawnShapeRadius
            opts.graphics.vertex(x, y)
          }
          opts.graphics.endShape(s.CLOSE)
        } else if (opts.shapeType === 'Line') {
          opts.graphics.rotate(i * 3)
          opts.graphics.beginShape()
          for (let j = 0; j < s.TWO_PI; j += s.PI) {
            const x = Math.cos(j) * drawnShapeRadius
            const y = Math.sin(j) * drawnShapeRadius
            opts.graphics.vertex(x, y)
          }
          opts.graphics.endShape(s.CLOSE)
        } else if (opts.shapeType === 'Chaos') {
          opts.graphics.rotate(i % 45)
          opts.graphics.strokeWeight(s.random(1, 15))
          opts.graphics.strokeCap(s.ROUND)
          opts.graphics.beginShape()
          for (let j = 0; j < s.TWO_PI; j += s.PI) {
            const x = Math.cos(j) * drawnShapeRadius
            const y = Math.sin(j) * drawnShapeRadius
            opts.graphics.vertex(x, y)
          }
          opts.graphics.endShape(s.CLOSE)
        } else if (opts.shapeType === 'Star') {
          opts.graphics.rotate(i * 15)
          const corners = 3
          opts.graphics.beginShape()
          for (let j = 0; j < s.TWO_PI; j += (s.TWO_PI / corners)) {
            const x = Math.cos(j) * drawnShapeRadius
            const y = Math.sin(j) * drawnShapeRadius
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

// Adapted (poorly with great glitchy effect) from p5.riso's dither implementation: https://github.com/antiboredom/p5.riso
function dither (s: p5, type: string, threshold?: number): void {
  // source adapted from: https://github.com/meemoo/meemooapp/blob/44236a29574812026407c0288ab15390e88b556a/src/nodes/image-monochrome-worker.js

  if (threshold === undefined) threshold = 128

  const w = s.width
  let newPixel, err

  const bayerThresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90]
  ]

  const lumR = []
  const lumG = []
  const lumB = []

  s.loadPixels()

  for (let i = 0; i < 256; i++) {
    lumR[i] = i * 0.299
    lumG[i] = i * 0.587
    lumB[i] = i * 0.114
  }

  for (let i = 0; i <= s.pixels.length; i += 4) {
    s.pixels[i] = Math.floor(lumR[s.pixels[i]] + lumG[s.pixels[i + 1]] + lumB[s.pixels[i + 2]])
  }

  const floydsteinbergThreshold = s.random() * 129
  for (let i = 0; i <= s.pixels.length; i += 4) {
    if (type === 'none') {
      // No dithering
      s.pixels[i] = s.pixels[i] < threshold ? 0 : 255
    } else if (type === 'bayer') {
      // 4x4 Bayer ordered dithering algorithm
      const x = i / 4 % w
      const y = Math.floor(i / 4 / w)
      const map = Math.floor((s.pixels[i] + bayerThresholdMap[x % 4][y % 4]) / 2)
      s.pixels[i] = (map < threshold) ? 0 : 255
    } else if (type === 'floydsteinberg') {
      // Floyd–Steinberg dithering algorithm
      newPixel = s.pixels[i] < floydsteinbergThreshold ? 0 : 255
      err = Math.floor((s.pixels[i] - newPixel) / 16)
      s.pixels[i] = newPixel
      s.pixels[i + 4] += err * 7
      s.pixels[i + 4 * w - 4] += err * 3
      s.pixels[i + 4 * w] += err * 5
      s.pixels[i + 4 * w + 4] += err * 1
    } else {
      // Bill Atkinson's dithering algorithm
      newPixel = s.pixels[i] < 129 ? 0 : 255
      err = Math.floor((s.pixels[i] - newPixel) / 8)
      s.pixels[i] = newPixel

      s.pixels[i + 4] += err
      s.pixels[i + 8] += err
      s.pixels[i + 4 * w - 4] += err
      s.pixels[i + 4 * w] += err
      s.pixels[i + 4 * w + 4] += err
      s.pixels[i + 8 * w] += err
    }
  }
  s.updatePixels()
  // return out
}
