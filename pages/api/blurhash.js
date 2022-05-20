
import * as blurhash from 'blurhash'
import { createCanvas, loadImage, Image } from 'canvas'

// import { encode } from "blurhash";

// const loadImage = async src =>
// new Promise((resolve, reject) => {
//   const img = new Image();
//   img.onload = () => resolve(img);
//   img.onerror = (...args) => reject(args);
//   img.src = src;
// });

// const getImageData = image => {
//     const canvas = document.createElement("canvas");
//     canvas.width = image.width;
//     canvas.height = image.height;
//     const context = canvas.getContext("2d");
//     context.drawImage(image, 0, 0);
//     return context.getImageData(0, 0, image.width, image.height);
// };

// const encodeImageToBlurhash = async imageUrl => {
//     const image = await loadImage(imageUrl);
//     const imageData = getImageData(image);
//     return encode(imageData.data, imageData.width, imageData.height, 4, 4);
// };



const getImageData = (image) => {
  const canvas = createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, image.width, image.height)
  return context.getImageData(0, 0, image.width, image.height)
}




export default async function handler(req, res) {
  const { query } = req;
  const { image } = query;
  console.log(image);
  // console.log(encodeImageToBlurhash(image))
  const img = await loadImage(image);
  
  console.log(' image = ', img, img.width, img.height)
  
  const imageData = getImageData(img)
  const encodedHash = blurhash.encode(
    imageData.data,
    imageData.width,
    imageData.height,
    6,
    6
  )
  console.log(encodedHash)

  res.status(200).send(encodedHash);
}
