import React, { useState } from "react";

const CreateListing = () => {
  const [geoLocationEnabled, setGeoLocationEnables] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: "",
    discountPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });
  const {
    type,
    name,
    bedrooms,
    baths,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,
    images,
    latitude,
    longitude,
  } = formData;
  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-center text-3xl font-bold my-6">
        Creating Your Rental / Sale Houses
      </h1>
      <div className="w-full px-4 md:w-[50%] mx-auto">
        <form>
          <div className="my-6">
            <h3 className="text-xl font-semibold mb-1">Sale / Rent</h3>

            <div className="flex space-x-4">
              <button
                onClick={onChange}
                type="button"
                className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                  type === "rent"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                id="type"
                value="sale"
              >
                Sale
              </button>
              <button
                onClick={onChange}
                type="button"
                className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                  type === "sale"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                id="type"
                value="rent"
              >
                Rent
              </button>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xl font-semibold mb-1">Name</p>
            <input
              type="text"
              className="w-full rounded-md"
              minLength="10"
              maxLength="32"
              id="name"
              onChange={onChange}
              value={name}
              required
            />
          </div>
          <div className="mb-6 flex w-full space-x-3">
            <div className="w-full">
              <p className="text-xl font-semibold mb-1">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                min="1"
                max="50"
                className="w-full rounded-md"
                onChange={onChange}
                required
              />
            </div>
            <div className="w-full">
              <p className="text-xl font-semibold mb-1">Baths</p>
              <input
                type="number"
                id="baths"
                value={baths}
                min="1"
                max="50"
                className="w-full rounded-md"
                onChange={onChange}
                required
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1">Parking Spot</h3>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                !parking ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="parking"
              value={true}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                parking ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="parking"
              value={false}
            >
              No
            </button>
          </div>
          <h3 className="text-xl font-semibold mb-1 ">Furnihsed Status</h3>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                !furnished ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="furnished"
              value={true}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                furnished ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="furnished"
              value={false}
            >
              No
            </button>
          </div>
          <div className="mb-6">
            <p className="text-xl font-semibold mb-1">Address of Place</p>
            <textarea
              type="text"
              className="w-full rounded-md"
              id="address"
              onChange={onChange}
              value={address}
              required
            />
          </div>
          {!geoLocationEnabled && (
            <div className="w-full space-x-3 mb-6 flex ">
              <div className="w-full">
                <p className="text-xl font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  className="w-full rounded-md text-xl"
                  value={latitude}
                  onChange={onChange}
                />
              </div>
              <div className="w-full">
                <p className="text-xl font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  className="w-full rounded-md text-xl"
                  value={longitude}
                  onChange={onChange}
                  min="-90"
                  max="90"
                />
              </div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-xl font-semibold mb-1">
              Description About Place
            </p>
            <textarea
              type="text"
              className="w-full rounded-md"
              id="description"
              onChange={onChange}
              min="-180"
              max="180"
              value={description}
              required
            />
          </div>
          <h3 className="text-xl font-semibold mb-1 ">Offer</h3>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                !offer ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="offer"
              value={true}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              className={` py-2 w-full rounded-md uppercase text-xl hover:shadow-md transition ease-in-out duration-100 ${
                offer ? "bg-white text-black" : "bg-black text-white"
              }`}
              id="offer"
              value={false}
            >
              No
            </button>
          </div>
          <p className="mb-1 text-xl font-semibold">Regular Price</p>
          <div className="mb-6 flex items-center">
            <div>
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                max="50000"
                className="w-full rounded-md"
                onChange={onChange}
                required
              />
            </div>
            {type === "rent" && <p className="text-xl ml-3"> / Per Months</p>}
          </div>
          {offer && (
            <div>
              <p className="mb-1 text-xl font-semibold">Discounted Price</p>
              <div className="mb-6 flex items-center">
                <div>
                  <input
                    type="number"
                    id="discountPrice"
                    value={discountPrice}
                    className="w-full rounded-md"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-xl font-semibold mb-1">Images</p>
            <input
              onChange={onChange}
              type="file"
              id="images"
              multiple
              required
              accept=".jpg, jpeg, .png"
              className="bg-white w-full p-2 rounded-md mb-1"
            />
            <p className="text-gray-400">
              Upload Max 6 Picture, 1st Picture Would be as cover
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 py-2 mb-6 rounded-md text-white uppercase font-semibold tracking-wide"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateListing;
