// import { decode } from "blurhash";
// import sharp from "sharp";

// export const generateBlurhashURI = async (
//   hash,
//   width,
//   height,
//   options = {
//     size: 16,
//     quality: 40,
//   }
// ) => {
//   const hashWidth = options?.size;
//   const hashHeight = Math.round(hashWidth * (height / width));

//   const pixels = decode(hash, hashWidth, hashHeight);

//   const resizedImageBuf = await sharp(Buffer.from(pixels), {
//     raw: {
//       channels: 4,
//       width: hashWidth,
//       height: hashHeight,
//     },
//   })
//     .jpeg({
//       overshootDeringing: true,
//       quality: 40,
//     })
//     .toBuffer(); // Here also possible to do whatever with your image, e.g. save it or something else.

//   return `data:image/jpeg;base64,${resizedImageBuf.toString("base64")}`;
// };