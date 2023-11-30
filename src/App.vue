<script>
import ListNotes from '@/components/ListNotes.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import EmptyScreen from './components/EmptyScreen.vue'
import CreateNote from './components/CreateNote.vue'
export default {
  components: {
    ListNotes,
    NoteDetail,
    EmptyScreen,
    CreateNote
  },
  data() {
    return {
      selectedNote: null,
      notes: []
    }
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note
    }
  },
  computed: {
    hasNotes() {
      return this.notes.length > 0
    }
  }
}
</script>
<template>
 <div class="flex bg-[#e5e5e5] p-4">
  <aside class="w-1/3 bg-[#f4f3f8] mr-4 rounded-2xl">
    <ListNotes />

  </aside>
    <div v-if="hasNotes" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <NoteDetail />
    </div>
    <div v-if="!hasNotes" class="w-2/3 bg-[#f4f3f8] rounded-2xl">
      <!-- <EmptyScreen /> -->
      <CreateNote/>
    </div>
  </div>
</template>
