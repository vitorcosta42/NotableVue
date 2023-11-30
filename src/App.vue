<template>
  <div class="flex bg-[#e5e5e5] p-4">
    <aside class="w-1/3 bg-[#f4f3f8] mr-4 rounded-2xl">
      <ListNotes @create-note="showCreateNote" @open-note-detail="openNoteDetailHandler" />
    </aside>
    <div
      v-if="showNoteDetailComponent && !showEmptyScreenComponent"
      class="w-2/3 bg-[#f4f3f8] rounded-2xl"
    >
      <NoteDetail @empty-screen="showEmptyScreen" :note-id="selectedNote" />
    </div>
    <div
      v-if="showCreateNoteComponent && !showEmptyScreenComponent"
      class="w-2/3 bg-[#f4f3f8] rounded-2xl"
    >
      <CreateNote @empty-screen="showEmptyScreen" />
    </div>
    <div
      v-if="!showCreateNoteComponent && showEmptyScreenComponent && !showNoteDetailComponent"
      class="w-2/3 bg-[#f4f3f8] rounded-2xl"
    >
      <EmptyScreen @create-note="showCreateNote" />
    </div>
  </div>
</template>

<script>
import ListNotes from '@/components/ListNotes.vue'
import NoteDetail from './components/NoteDetail.vue'
import CreateNote from './components/CreateNote.vue'
import EmptyScreen from './components/EmptyScreen.vue'

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
      selectedNote: null,
      notes: [],
      showCreateNoteComponent: false,
      showEmptyScreenComponent: true,
      showNoteDetailComponent: false
    }
  },

  methods: {
    showCreateNote() {
      this.showComponent(true, false, false)
    },
    showEmptyScreen() {
      this.showComponent(false, true, false)
    },
    showNoteDetail() {
      this.showComponent(false, false, true)
    },
    showComponent(createNote, emptyScreen, noteDetail) {
      this.showCreateNoteComponent = createNote
      this.showEmptyScreenComponent = emptyScreen
      this.showNoteDetailComponent = noteDetail
    },
    hasNotes() {
      return this.notes.length > 0
    },
    openNoteDetailHandler(noteId) {
      this.selectedNote = noteId
      console.log('Opening note detail for note with ID:', noteId)
      this.showNoteDetail()
    }
  }
}
</script>
