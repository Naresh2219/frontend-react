// export const uploadToCloudinary = async (file:any) => {

//     const cloud_name="dytkmjiri"

//     if (file) {

//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", "ml_default");
//       data.append("cloud_name", cloud_name);

//       const res = await 
//       fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//         method: "post",
//         body: data,
//       })

//         const fileData=await res.json();
//         console.log("url : ", fileData);
//         return fileData.url

//     } else {
//       console.log("error");
//     }
//   };
export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const cloudName = "dytkmjiri";
  const uploadPreset = "ml_default";

  if (!file) {
    console.error("No file provided.");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const fileData = await response.json();
    console.log("Uploaded file URL:", fileData.url);
    return fileData.url;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
