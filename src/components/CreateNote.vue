<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex justify-between items-center p-8">
      <h2 class="text-2xl font-bold text-gray-600">NotableVue</h2>
      <button
        @click="emptyScreen"
        class="text-2xl text-gray-400 hover:text-gray-600"
        aria-label="Fechar"
      >
        X
      </button>
    </header>

    <main class="text-center mb-5 flex-grow">
      <form>
        <div class="mb-4 px-8">
          <textarea
            v-model="anotacoes"
            id="anotacoes"
            class="p-2 text-gray-500 rounded-xl w-full h-[10rem]"
            placeholder="Digite suas anotações..."
            name="anotacoes"
          ></textarea>
        </div>

        <div class="px-8 pb-5">
          <label for="potencialNegocio" class="block text-gray-500 text-left mb-4"
            >Potencial do negócio</label
          >
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"> R$ </span>
            <input
              v-model="potencialNegocio"
              class="pl-10 pr-3 py-3 rounded-full w-full"
              type="text"
              id="potencialNegocio"
              name="potencialNegocio"
              placeholder="00,00"
              inputmode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div class="px-8 pb-5">
          <label for="categorizacao" class="block text-gray-500 text-left mb-4"
            >Categorização</label
          >
          <vue3-tags-input
            :tags="categorizacao"
            class="bg-white p-2 text-gray-500 rounded-full w-full"
            placeholder="Digite categorias para a anotação..."
            @on-tags-changed="handleChangeTag"
          />
        </div>

        <div class="mb-4 px-8 pb-5 z-0">
          <label for="lembrete" class="block text-gray-500 text-left mb-4">Lembrete</label>
          <input
            v-model="lembrete"
            class="bg-white p-3 text-gray-500 rounded-full w-full"
            id="lembrete"
            name="lembrete"
            type="date"
          />
        </div>
      </form>
    </main>

    <footer class="text-center p-5">
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
      const { anotacoes, potencialNegocio, categorizacao, lembrete } = this
      if (!anotacoes && !potencialNegocio && categorizacao.length === 0 && !lembrete) {
        this.deleteNote()
        return
      }
      const props = {}
      openModal(DeleteConfirmModal, props)
    },
    handleChangeTag(categorizacao) {
      this.categorizacao = categorizacao
    },
    emptyScreen() {
      this.$emit('empty-screen')
    },
    async createNote() {
      const { anotacoes, potencialNegocio, categorizacao, lembrete } = this
      const categorizacaoToStore = JSON.stringify(categorizacao)

      const currentDate = new Date()
      const horaMinutos =
        currentDate.getHours() +
        ':' +
        (currentDate.getMinutes() < 10 ? '0' : '') +
        currentDate.getMinutes()

      const newNote = {
        anotacoes,
        potencialNegocio,
        categorizacao: categorizacaoToStore,
        lembrete,
        horaMinutos
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
