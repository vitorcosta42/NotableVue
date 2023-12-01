<template>
  <div class="flex flex-col my-auto bg-white w-2/3">
    <header class="flex justify-between items-center p-8 border-b-2 border-gray-300">
      <h2 class="text-2xl font-bold text-gray-600">Deseja excluir esta anotação</h2>
      <button
        class="text-2xl text-gray-400 hover:text-gray-600"
        aria-label="Fechar"
        @click="handleCloseModal"
      >
        X
      </button>
    </header>
    <div class="p-5">
      <main class="mb-5">
        <p class="text-gray-500 text-xl">
          Você está prestes a deletar uma anotação e esta ação não poderá ser desfeita. Tem certeza
          que deseja excluí-la?
        </p>
      </main>
      <footer class="text-right">
        <button
          class="border border-gray-200 px-3 py-2 rounded-2xl mr-4 hover:bg-gray-200"
          @click="handleCloseModal"
        >
          Cancelar
        </button>
        <button
          class="border border-gray-200 px-3 py-2 rounded-2xl bg-red-400 text-white hover:bg-red-500"
          @click="confirmDelete"
        >
          Excluir
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { closeModal } from 'jenesius-vue-modal'
import { removeNote } from '../../indexdb'
export default {
  props: {
    noteId: {
      type: Number,
    }
  },
  methods: {
    handleCloseModal() {
      closeModal()
    },
    confirmDelete() {
      if (typeof this.noteId === 'undefined' || this.noteId === null) {
        this.handleCloseModal();
        window.location.reload();
        return;
      }
      removeNote(this.noteId)
        .then(() => {
          console.log('Nota deletada com sucesso!')
          window.location.reload();
        })
        .catch((error) => {
          console.error(`Erro ao excluir a nota: ${error}`)
        })
        .finally(() => {
          closeModal()
        })
    }
  }
}
</script>
