# One Point Five Degrees Celcius

## What is this?

This project is the code for Ada Ada Ada's generative art piece One Point Five Degrees Celcius, released on [fxhash in February 2022](https://www.fxhash.xyz/generative/10011).

The piece features 128 quotes from the infamous IPCC Report on the consequences of Global Warming of 1.5°C.

To symbolize how climate science gets distorted by politicians, companies and other entities in power, each edition features one quote, surrounded by unique chaotic shapes, colors and glitchy effects, all attempting to distract from the clear scientific conclusions.

The piece adjusts to different screen sizes, so it's recommended to try adjusting the browser window. 

This project is made with Typescript, [p5.js](https://p5js.org/), [FettePalette](https://meodai.github.io/fettepalette/) and the font [Inter by Rasmus Andersson](https://rsms.me/inter/).

## Why is this open source?

For three reasons:

1. To spread awareness of the Climate Strike License.
2. To share the algorithm that fits text and shapes to the canvas in a nice way.
3. To provide easy access to all the 128 quotes that I have gathered for this project.

The License can be found in LICENSE.md. You can read more about it [here](https://climatestrike.software/).

The algorithm can be found in the `prepareLines()` function in `src/typescript/main.ts`.

The quotes can be found in `src/typescript/globals.ts`.

## How to run

Before doing anything, you must install dependencies with `yarn` or `npm i`.

### Development mode

`yarn dev` or `npm run dev`

It can now be accessed on [localhost:4000](http://localhost:4000).

### Build project and create zip file

`yarn build` or `npm run build`

## License

This project is licensed under a modified version of the Climate Strike License (CSL).
