<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between">
      <h2 class="text-xl p-5">Anotações</h2>
      <button class="text-xl p-5">X</button>
    </header>
    <main class="p-5 text-center my-auto ">
        <v-icon scale="3" name="pr-paperclip" class="text-gray-400 hover:text-gray-500" />
      <h1 class="text-blue-500 font-bold text-2xl">Anotações</h1>
      <h3 class="text-sm text-gray-500 mb-5">by Speedio</h3>
      <button class="bg-blue-500 py-2 px-10 rounded-3xl text-white hover:bg-blue-600">
        + Criar anotação
      </button>
    </main>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
export default {
  components: {
    'v-icon': OhVueIcon
  }
}
</script>
