<script>
import ListNotes from '@/components/ListNotes.vue'
import NoteDetail from '@/components/NoteDetail.vue'

export default {
  components: {
    ListNotes,
    NoteDetail
  },
  data() {
    return {
      selectedNote: null
    }
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note
    }
  }
}
</script>
<template>
  <div class="flex bg-[#e5e5e5] p-4">
      <aside class="w-1/3 bg-[#f4f3f8] mr-4">
        <ListNotes />
      </aside>
      <div class="w-2/3 bg-[#f4f3f8]">
        <NoteDetail />
      </div>
  </div>
</template>



<style scoped>
</style>
