<template>
  <div class="flex flex-col my-auto bg-white w-2/3">
    <header class="flex justify-between items-center p-8 border-b-2 border-gray-300">
      <h2 class="text-2xl font-bold text-gray-600">Insira seu token de restauração:</h2>
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
        <div class="relative">
          <input
            v-model="enteredToken"
            class="pl-5 pr-3 py-3 rounded-full w-full border-2"
            id="token"
            name="token"
            placeholder="Insira seu token"
          />
        </div>
      </main>
      <footer class="text-right">
        <button
          @click="confirmToken"
          class="border border-gray-200 px-5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
        >
          Confirmar
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
  data() {
    return {
      enteredToken: ''
    }
  },
  methods: {
    handleCloseModal() {
      closeModal()
    },
    confirmToken() {
      this.$emit('token-confirmed', this.enteredToken)
      closeModal()
    }
  }
}
</script>
