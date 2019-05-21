import blockies from 'ethereum-blockies'
/* eslint-disable */
export const generateBlockies = (
  address,
  { active = true, size = 5, scale = 7 }
) => {
  let color = VUE_APP_MAIN_COLOR;
  let bgcolor = '#fff';
  // 
  // if (active === false) {
  //   color = '#777';
  //   bgcolor = '#fff';
  // }
  return blockies.create({
    // All options are optional
    seed: address, // seed used to generate icon data, default: random
    color, // to manually specify the icon color, default: random
    bgcolor, // choose a different background color, default: random
    size, // width/height of the icon in blocks, default: 8
    scale, // width/height of each block in pixels, default: 4
    spotcolor: '#000' // each pixel has a 13% chance of being of a third color,
    // default: random. Set to -1 to disable it. These "spots" create structures
    // that look like eyes, mouths and noses.
  });
};

export const generateRandomBlockies = address => {
  return blockies.create({
    // All options are optional
    color: VUE_APP_MAIN_COLOR, // to manually specify the icon color, default: random
    bgcolor: '#fff', // choose a different background color, default: random
    size: 6, // width/height of the icon in blocks, default: 8
    scale: 5, // width/height of each block in pixels, default: 4
    spotcolor: '#000' // each pixel has a 13% chance of being of a third color,
    // default: random. Set to -1 to disable it. These "spots" create structures
    // that look like eyes, mouths and noses.
  });
};
