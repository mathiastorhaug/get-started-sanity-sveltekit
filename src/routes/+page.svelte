<script>
  import EmployeeCard from "../components/EmployeeCard.svelte";

  export let data;
  let employees = data.employees;
</script>

<h1 class="text-6xl font-bold text-center text-white mt-12">
  🥳 Variants Drømmeteam 🏄🏼‍♂️
</h1>
<div class="flex justify-center mt-6">
  <a
    href="/add-employee"
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Add New Employee
  </a>
</div>
<div class="w-3/4 mx-auto mt-5">
  <ul>
    {#if !employees}
      <p>No employees found</p>
    {:else}
      <div class="flex flex-wrap">
        {#each employees as employee (employee._id)}
          <div class="w-full lg:w-1/3 px-4 py-4">
            <div
              class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <EmployeeCard {employee} />
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </ul>
</div>
