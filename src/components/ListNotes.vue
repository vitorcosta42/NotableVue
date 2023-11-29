<template>
 <div class="flex flex-col min-h-screen">
  <header class="flex justify-between">
    <h2 class="text-xl p-5">Anotações</h2>
    <button class="text-xl p-5">X</button>
  </header>
  <main class="p-5 flex-grow">
    <div class="mb-4">
      <Note />
    </div>
    <div class="mb-4">
      <Note />
    </div>
    <div class="mb-4">
      <Note />
    </div>
    <div class="mb-4">
      <Note />
    </div>
    <div class="mb-4">
      <Note />
    </div>
    <div class="mb-4">
      <Note />
    </div>
  </main>
  <footer class="text-center p-5">
    <button class="bg-blue-500 py-2 px-20 rounded-3xl text-white hover:bg-blue-600">+ Criar anotação</button>
  </footer>
</div>

</template>

<script>
import Note from '@/components/Note.vue'

export default {
  components: {
    Note
  }
}
</script>
