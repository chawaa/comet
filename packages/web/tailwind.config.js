module.exports = {
  purge: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [
    require('core/src/tailwind-preset.js')
  ]
}
