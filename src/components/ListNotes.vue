<template>
  <div class="flex flex-col min-h-screen rounded-2xl">
    <header class="flex justify-between items-center p-8">
      <h2 class="text-2xl font-bold text-gray-600">Anotações</h2>
      <button class="text-2xl text-gray-400 hover:text-gray-600" aria-label="Fechar">X</button>
    </header>
    <main class="p-5 flex-grow">
      <div class="mb-4">
        <NoteCard />
      </div>
      <div class="mb-4">
        <NoteCard />
      </div>
      <div class="mb-4">
        <NoteCard />
      </div>
      <div class="mb-4">
        <NoteCard />
      </div>
      <div class="mb-4">
        <NoteCard />
      </div>
      <div class="mb-4">
        <NoteCard />
      </div>
    </main>
    <footer class="text-center p-5">
      <button class="bg-blue-500 py-2 px-20 rounded-3xl text-white hover:bg-blue-600">
        + Criar anotação
      </button>
    </footer>
  </div>
</template>

<script>
import NoteCard from './NoteCard.vue'

export default {
  components: {
    NoteCard
  }
}
</script>
