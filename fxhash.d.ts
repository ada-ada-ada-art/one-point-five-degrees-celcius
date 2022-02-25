export {}

declare global {
  interface Window {
    $fxhashFeatures: {
      Shape: string
      Background: string
      'Special text': string
      Censorship: string
      Dithering: string
      'Shape Size': string
    }
  }
}
