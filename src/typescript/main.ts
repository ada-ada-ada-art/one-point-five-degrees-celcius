/*

    Created by Ada Ada Ada.
    fxhash: Ada Ada Ada.
    Twitter: @ada_ada_ada_art.
    Licensed under Climate Strike License

    Built with p5.js.

*/

console.log(`Created by Ada Ada Ada.
fxhash: Ada Ada Ada.
Twitter: @ada_ada_ada_art.
Built with p5.js.`)
const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}LICENSE.md`
console.log('License can be found here: ' + url)

// The actual functions are found in the index.html, but we must declare them here so Typescript knows what to do with them
declare function fxrand (): number
declare function fxpreview (): void

const initialRand: number = fxrand() * 999999

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
  if (rand > 0.8) {
    shapeSize = 'Massive'
  } else if (rand > 0.5) {
    shapeSize = 'Triple'
  } else {
    shapeSize = 'Regular'
  }
  return shapeSize
}

window.$fxhashFeatures = {
  Shape: fxrand() > 0.1 ? findShapeType() : 'Mix',
  Background: getBackgroundType(),
  'Special text': getSpecialText(),
  Censorship: getCensorshipType(),
  Dithering: getDitherEffect(),
  'Shape size': getShapeSize()
}

console.table(window.$fxhashFeatures)

// These settings are used to create the color palette
const fettepaletteSettings: fettepalette.GenerateRandomColorRampArgument = {
  total: 9,
  centerHue: window.$fxhashFeatures.Background === 'Reverse' ? (345 + fxrand() * 180) % 360 : fxrand() * 360,
  hueCycle: fxrand(),
  curveAccent: window.$fxhashFeatures.Background === 'Reverse' ? 0.5 : fxrand(),
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
    window.$fxhashFeatures.Background === 'Reverse' ? 0.7 : 1,
    window.$fxhashFeatures.Background === 'Reverse' ? 0.7 : 1
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
// eslint-disable-next-line new-cap
let lona = new p5(startSketch,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  document.getElementById('sketch') || undefined
)

// We use a debounce in order to make sure that reset doesn't happen at every single resize event, which can be quite a lot
const resizeReset = debounce(() => lona.resetSketch())
window.onresize = () => {
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

  // Load the basic variables
  let canvasWidth = window.innerWidth
  let canvasHeight = window.innerHeight
  let backgroundColor = s.color(255, 255, 255)
  let textColor = s.color('#000')
  let startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
  let endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)

  // Get a random sentence on first load
  let sentenceId: number|string = Math.floor(s.random(0, sentences.length))
  let sentence: string = sentences[sentenceId]
  console.log(`Quote #${sentenceId} of ${sentences.length}`)
  // If we have determined a special text, we need to use a custom sentence
  if (window.$fxhashFeatures['Special text'] === 'Firehouse') {
    sentenceId = 'our house is on fire'
    sentence = 'Our house is on fire.'
    for (let i = 0; i < 4; i++) {
      sentence += ' Our house is on fire.'
    }
  } else if (window.$fxhashFeatures['Special text'] === 'Real') {
    sentenceId = 'the climate crisis is real'
    sentence = 'The climate crisis is real.'
    for (let i = 0; i < 4; i++) {
      sentence += ' The climate crisis is real.'
    }
  } else if (window.$fxhashFeatures['Special text'] === 'Delay') {
    sentenceId = 'climate delay is climate denial'
    sentence = 'Climate delay is the new climate denial.'
    for (let i = 0; i < 3; i++) {
      sentence += ' Climate delay is the new climate denial.'
    }
  }
  let jumbledArr = [] as string[]
  initSentence()

  // These settings decide the "margin" of the text
  let leftOffset = s.width / 10
  let rightOffset = s.width / 10
  let topOffset = s.height / 10
  let bottomOffset = s.height / 10
  let textMargin = s.height / jumbledArr.length

  // Font variables
  let fontSize = 30
  let mainFont: p5.Font

  // This takes the sentence and turns into a jumbled array.
  // E.g. "Climate delay is the new climate denial." might become ["Climate delay is", "the new", "climate denial."] or it might become ["Climate", "delay is the new", "climate", "denial."]
  // The entries in the jumbled array will be separate by some colorful shapes
  function initSentence (): void {
    const sentenceArr = sentence.split(' ')
    jumbledArr = [] as string[]
    // We set a limit for the string, so we don't have to deal with splitting a too long string and move to next line and stuff like that
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
  }

  s.resetSketch = (): void => {
    console.log('resetsketch')
    s.randomSeed(initialRand)
    s.noiseSeed(initialRand)

    // Window size might've changed, so we reinitialize these
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    initSentence()

    leftOffset = s.width / 10
    rightOffset = s.width / 10
    topOffset = s.height / 10
    bottomOffset = s.height / 10
    textMargin = s.height / jumbledArr.length

    // We call setup manually when resetting the sketch
    s.setup()
  }

  // Font needs to be loaded before anything
  s.preload = () => {
    mainFont = s.loadFont('./public/fonts/Inter-Light.otf')
  }

  // We use speech synthesis to read text out loud as a bonus feature
  const synth = window.speechSynthesis
  let voices = [] as SpeechSynthesisVoice[]

  // Text can be a bit hard to place with p5, so we have to calculate where it should start first
  let textY = fontSize + textMargin
  // Each line of text+shapes is in a separate p5.Graphics, so we collect them here
  let allLineGraphics = [] as p5.Graphics[]

  let canv: p5.Renderer = null
  s.setup = () => {
    // Adds some screen reader compatibility, which is different based on features
    s.describeElement('Text', `Showing the following text: ${sentence}.`, s.FALLBACK)
    s.describeElement('Shapes', `The text is surrounded by shapes in a ${window.$fxhashFeatures.Shape} shape. The size of the shapes is ${window.$fxhashFeatures['Shape size']}.`, s.FALLBACK)
    if (window.$fxhashFeatures.Background === 'Dark') s.describeElement('Background', 'The background color of the canvas is dark with white text.', s.FALLBACK)
    if (window.$fxhashFeatures.Background === 'Regular') s.describeElement('Background', 'The background color of the canvas is grey with dark text.', s.FALLBACK)
    if (window.$fxhashFeatures.Background === 'Reverse') s.describeElement('Background', 'The background color of the canvas is colorful with light text.', s.FALLBACK)
    if (window.$fxhashFeatures.Dithering !== 'None') s.describeElement('Glitch effect', `There is also a glitch effect based on the ${window.$fxhashFeatures.Dithering} dithering algorithm.`, s.FALLBACK)
    if (!canv) {
      canv = s.createCanvas(canvasWidth, canvasHeight)
    } else {
      s.resizeCanvas(canvasWidth, canvasHeight)
    }

    // Font size should change depending on the length of the text as well as the screen height, so we handle that here
    const minFontSize = s.map(s.height, 360, 1000, 10, 20, true)
    const maxFontSize = s.map(s.height, 360, 1000, 15, 50, true)
    fontSize = s.map(sentence.length, 80, 180, maxFontSize, minFontSize, true)

    // We initialize the main p5 sketch with desired rectMode, colorMode, etc.
    initGraphic(s)

    // Establish colors
    if (window.$fxhashFeatures.Background === 'Regular') {
      backgroundColor = s.color(s.random(0, 360), s.random(0, 10), s.random(30, 100))
      textColor = s.color('#000')
      startColor = s.color(colorRamp.light[0][0], colorRamp.light[0][1] * 100, colorRamp.light[0][2] * 100)
      endColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
    } else if (window.$fxhashFeatures.Background === 'Dark') {
      backgroundColor = s.color(s.random(0, 360), s.random(0, 30), s.random(0, 20))
      startColor = s.color(colorRamp.light[7][0], colorRamp.light[7][1] * 100, colorRamp.light[7][2] * 100)
      endColor = s.color(colorRamp.base[6][0], colorRamp.base[6][1] * 100, colorRamp.base[6][2] * 100)
      textColor = s.color('#fff')
    } else {
      backgroundColor = s.color(colorRamp.base[4][0], colorRamp.base[4][1] * 100, colorRamp.base[4][2] * 100)
      startColor = s.color(colorRamp.base[4][0], 100, 40)
      endColor = s.color(colorRamp.base[4][0], 100, 90)
      textColor = s.color(0, 0, 100)
    }

    // Reinitialize margins again
    leftOffset = s.width / 10
    rightOffset = s.width / 10
    topOffset = s.height / 10
    bottomOffset = s.height / 10
    textMargin = s.height / jumbledArr.length

    // Not all browsers support SpeechSynthesis (e.g. the fxhash capture module), so we check first
    if (synth) {
      // Get a list of all voices installed on the user's device
      voices = synth.getVoices()
      // This should also happen in case the voices are updated
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          voices = synth.getVoices()
        }
      }
    }

    // We make double sure that the lineGraphics are removed when running setup
    for (const graph of allLineGraphics) {
      graph.remove()
    }
    allLineGraphics = [] as p5.Graphics[]
    s.background(backgroundColor)
    s.colorMode(s.HSL, 360, 100, 100)

    prepareLines()
    drawAllLines()
    drawLabels()

    dither(s, ditherEffect)

    fxpreview()
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

  let startTouchX: number
  s.touchStarted = () => {
    startTouchX = s.mouseX
  }

  s.touchEnded = () => {
    const touchLimitX = s.width / 20
    let swipeDirection = 0
    if (startTouchX < s.mouseX - touchLimitX) {
      swipeDirection = -1
    } else if (startTouchX > s.mouseX + touchLimitX) {
      swipeDirection = 1
    }
    updateQuote(swipeDirection)
  }

  s.keyPressed = () => {
    let swipeDirection = 0
    if (s.keyCode === s.LEFT_ARROW) {
      swipeDirection = -1
    } else if (s.keyCode === s.RIGHT_ARROW) {
      swipeDirection = 1
    }
    updateQuote(swipeDirection)
  }

  function updateQuote (swipeDirection: number): void {
    if (swipeDirection !== 0) {
      if (typeof sentenceId === 'number') {
        if (swipeDirection === -1) {
          sentenceId = sentenceId - 1 >= 0 ? sentenceId - 1 : sentences.length - 1
        } else if (swipeDirection === 1) {
          sentenceId = sentenceId + 1 < sentences.length ? sentenceId + 1 : 0
        }
        sentence = sentences[sentenceId]
      } else {
        sentenceId = 0
        sentence = sentences[sentenceId]
      }
      s.resetSketch()
    }
  }

  s.doubleClicked = () => {
    if (synth) {
      const utterThis = new SpeechSynthesisUtterance(sentence)
      utterThis.voice = voices.find((vo) => vo.default)
      synth.speak(utterThis)
    }
  }

  function drawLabels (): void {
    const labelFontSize = s.map(s.height, 400, 1600, 8, 25)
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

  // Draws the p5.Graphics to the canvas in a nice way
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

  // Calculates the positions and draws all the lines to the p5.Graphics, but doesn't draw the graphics to the canvas yet
  function prepareLines (): void {
    const shapeType = window.$fxhashFeatures.Shape

    // Establish base values for lines
    textY = fontSize + textMargin
    let shapeBounds = {
      x: leftOffset,
      y: textY,
      w: 0,
      h: 0
    }

    // Each line is a separate p5.Graphic, which needs to be initialized with proper rectMode, colorMode, etc.
    let activeLineGraphic = s.createGraphics(s.width, s.height)
    initGraphic(activeLineGraphic)

    // Go through each set of words in the jumbled array, and attempt to place them
    for (let i = 0; i < jumbledArr.length; i++) {
      // Trim the text first
      const txt = jumbledArr[i].trim()
      // Find the text that comes after this one (if it exists)
      const nextTxt = i < jumbledArr.length - 1 ? jumbledArr[i + 1].trim() : ''

      // What is the expected x position of the text?
      const textX = i === 0 ? shapeBounds.x + shapeBounds.w : shapeBounds.x + shapeBounds.w + fontSize / 2
      // What size should the shapes be that we draw in between the text pieces?
      const shapeRadius = fontSize / 2

      // We simulate the text we're about to write, so we can check if it fits
      const simulatedBox = drawText({
        txt,
        baseX: textX,
        baseY: textY,
        color: textColor,
        font: mainFont,
        isSimulation: true
      })
      let shouldSkipText = false
      // If it looks like the current text goes out of bounds, we throw a die to see if we want to start with some shapes on next line
      if (simulatedBox.wentOutOfBounds) {
        shouldSkipText = s.random() > 0.5
      }
      // If we're not skipping text, we draw the text as calculated
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

      // Figure out how we want to draw the shapes
      let baseShapeX = shouldSkipText ? simulatedBox.x + shapeRadius : simulatedBox.x + simulatedBox.w + fontSize
      let baseShapeY = simulatedBox.y + simulatedBox.h / 2
      let totalShapeWidth = s.random(s.width / 10, s.width / 5)

      // In case we skipped the text, we want to draw shapes here
      // If not, we will try simulating the shapes that we are about to draw to make sure we don't go off bounds
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
        // If we skipped text earlier, we want to draw it now after the shapes we just drew
        const skippedTextBox = drawText({
          txt,
          baseX: shapeBounds.x + shapeBounds.w + fontSize / 2,
          baseY: textY,
          color: textColor,
          font: mainFont,
          graphics: activeLineGraphic
        })
        // And after drawing text, we simulate drawing shapes once again to prevent out-of-bounds
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

      // If the next text was going to be out of bounds, we calculate how to fill the rest of the line with shapes
      if (simulatedNextTextBox.wentOutOfBounds) {
        totalShapeWidth = s.width - baseShapeX - rightOffset - shapeRadius
      } else if (shapeBounds.x + shapeBounds.w > s.width - rightOffset) {
        // If the shapes were going to go out of bounds, we just adjust it  sure not to go out of bounds
        totalShapeWidth = s.width - rightOffset - shapeBounds.x
      }
      // We use the previous calculations to draw the shapes
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

      // If the next text was gonna go out of bounds, we finalize this line graphic and create a new one, which will be used in next loop
      if (simulatedNextTextBox.wentOutOfBounds) {
        allLineGraphics.push(activeLineGraphic)
        activeLineGraphic = s.createGraphics(s.width, s.height)
        initGraphic(activeLineGraphic)
      }

      // If we're at the last piece of text, we want to remove the current line graphic from the DOM
      if (i === jumbledArr.length - 1) activeLineGraphic.remove()
    }
  }

  // Draws the text in various ways, based on given options
  // Also possible to just simulate drawing, if we want to calculate how much it would fill
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

  // Draws the shapes in various ways, based on given options
  // Also possible to just simulate drawing, if we want to calculate how much it would fill
  function drawShapes (opts: DrawShapesOpts): RectBounds {
    let drawnShapeRadius = opts.shapeRadius
    if (window.$fxhashFeatures['Shape size'] === 'Triple') {
      drawnShapeRadius = opts.shapeRadius * 3
    } else if (window.$fxhashFeatures['Shape size'] === 'Massive') {
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
      if (window.$fxhashFeatures['Shape size'] === 'Massive') interColor.setAlpha(99)
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
