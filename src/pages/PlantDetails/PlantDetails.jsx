import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PlantDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [plant, setPlant] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/show-plant/${id}`)
      .then((response) => {
        setPlant(response.data);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
      });
  }, [id]);
  console.log("plan", plant);

  const closeModal = () => {
    setIsOpen(false);
  };
  // const plantdetails = useLoaderData();
  // console.log(plantdetails);
  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={
                  plant?.image ||
                  "https://i.ibb.co/DDnw6j9/1738597899-golden-money-plant.jpg"
                }
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading
            title={"Money Plant"}
            subtitle={`Category: ${plant?.category || "Unknown"}`}
          />
          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {plant?.description || "No description available for this plant."}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller:{plant?.sellername || "Muhammad Rifat"} </div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={
                plant?.sellerimage ||
                "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
              }
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity:{plant?.quantity || "N/A"} <br />
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">
              Price: {plant?.price}$
            </p>
            <div>
              <Button
              disabled={!user}
                onClick={() => setIsOpen(true)}
                label={user ? "Purchase" : "Login to purchase"}
              />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal
            plant={plant}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
