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
    const db = await openDB();
    const transaction = db.transaction([NOTE_STORE_NAME], 'readonly');
    const store = transaction.objectStore(NOTE_STORE_NAME);
  
    return new Promise((resolve, reject) => {
      const request = store.get(noteId);
  
      request.onerror = (event) => {
        reject(`Erro ao obter nota por ID: ${event.target.error}`);
      }
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      }
    });
  }
  
  

const updateNote = async (noteId, updatedNote) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([NOTE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(NOTE_STORE_NAME);
  
      const existingNote = await getNoteById(noteId);
  
      if (existingNote) {
        const updatedData = { ...existingNote, ...updatedNote };
  
        await putNoteData(store, updatedData, noteId); 
  
        return true;
      } else {
        throw new Error(`Note with ID ${noteId} not found.`);
      }
    } catch (error) {
      console.error(`Error updating note: ${error}`);
      throw new Error(`Error updating note: ${error.message}`);
    }
  };
  

const putNoteData = (store, data, noteId) => {
    return new Promise((resolve, reject) => {
      const updateRequest = store.put(data, noteId);
  
      updateRequest.onerror = (updateEvent) => {
        reject(new Error(`Error updating note: ${updateEvent.target.error}`));
      };
  
      updateRequest.onsuccess = () => {
        resolve(true);
      };
    });
  };


export { addNote, getAllNotes, removeNote, getNoteById, updateNote }
