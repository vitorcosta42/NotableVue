<script>
import {OhVueIcon} from "oh-vue-icons";
export default {
    components: {
        "v-icon": OhVueIcon
    },
}
</script>

<template>
<div class="bg-white border hover:border-blue-400 hover:cursor-pointer px-5 py-2 rounded-2xl flex items-center justify-between">
    <v-icon name="pr-paperclip" class="text-gray-400  hover:text-gray-500 " />
  
    <div>
    <h1 class="mb-2 underline">Exp.: Ao ligar falar com Luiza</h1>

    <div class="text-sm text-gray-500">
      <span>11/10/2023</span>
      <span> - 13:37</span>
    </div>
  </div>

  <v-icon name="bi-trash" class="text-red-500 ml-4 hover:text-red-600" />
</div>

</template>
