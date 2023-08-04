import { createClient } from "@sanity/client";

type Employee = {
  _id: string;
  first_name: string;
  last_name: string;
  role: string;
  image: string;
};

export const client = createClient({
  projectId: "keep4k3j",
  dataset: "production",
  apiVersion: "2023-08-02",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_SECRET_TOKEN,
});

export const getAllEmployees = () => {
  return client.fetch(`*[_type == 'employee']{
      _id,
      first_name,
      last_name,
      role,
      "imageUrl": image.asset->url
    }`);
};

export const getEmployee = async (full_name: string) => {
  const query: string = `*[_type == "employee" && (first_name + " " + last_name == $full_name)][0]`;
  const params: { full_name: string } = { full_name };
  const employee: Employee = await client.fetch(query, params);
  return employee;
};

export const updateEmployee = async (
  updatedEmployee: Employee,
  image: File | null
) => {
  const { _id, first_name, last_name, role } = updatedEmployee;

  // If there's a new image, upload it and create an asset
  let imageAsset;
  if (image) {
    imageAsset = await client.assets.upload("image", image, {
      filename: image.name,
    });
  }

  // Use the existing image if there's no new one
  const imageData = imageAsset
    ? {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      }
    : updatedEmployee.image;

  const data = {
    first_name,
    last_name,
    role,
    image: imageData,
  };

  return client.patch(_id).set(data).commit();
};

export const deleteEmployee = async (employee: Employee) => {
  try {
    await client.delete(employee._id);
  } catch (error) {
    console.error("Failed to delete employee:", error.message);
  }
};

export const createEmployee = async (employee: Employee) => {
  return client.create({
    _type: "employee",
    first_name: employee.first_name,
    last_name: employee.last_name,
    role: employee.role,
    image: employee.image,
  });
};
