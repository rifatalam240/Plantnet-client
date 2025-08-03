import axios from "axios";
import { uploadImage } from "../../../api/spilts";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import Swal from "sweetalert2";

const AddPlant = () => {
  const handleupload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    const image = form?.image?.files[0];
    const imageurl = await uploadImage(image);
    data.image = imageurl;
    data.createdAt = new Date().toISOString();
    // console.log("data", data);
    const response = await axios.post(
      `${import.meta.env.VITE_API}/add-plant`,
      data
    );
    console.log("re",response.data.success)
    if (response?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "Successfully Added!",
        text: "Your plant was added to the database.",
      });
      form.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while saving data.",
      });
    }
    console.log("response", response.data); // Log the response data
  };

  return (
    <div>
      {/* Form */}
      <AddPlantForm handleupload={handleupload} />
    </div>
  );
};

export default AddPlant;
