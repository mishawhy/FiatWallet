const R = require('ramda')

function trim (str) {
  return str.replace(/^\s+|\s+$/gm, '')
}

const getRGB = (rgba, opacity) => {
  let color = rgba
    .replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',')
  return 'rgba(' + R.append(opacity, R.remove(3, 1, color)).join() + ')'
}

const hexToRGBA = (hex, opacity) => {
  let color
  if (/^#/.test(hex)) {
    hex = hex.replace(/^#/, '')
  }
  if (/^([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.split('')
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]]
    }
    color = '0x' + color.join('')
    return (
      'rgba(' +
      [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') +
      `,${opacity})`
    )
  }
}

const rgbToCSSVar = rgba => {
  let color = rgba
    .replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',')
  return R.remove(3, 1, color).join()
}

const rgbaToHex = rgba => {
  let parts = rgba.substring(rgba.indexOf('(')).split(',')
  let r = parseInt(trim(parts[0].substring(1)), 10)
  let g = parseInt(trim(parts[1]), 10)
  let b = parseInt(trim(parts[2]), 10)
  let a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(
    2
  )

  return (
    '#' +
    r.toString(16) +
    g.toString(16) +
    b.toString(16) +
    (a * 255).toString(16).substring(0, 2)
  )
}

module.exports = {
  getRGB,
  hexToRGBA,
  rgbToCSSVar,
  rgbaToHex
}
