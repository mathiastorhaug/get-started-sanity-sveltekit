import { getAllEmployees } from "./sanity";

export async function load() {
  const employees = await getAllEmployees();

  if (employees) return { employees };

  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}
