<template>
  <div
    class="bg-white border-2 hover:border-blue-400 hover:cursor-pointer px-5 py-3 rounded-2xl flex items-center justify-between mb-3"
  >
    <v-icon name="pr-paperclip" class="text-gray-400 hover:text-gray-500" />

    <div>
      <h1 class="mb-2 underline">{{ note.title }}</h1>

      <div class="text-sm text-gray-500">
        <span>{{ note.date }}</span>
        <span> {{ note }}</span>
      </div>
    </div>

    <v-icon
      @click="openModalHandler(note.id)"
      name="bi-trash"
      class="text-red-500 ml-4 hover:text-red-600"
    />
    <widget-container-modal />
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import { container } from 'jenesius-vue-modal'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import { openModal } from 'jenesius-vue-modal'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  components: {
    'v-icon': OhVueIcon,
    WidgetContainerModal: container
  },
  methods: {
    openModalHandler(noteId) {
      
      const props = {noteId:noteId}
      openModal(DeleteConfirmModal, props)
    },
  }
}
</script>
