<script>
  export let field;
</script>

<div class="mb-6">
  <label
    for={field.id}
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{field.label}</label
  >
  <input
    bind:value={field.value}
    type="string"
    id={field.id}
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder={field.placeholder}
    required
  />
</div>
