<script>
  import Spinner from "./Spinner.svelte";

  import { deleteEmployee } from "../routes/sanity";

  export let employee;

  let showDropdown = false;

  const handleDeleteEmployee = async (employee) => {
    const result = await deleteEmployee(employee);
  };
</script>

<div
  class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
  <div class="relative flex justify-end px-4 pt-4">
    <button
      on:click={() => (showDropdown = !showDropdown)}
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
    >
      <span class="sr-only">Open dropdown</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
      >
        <path
          d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdown"
      class={`origin-top-right absolute right-0 mt-12 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 ${
        showDropdown ? "block" : "hidden"
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="dropdownButton"
    >
      <button
        on:click={() => {
          handleDeleteEmployee(employee);
        }}
        class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        role="menuitem"
      >
        Delete
      </button>
      <a
        href="/{employee.first_name}{employee.last_name}/edit"
        class="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
        role="menuitem"
      >
        Edit
      </a>
    </div>
  </div>
  <div class="flex flex-col items-center pb-10">
    <img
      class="w-32 h-32 mt-5 rounded-full object-cover"
      src={employee.imageUrl}
      alt={employee.first_name}
    />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {employee.first_name}
      {employee.last_name}
    </h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">{employee.role}</span
    >
    <div class="flex mt-4 space-x-3 md:mt-6">
      <a
        href="/{employee.first_name}"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >See employee</a
      >
      <a
        href="#"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
        >Message</a
      >
    </div>
  </div>
</div>
