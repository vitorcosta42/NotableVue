<template>
  <div class="flex bg-[#e5e5e5] p-4">
    <aside class="w-1/3 bg-[#f4f3f8] mr-4 rounded-2xl">
      <ListNotes @create-note="showCreateNote"/>
    </aside>
    <div v-if="hasNotes" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <NoteDetail />
    </div>
    <div v-if="showCreateNoteComponent" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <CreateNote @empty-screen="showEmptyScreen" />
    </div>
    <div
      v-if="!showCreateNoteComponent && showEmptyScreenComponent"
      class="w-2/3 bg-[#f4f3f8] rounded-2xl"
    >
      <EmptyScreen @create-note="showCreateNote" />
    </div>
  </div>
</template>

<script>
import ListNotes from '@/components/ListNotes.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import CreateNote from './components/CreateNote.vue'
import EmptyScreen from './components/EmptyScreen.vue'

export default {
  components: {
    ListNotes,
    NoteDetail,
    CreateNote,
    EmptyScreen
  },
  data() {
    return {
      selectedNote: null,
      notes: [],
      showCreateNoteComponent: false,
      showEmptyScreenComponent: true
    }
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note
    },
    showCreateNote() {
      this.showCreateNoteComponent = true
      this.showEmptyScreenComponent = false
    },
    showEmptyScreen() {
      this.showEmptyScreenComponent = true
      this.showCreateNoteComponent = false
    }
  },
  computed: {
    hasNotes() {
      return this.notes.length > 0
    }
  }
}
</script>
