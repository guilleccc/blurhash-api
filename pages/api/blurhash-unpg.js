import * as fs from "fs";
import { encode } from "blurhash";
import UPNG from "upng-js";

import got from "got";
import * as blurhash from 'blurhash'
import { createCanvas, loadImage } from 'canvas'


const { Image } = require("image-js");

async function resizeAndSave(imgUrl) {
  const response = await got("https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg", {
    responseType: "buffer",
  });
  const image = await Image.load(response.body);

  let grey = image
    .grey() // convert the image to greyscale.
    .resize({ width: 200 }); // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
  // console.log(grey)
  grey.save("thumb.png");
  return grey;
}

// export default handler = async (req, res) => {
  
//   const imgUrl = "https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg";

//   const imgResult = await resizeAndSave(imgUrl);
  
//   console.log(imgResult);
//   res.status(200).json({ name: imgResult });
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

  const resized = await resizeAndSave(image);

  const img = await loadImage(resized.data);
  
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

  res.status(200).json({ blurhash: encodedHash });
}
