<template>
  <div class="flex flex-col min-h-screen rounded-2xl">
    <header class="flex justify-between items-center p-8">
      <h2 class="text-2xl font-bold text-gray-600">Anotações</h2>
      <button class="text-2xl text-gray-400 hover:text-gray-600" aria-label="Fechar">X</button>
    </header>
    <main class="p-5 flex-grow">
      <div class="mb-4">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @open-note-detail="openNoteDetailHandler"
        />
      </div>
    </main>
    <footer class="text-center p-5">
      <button
        @click="createNote"
        class="bg-blue-500 py-2 px-20 rounded-3xl text-white hover:bg-blue-600 mb-3"
      >
        + Criar anotação
      </button>
      <button
        @click="persistDataHandler"
        class="bg-green-500 py-2 px-20 rounded-3xl text-white hover:bg-green-600 mb-3"
      >
        Persistir Dados
      </button>
      <button
        @click="retrieveDataHandler"
        class="bg-yellow-500 py-2 px-20 rounded-3xl text-white hover:bg-yellow-600 mb-3"
      >
        Recuperar Dados
      </button>
      <div v-if="persistedToken" class="mt-3 text-green-500">Token: {{ persistedToken }}</div>
    </footer>
  </div>
</template>

<script>
import NoteCard from './NoteCard.vue'
import { getAllNotes, persistData, retrieveData } from '../../indexdb'

export default {
  components: {
    NoteCard
  },
  data() {
    return {
      notes: [],
      persistedToken: null
    }
  },
  mounted() {
    this.fetchNotes()
  },
  methods: {
    async fetchNotes() {
      try {
        const notes = await getAllNotes()
        this.notes = notes
      } catch (error) {
        console.error('Erro ao obter notas:', error)
      }
    },
    openNoteDetailHandler(noteId) {
      this.$emit('open-note-detail', noteId)
    },
    createNote() {
      this.$emit('create-note')
    },
    async persistDataHandler() {
      try {
        const token = await persistData({
          notes: this.notes
        })
        console.log(this.notes)
        console.log('Dados persistidos com token:', token)
        this.persistedToken = token
      } catch (error) {
        console.error('Erro ao persistir dados:', error)
      }
    },

    async retrieveDataHandler() {
      try {
        const data = await retrieveData(/* Seu token aqui */)
        console.log('Dados recuperados:', data)
      } catch (error) {
        console.error('Erro ao recuperar dados:', error)
      }
    }
  }
}
</script>
