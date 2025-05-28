// export const uploadToCloudinary = async (pics:any) => {

//     const cloud_name="dytkmjiri"
    
//     if (pics) {
      
//       const data = new FormData();
//       data.append("file", pics);
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

export const uploadToCloudinary = async (pics: any): Promise<string | null> => {
  const cloud_name = "dytkmjiri";
  const upload_preset = "ml_default"; // <- using your unsigned preset

  if (!pics) {
    console.error("No file provided for upload.");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed: ${res.statusText}`);
    }

    const fileData = await res.json();
    console.log("Cloudinary URL:", fileData.url);

    return fileData.url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
