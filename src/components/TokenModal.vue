<template>
  <div class="flex flex-col my-auto bg-white w-2/3">
    <header class="flex justify-between items-center p-8 border-b-2 border-gray-300">
      <h2 class="text-2xl font-bold text-gray-600">Esse é o seu token, salve-o:</h2>
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
        <span class="text-gray-500 text-xl" style="word-wrap: break-word">
          {{ token }}
        </span>
      </main>
      <footer class="text-right">
        <button
          class="border border-gray-200 px-5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
          @click="copyToken"
        >
          Copiar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { closeModal } from 'jenesius-vue-modal'
export default {
  props: {
    token: String
  },
  methods: {
    handleCloseModal() {
      closeModal()
    },
    copyToken() {
      navigator.clipboard
        .writeText(this.token)
        .then(() => {
          console.log('Token copiado para a área de transferência')
          this.handleCloseModal()
        })
        .catch((err) => {
          console.error('Erro ao copiar o token para a área de transferência', err)
        })
    }
  }
}
</script>
