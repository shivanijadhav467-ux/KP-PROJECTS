export async function compressPhoto(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const max = 960;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}
