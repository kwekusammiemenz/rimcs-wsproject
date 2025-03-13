export const convertToBase64 = async (uFile: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(uFile);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const GetOnlyBaseNameFromPath = (path: string) => {
  return path.replace(/\\/g, "/").replace(/.*\//, "");
};
