<script>
  import NewEmployeeInputField from "../../components/NewEmployeeInputField.svelte";
  import Spinner from "../../components/Spinner.svelte";

  import { client, createEmployee } from "../../routes/sanity.ts";

  import { goto } from "$app/navigation";

  let isLoading = false;

  async function submit(e) {
    e.preventDefault();

    const employee = Object.fromEntries(
      NewEmployeeInputFields.map((field) => [field.id, field.value])
    );

    // handle image file
    const imageFile = document.getElementById("image_upload").files[0];

    if (imageFile) {
      const imageAsset = await client.assets.upload("image", imageFile, {
        filename: imageFile.name,
      });

      // Add image reference to employee object
      employee.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    isLoading = true;

    try {
      await createEmployee(employee);
      await goto("/");
    } catch (error) {
      console.error("Failed to create employee:", error.message);
    } finally {
      isLoading = false;
    }
  }

  const NewEmployeeInputFields = [
    {
      label: "First Name",
      id: "first_name",
      placeholder: "Frank",
      value: "",
    },
    {
      label: "Last Name",
      id: "last_name",
      placeholder: "Frankerton",
      value: "",
    },
    {
      label: "Role",
      id: "role",
      placeholder: "Your role",
      value: "",
    },
  ];
</script>

<div class="w-3/4 mx-auto">
  <h1 class="text-6xl font-bold text-center text-white mt-12">
    🧑🏼‍🔧 Add New Employee 🥳
  </h1>
  <form on:submit={submit} class="mt-16">
    {#each NewEmployeeInputFields as field}
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
          >Submit</button
        >
      {/if}
    </div>
  </form>
</div>
