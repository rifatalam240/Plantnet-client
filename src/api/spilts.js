//img upload//
//step-1 : create img files[0];e.target.files[0]
//step-2 : create formdata
//step-3 : append file to formdata
//step-4 : send formdata to server

import axios from "axios";

export const uploadImage = async (file) => {
  const fomrdata = new FormData();
  fomrdata.append("image", file);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
    fomrdata
  );
  return data?.data?.display_url;
};
