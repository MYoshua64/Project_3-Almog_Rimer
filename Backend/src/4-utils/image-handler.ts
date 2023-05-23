import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fsPromises from "fs/promises";

const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

function getImagePath(imageName: string): string {
  return path.join(imagesFolder, imageName);
}

async function saveImage(image: UploadedFile): Promise<string> {
  //Take original extension
  const extensionIndex = image.name.lastIndexOf(".");
  const extension = image.name.substring(extensionIndex);

  //Create unique name
  const uniqueName = uuidv4() + extension;

  //Get absolute path
  const absolutePath = getImagePath(uniqueName);

  //Save image
  await image.mv(absolutePath); //Move image to absolute path

  return uniqueName;
}

async function deleteImage(imageName: string): Promise<void> {
  try {
    if (!imageName) return;
    const absolutePath = getImagePath(imageName);
    await fsPromises.unlink(absolutePath);
  } catch (err) {
    console.error(err.message);
  }
}

async function updateImage(
  image: UploadedFile,
  existingName: string
): Promise<string> {
  console.log("Uploaded: " + image);
  console.log("Existing: " + existingName);

  await deleteImage(existingName);

  const uniqueName = await saveImage(image);

  return uniqueName;
}

export default {
  getImagePath,
  saveImage,
  deleteImage,
  updateImage,
};
