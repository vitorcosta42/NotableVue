<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between items-center p-8">
      <h2 class="text-2xl font-bold text-gray-600">Anotações</h2>
      <button
        @click="emptyScreen"
        class="text-2xl text-gray-400 hover:text-gray-600"
        aria-label="Fechar"
      >
        X
      </button>
    </header>

    <main class="text-center mb-5">
      <form>
        <div class="mb-4 px-8">
          <textarea
            v-model="anotacoes"
            id="anotacoes"
            class="p-2 text-gray-500 rounded-xl w-full focus:outline-none focus:ring focus:ring-gray-800"
            placeholder="Digite suas anotações..."
            name="anotacoes"
          ></textarea>
        </div>

        <div class="px-8 pb-5">
          <label for="potencialNegocio" class="block text-gray-500 text-left mb-4"
            >Potencial do negócio</label
          >
          <input
            v-model="potencialNegocio"
            class="p-3 rounded-full w-full focus:outline-none focus:ring focus:ring-gray-800"
            type="number"
            id="potencialNegocio"
            name="potencialNegocio"
            placeholder="R$00,00"
          />
        </div>

        <div class="px-8 pb-5">
          <label for="categorizacao" class="block text-gray-500 text-left mb-4"
            >Categorização</label
          >
          <vue3-tags-input
            v-model="categorizacao"
            class="bg-white p-2 text-gray-500 border-0 focus:border-4 focus:border- focus:outline-none focus:ring focus:ring-gray-800 rounded-full w-full"
            placeholder="Digite categorias para a anotação..."
          />
        </div>

        <div class="mb-4 px-8 pb-5">
          <label for="lembrete" class="block text-gray-500 text-left mb-4">Lembrete</label>
          <input
            v-model="lembrete"
            class="bg-white p-3 text-gray-500 focus:outline-none focus:ring focus:ring-gray-800 rounded-full w-full"
            id="lembrete"
            name="lembrete"
            type="date"
          />
        </div>
      </form>
    </main>

    <footer class="text-center">
      <button
        class="mr-4 items-center rounded-full p-2 text-center m-auto bg-red-400 hover:bg-red-500"
        @click="openModalHandler"
      >
        <v-icon name="bi-trash" class="text-gray-100" />
      </button>

      <button
        class="bg-blue-500 py-2 px-20 rounded-3xl text-white hover:bg-blue-600"
        @click="createNote"
      >
        Salvar
      </button>
    </footer>
  </div>
  <widget-container-modal />
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import Vue3TagsInput from 'vue3-tags-input'
import { container } from 'jenesius-vue-modal'
import { addNote } from '../../indexdb'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import { openModal } from 'jenesius-vue-modal'

export default {
  components: {
    'v-icon': OhVueIcon,
    Vue3TagsInput,
    WidgetContainerModal: container
  },
  data() {
    return {
      anotacoes: '',
      potencialNegocio: '',
      categorizacao: [],
      lembrete: ''
    }
  },
  emits: ['empty-screen'],
  methods: {
    openModalHandler() {
      const props = {}
      openModal(DeleteConfirmModal, props)
    },
    emptyScreen() {
      this.$emit('empty-screen')
    },
    async createNote() {
      const { anotacoes, potencialNegocio, categorizacao, lembrete } = this

      const newNote = {
        anotacoes,
        potencialNegocio,
        categorizacao: categorizacao.toString(),
        lembrete
      }

      await addNote(newNote)
      window.location.reload()

      this.anotacoes = ''
      this.potencialNegocio = ''
      this.categorizacao = []
      this.lembrete = ''
    }
  }
}
</script>

<style lang="css">
.v3ti .v3ti-tag {
  border-radius: 20px;
  background: rgb(243, 242, 242);
  color: rgb(111, 110, 110);
}

.v3ti .v3ti-tag .v3ti-remove-tag {
  transition: color 0.3s;
  color: black;
}

.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  color: gray;
}
</style>
