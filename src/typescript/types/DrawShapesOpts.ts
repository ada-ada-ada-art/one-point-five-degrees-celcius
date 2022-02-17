interface DrawShapesOpts {
  isSimulation?: boolean
  startColor: p5.Color
  endColor: p5.Color
  baseX: number
  baseY: number
  totalShapeWidth: number
  shapeRadius: number
  graphics: p5.Graphics
  shapeType: ShapeType
}

enum ShapeType {
  Ellipse = 'Ellipse',
  Diamond = 'Diamond',
  Hexagon = 'Hexagon',
  Line = 'Line'
}
