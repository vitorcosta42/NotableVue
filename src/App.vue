<template>
  <div class="flex bg-[#e5e5e5] p-4">
    <aside v-if="showListNotes" class="w-1/3 bg-[#f4f3f8] mr-4 rounded-2xl">
      <ListNotes @create-note="handleCreateNote" @open-note-detail="openNoteDetailHandler" />
    </aside>
    <aside v-if="showListNotesMobile" class="w-full bg-[#f4f3f8] mr-4 rounded-2xl">
      <ListNotes @create-note="handleCreateNoteMobile" @open-note-detail="openNoteDetailHandler" />
    </aside>

    <div v-if="showNoteDetail" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <NoteDetail @empty-screen="handleEmptyScreen" :note-id="selectedNote" />
    </div>

    <div v-if="showNoteDetailMobile" class="w-full bg-[#f4f3f8] rounded-2xl">
      <NoteDetail @empty-screen="handleEmptyScreenMobile" :note-id="selectedNote" />
    </div>

    <div v-if="showCreateNote" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <CreateNote @empty-screen="handleEmptyScreen" />
    </div>
    <div v-if="showCreateNoteMobile" class="w-full bg-[#f4f3f8] rounded-2xl">
      <CreateNote @empty-screen="handleEmptyScreenMobile" />
    </div>

    <div v-if="showEmptyScreen" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <EmptyScreen @create-note="handleCreateNote" />
    </div>
    <div v-if="showEmptyScreenMobile" class="w-full bg-[#f4f3f8] rounded-2xl">
      <EmptyScreen @create-note="handleCreateNote" />
    </div>
  </div>
</template>

<script>
import ListNotes from '@/components/ListNotes.vue'
import NoteDetail from './components/NoteDetail.vue'
import CreateNote from './components/CreateNote.vue'
import EmptyScreen from './components/EmptyScreen.vue'
import { getAllNotes } from '../indexdb'

export default {
  components: {
    ListNotes,
    NoteDetail,
    CreateNote,
    EmptyScreen
  },
  watch: {
    selectedNote(newNoteId, oldNoteId) {
      if (newNoteId !== oldNoteId) {
        this.showNoteDetailComponent = false
        setTimeout(() => {
          this.showNoteDetailComponent = true
        }, 100)
      }
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      notes: [],
      selectedNote: null,
      showCreateNoteComponent: false,
      showEmptyScreenComponent: true,
      showNoteDetailComponent: false,
      showListNotesComponent: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.fetchNotes()
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    async fetchNotes() {
      try {
        const notes = await getAllNotes()
        this.notes = notes
      } catch (error) {
        console.error('Erro ao obter notas:', error)
      }
    },

    showComponent(createNote, emptyScreen, noteDetail, listNotes) {
      this.showCreateNoteComponent = createNote
      this.showEmptyScreenComponent = emptyScreen
      this.showNoteDetailComponent = noteDetail
      this.showListNotesComponent = listNotes
    },
    openNoteDetailHandler(noteId) {
      this.selectedNote = noteId
      this.showComponent(false, false, true)
    },
    handleCreateNote() {
      this.showComponent(true, false, false)
    },
    handleCreateNoteMobile() {
      this.showComponent(true, false, false, false)
    },
    handleEmptyScreen() {
      this.showComponent(false, true, false)
    },
    handleEmptyScreenMobile() {
      this.showComponent(false, true, false, false)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    showNoteDetail() {
      return (
        !this.showCreateNoteComponent &&
        !this.showEmptyScreenComponent &&
        this.showNoteDetailComponent &&
        this.windowWidth >= 768 &&
        this.notes.length > 0
      )
    },
    showNoteDetailMobile() {
      return (
        !this.showCreateNoteComponent &&
        !this.showEmptyScreenComponent &&
        this.showNoteDetailComponent &&
        this.notes.length <= 0
      )
    },
    showCreateNote() {
      return (
        this.showCreateNoteComponent &&
        !this.showEmptyScreenComponent &&
        !this.showNoteDetailComponent &&
        this.windowWidth >= 768 &&
        this.notes.length > 0
      )
    },
    showCreateNoteMobile() {
      return (
        this.showCreateNoteComponent &&
        !this.showEmptyScreenComponent &&
        !this.showNoteDetailComponent &&
        this.windowWidth < 768
      )
    },
    showEmptyScreen() {
      return (
        !this.showCreateNoteComponent &&
        this.showEmptyScreenComponent &&
        !this.showNoteDetailComponent &&
        this.windowWidth >= 768 &&
        this.notes.length > 0
      )
    },
    showEmptyScreenMobile() {
      return (
        !this.showCreateNoteComponent &&
        this.showEmptyScreenComponent &&
        !this.showNoteDetailComponent &&
        this.notes.length <= 0
      )
    },

    showListNotes() {
      return  this.notes.length > 0 && this.windowWidth >= 768
    },

    showListNotesMobile() {
      return !this.showCreateNoteComponent &&
       this.windowWidth < 768 && this.notes.length > 0
    }
  }
}
</script>
