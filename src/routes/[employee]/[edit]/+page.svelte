<script>
  import NewEmployeeInputField from "../../../components/NewEmployeeInputField.svelte";
  import Spinner from "../../../components/Spinner.svelte";

  import { goto } from "$app/navigation";

  import { updateEmployee } from "../../../routes/sanity.ts";

  export let data;
  let employee = data.employee;

  let isLoading = false;

  async function submit(e) {
    e.preventDefault();

    const updatedEmployee = Object.fromEntries(
      EmployeeInputFields.map((field) => [field.id, field.value])
    );
    updatedEmployee._id = EmployeeInputFields[0]._id;

    const image = e.target.elements.image_upload.files[0] || null; // get the selected image file

    isLoading = true;
    try {
      await updateEmployee(updatedEmployee, image); // pass the image file to your updateEmployee function
      await goto("/");
    } catch (error) {
      console.error("Failed to update employee:", error.message);
    } finally {
      isLoading = false;
    }
  }

  const EmployeeInputFields = [
    {
      label: "First Name",
      id: "first_name",
      placeholder: "Frank",
      value: employee.first_name,
      _id: employee._id,
    },
    {
      label: "Last Name",
      id: "last_name",
      placeholder: "Frankerton",
      value: employee.last_name,
      _id: employee._id,
    },
    {
      label: "Role",
      id: "role",
      placeholder: "Your role",
      value: employee.role,
      _id: employee._id,
    },
  ];
</script>

<div class="w-3/4 mx-auto">
  <h1 class="text-6xl font-bold text-center text-white mt-12">
    📝 Edit Employee 👨🏻‍💼
  </h1>
  <form on:submit={submit} class="mt-16">
    {#each EmployeeInputFields as field (field.id)}
      <NewEmployeeInputField {field} />
    {/each}
    <label
      for="image_upload"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Image</label
    >
    <input
      type="file"
      id="image_upload"
      name="image_upload"
      accept="image/png, image/jpeg"
      class="block w-full px-4 py-2 text-gray-900 dark:text-white bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-800"
    />
    <div class="flex items-center justify-center mt-6">
      {#if isLoading}
        <Spinner />
      {:else}
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Update</button
        >
      {/if}
    </div>
  </form>
</div>
