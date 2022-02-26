export {}

declare global {
  interface Window {
    $fxhashFeatures: {
      Shape: string
      Background: string
      'Special text': string
      Censorship: string
      Dithering: string
      'Shape size': string
    }
  }

  interface p5 {
    resetSketch: Function
  }
}
