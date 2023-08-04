export async function load({ params }) {
  const employee = params.employee;

  return { employee };
}
