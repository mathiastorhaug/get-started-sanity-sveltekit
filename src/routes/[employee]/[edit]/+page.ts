import { client } from "../../sanity";

const getEmployee = async (name) => {
  const query = `*[_type == "employee" && (first_name + last_name == $name)][0]`;
  const params = { name };
  const employee = await client.fetch(query, params);
  return employee;
};

export async function load({ params }) {
  const employee = await getEmployee(params.employee);

  if (employee) return { employee };

  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}
