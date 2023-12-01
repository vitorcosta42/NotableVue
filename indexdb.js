const DB_NAME = 'notableDB'
const DB_VERSION = 1
const NOTE_STORE_NAME = 'notes'

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      reject(`Erro ao abrir o banco de dados: ${event.target.error}`)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      if (!db.objectStoreNames.contains(NOTE_STORE_NAME)) {
        db.createObjectStore(NOTE_STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }
  })
}

const getAllNotes = async () => {
  const db = await openDB()
  const transaction = db.transaction([NOTE_STORE_NAME], 'readonly')
  const store = transaction.objectStore(NOTE_STORE_NAME)

  return new Promise((resolve, reject) => {
    const request = store.getAll()

    request.onerror = (event) => {
      reject(`Erro ao obter notas: ${event.target.error}`)
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }
  })
}

const removeNote = async (noteId) => {
  const db = await openDB()
  const transaction = db.transaction([NOTE_STORE_NAME], 'readwrite')
  const store = transaction.objectStore(NOTE_STORE_NAME)

  return new Promise((resolve, reject) => {
    const request = store.delete(noteId)

    request.onerror = (event) => {
      reject(`Erro ao remover nota: ${event.target.error}`)
    }

    request.onsuccess = () => {
      resolve(true)
    }
  })
}

const getNoteById = async (noteId) => {
  const db = await openDB()
  const transaction = db.transaction([NOTE_STORE_NAME], 'readonly')
  const store = transaction.objectStore(NOTE_STORE_NAME)

  return new Promise((resolve, reject) => {
    const request = store.get(noteId)

    request.onerror = (event) => {
      reject(`Erro ao obter nota por ID: ${event.target.error}`)
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }
  })
}
const addNote = async (note) => {
  const db = await openDB()
  const transaction = db.transaction([NOTE_STORE_NAME], 'readwrite')
  const store = transaction.objectStore(NOTE_STORE_NAME)
  console.log(note)
  return new Promise((resolve, reject) => {
    const request = store.add(note)

    request.onerror = (event) => {
      reject(`Erro ao adicionar nota: ${event.target.error}`)
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }
  })
}

const updateNote = async (noteId, updatedNote) => {
  try {
    const db = await openDB()
    const transaction = db.transaction([NOTE_STORE_NAME], 'readwrite')
    const store = transaction.objectStore(NOTE_STORE_NAME)

    const existingNote = await new Promise((resolve, reject) => {
      const request = store.get(noteId)
      request.onsuccess = (event) => resolve(event.target.result)
      request.onerror = (event) => reject(`Erro ao obter nota por ID: ${event.target.error}`)
    })

    console.log('Existing Note:', existingNote)

    if (existingNote) {
      const updatedData = { ...existingNote, ...updatedNote }

      console.log('Updated Data:', updatedData)

      await putNoteData(store, updatedData)

      await transaction.complete

      return true
    } else {
      throw new Error(`Nota com ID ${noteId} não encontrada.`)
    }
  } catch (error) {
    console.error(`Erro ao atualizar nota: ${error}`)
    throw new Error(`Erro ao atualizar nota: ${error.message}`)
  }
}

const putNoteData = (store, data) => {
  return new Promise((resolve, reject) => {
    const updateRequest = store.put(data)

    updateRequest.onerror = (updateEvent) => {
      reject(new Error(`Erro ao atualizar nota: ${updateEvent.target.error}`))
    }

    updateRequest.onsuccess = () => {
      resolve(true)
    }
  })
}

const persistDataToDB = async (note) => {
  try {
    const response = await fetch('http://localhost:3000/api/persist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: note })
    })
    const responseData = await response.json()

    if (responseData) {
      return responseData.token
    } else {
      throw new Error(`Failed to persist data. Server error: ${responseData.error}`)
    }
  } catch (error) {
    console.error('Error persisting data to server:', error)
    throw error
  }
}

const retrieveDataToDB = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/api/retrieve/${token}`)
    const responseData = await response.json()

    if (responseData.data) {
      return [responseData.data]
    } else {
      throw new Error('Failed to retrieve data. Server error: ' + responseData.error)
    }
  } catch (error) {
    console.error('Error retrieving data from server:', error)
    throw error
  }
}

const restoreDataToIndexedDB = async (token) => {
  try {
    const retrievedData = await retrieveDataToDB(token)

    const db = await openDB()
    const transaction = db.transaction('notes', 'readwrite')
    const objectStore = transaction.objectStore('notes')

    for (const noteData of retrievedData) {
      objectStore.add(noteData)
    }

    console.log('Data restored successfully to IndexedDB.')
  } catch (error) {
    console.error('Error restoring data:', error)
    throw error
  }
}

export {
  addNote,
  getAllNotes,
  removeNote,
  getNoteById,
  updateNote,
  persistDataToDB,
  restoreDataToIndexedDB
}
