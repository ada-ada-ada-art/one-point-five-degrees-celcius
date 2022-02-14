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

const colorRamp = fettepalette.generateRandomColorRamp({
  total: 9,
  centerHue: 0,
  hueCycle: 0.3,
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
})

// Init sketch
// eslint-disable-next-line new-cap
const lona = new p5(startSketch,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  document.getElementById('sketch') || undefined
)

// Two vehicles
const bikes: VehicleGroup = null
const cars: VehicleGroup = null
let busses: VehicleGroup = null

const passengerCount = 100
const backgroundColor = colorRamp.light[8]

function startSketch (s: p5): void {
  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight

  const offset = 30
  let bikePathPoints = [] as p5.Vector[]
  let carPathPoints = [] as p5.Vector[]
  let busPathPoints = [] as p5.Vector[]

  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight)
    s.colorMode(s.HSL, 360, 100, 100, 100)
    s.rectMode(s.CENTER)
    s.noFill()
    s.strokeWeight(5)

    bikePathPoints = [
      s.createVector(-offset * 3, offset * 3),
      s.createVector(offset * 3, offset * 3),
      s.createVector(s.width - offset * 3, offset * 3),
      s.createVector(s.width + offset * 3, offset * 3)
    ]
    // bikes = new VehicleGroup(s, bikePathPoints, 12, 1, passengerCount, 21, colorRamp)
    carPathPoints = [
      s.createVector(-offset * 3, s.height - offset * 3),
      s.createVector(offset * 3, s.height - offset * 3),
      s.createVector(s.width - offset * 3, s.height - offset * 5),
      s.createVector(s.width + offset * 3, s.height - offset * 5)
    ]
    cars = new VehicleGroup(s, carPathPoints, 24, 1.5, passengerCount, 271, colorRamp)
    busPathPoints = [
      s.createVector(-offset * 3, s.height - offset * 9),
      s.createVector(offset * 3, s.height - offset * 9),
      s.createVector(s.width - offset * 3, s.height - offset * 12),
      s.createVector(s.width + offset * 3, s.height - offset * 9)
    ]
    busses = new VehicleGroup(s, busPathPoints, 40, 20, passengerCount, 101, colorRamp)
  }

  s.draw = () => {
    s.background(backgroundColor[0], backgroundColor[1] * 100, backgroundColor[2] * 100, 5)

    // bikes.run()
    cars.run()
    busses.run()
  }
}
