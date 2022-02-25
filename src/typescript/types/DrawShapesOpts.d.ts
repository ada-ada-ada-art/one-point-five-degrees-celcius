declare interface DrawShapesOpts {
  isSimulation?: boolean
  startColor: p5.Color
  endColor: p5.Color
  baseX: number
  baseY: number
  totalShapeWidth: number
  shapeRadius: number
  graphics: p5.Graphics
  // Enums don't want to work properly in our setup, so we add |string as a workaround
  shapeType: ShapeType|string
}

declare enum ShapeType {
  Ellipse = 'Ellipse',
  Square = 'Square',
  Hexagon = 'Hexagon',
  Line = 'Line',
  ChaosLine = 'Chaos',
  Star = 'Star'
}
