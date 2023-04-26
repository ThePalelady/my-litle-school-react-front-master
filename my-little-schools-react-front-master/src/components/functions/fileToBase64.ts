type CallbackFn = (value: string | ArrayBuffer | null) => void;

export function fileToBase64 (fileBlob: Blob, callback: CallbackFn) {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);

  reader.onload = () => {
    const base64Image = reader.result;
    callback(base64Image);
  };
}
