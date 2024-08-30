// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const saveImageToTemporaryStorage = async (
  imageBase64: string,
  guid: string
): Promise<string> => {
  const imageBuffer = Buffer.from(imageBase64, "base64");

  const imagePath = path.join(__dirname, "../../temp", `${guid}.png`);

  await fs.promises.writeFile(imagePath, imageBuffer);

  return `http://localhost:3000/temp/${guid}.png`;
};
