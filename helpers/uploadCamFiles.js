import { uploadMultipleFiles } from "./shared";

export const hitAPIFile = async (data, module) => {
  const { photo, notes } = data;

  const parts = photo.split(";base64,");
  const mimeType = parts[0].split(":")[1];
  const base64Data = parts[1];

  // Decode the base64 string to a binary buffer
  const binaryString = window.atob(base64Data);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  const imageBlob = new Blob([byteArray], { type: mimeType });

  const fileName = `image ${Date.now().toString()} .jpg`; // Provide your desired file name
  const file = new File([imageBlob], fileName, { type: mimeType });

  const formData = new FormData();
  formData.append("image web", file);

  console.log(formData);

  const response = await uploadMultipleFiles(formData, module);

  return response;
};
