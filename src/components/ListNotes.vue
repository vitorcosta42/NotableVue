<template>
  <div class="flex flex-col min-h-screen rounded-2xl">
    <header class="flex justify-between items-center p-8">
      <h2 class="text-2xl font-bold text-gray-600">NotableVue</h2>
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
      <div>
        <button
          title="Persistir Dados"
          @click="persistDataHandler"
          class="bg-green-500 py-2 px-2 rounded-3xl mr-2 text-white hover:bg-green-600 mb-3"
        >
          <v-icon name="bi-save" class="text-gray-100" />
        </button>
        <button
          title="Restaurar Dados"
          @click="retrieveDataHandler"
          class="bg-yellow-500 py-2 px-2 rounded-3xl text-white hover:bg-yellow-600 mb-3"
        >
          <v-icon name="hi-refresh" class="text-gray-100" />
        </button>
      </div>
    </footer>
  </div>
  <widget-container-modal />
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import NoteCard from './NoteCard.vue'
import TokenModal from './TokenModal.vue'
import { container } from 'jenesius-vue-modal'
import { openModal } from 'jenesius-vue-modal'
import { getAllNotes, persistDataToDB, restoreDataToIndexedDB } from '../../indexdb'

export default {
  emits: ['create-note', 'open-note-detail'],
  components: {
    'v-icon': OhVueIcon,
    NoteCard,
    WidgetContainerModal: container
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
    console.log(this.notes);

    const notesData = [];
    for (const note of this.notes) {
      if (note && note.data) {
        notesData.push(note.data);
      }
    }

    const lastToken = await persistDataToDB({ notes: notesData });
    this.persistedToken = lastToken;
    
    const props = { lastToken };
    openModal(TokenModal, { token: props.lastToken });

    console.log(this.persistedToken);
    console.log('Data persisted successfully to the server.');
  } catch (error) {
    console.error('Error persisting data:', error);
  }
},

    async retrieveDataHandler() {
      console.log(this.persistedToken)
      const token = this.persistedToken
      if (token) {
        try {
          await restoreDataToIndexedDB(token)
          console.log('Data restored successfully to IndexedDB.')
        } catch (error) {
          console.error('Error restoring data:', error)
        }
      } else {
        console.log('No persisted token available. Please persist data first.')
      }
    }
  }
}
</script>
