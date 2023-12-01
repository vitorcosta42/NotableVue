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
  
      const existingNote = await new Promise((resolve, reject) => {
        const request = store.get(noteId);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(`Erro ao obter nota por ID: ${event.target.error}`);
      });
  
      console.log('Existing Note:', existingNote);
  
      if (existingNote) {
        const updatedData = { ...existingNote, ...updatedNote };
  
        console.log('Updated Data:', updatedData);
  
        await putNoteData(store, updatedData);
  
        await transaction.complete;
  
        return true;
      } else {
        throw new Error(`Nota com ID ${noteId} não encontrada.`);
      }
    } catch (error) {
      console.error(`Erro ao atualizar nota: ${error}`);
      throw new Error(`Erro ao atualizar nota: ${error.message}`);
    }
  };
  
  const putNoteData = (store, data) => {
    return new Promise((resolve, reject) => {
      const updateRequest = store.put(data);
  
      updateRequest.onerror = (updateEvent) => {
        reject(new Error(`Erro ao atualizar nota: ${updateEvent.target.error}`));
      };
  
      updateRequest.onsuccess = () => {
        resolve(true);
      };
    });
  };

  const persistData = async (data) => {
    try {
      await persistDataToIndexDB(data);
      const token = await persistDataToAPI(data);
      return token;
    } catch (error) {
      console.error(`Erro ao persistir dados: ${error.message}`);
      throw error;
    }
  };

  const persistDataToIndexDB = async (data) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([NOTE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(NOTE_STORE_NAME);
  
      if (Array.isArray(data)) {
        for (const item of data) {
          await addNote(item, store);
        }
      } else {
        await addNoteAPI(data, store);
      }
  
      await transaction.complete;
    } catch (error) {
      console.error(`Erro ao persistir dados no IndexDB: ${error.message}`);
      throw error;
    }
  };
  

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


  const addNoteAPI = async (note, store) => {
    return new Promise((resolve, reject) => {
      try {
        const serializedNote = JSON.parse(JSON.stringify(note));
  
        const request = store.add(serializedNote);
  
        request.onerror = (event) => {
          reject(`Erro ao adicionar nota: ${event.target.error}`);
        };
  
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      } catch (error) {
        console.error(`Erro ao adicionar nota: ${error.message}`);
        reject(error);
      }
    });
  };
  

  const persistDataToAPI = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/persist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao persistir dados na API: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      return responseData.token;
    } catch (error) {
      console.error(`Erro ao persistir dados: ${error.message}`);
      throw error;
    }
  };

  const retrieveDataFromIndexDB = async () => {
    try {
      const dataFromIndexDB = await getAllNotes();
      return dataFromIndexDB;
    } catch (error) {
      console.error(`Erro ao recuperar dados do IndexDB: ${error.message}`);
      throw error;
    }
  };
  const retrieveData = async (token) => {
    try {
      const dataFromIndexDB = await retrieveDataFromIndexDB();
      if (dataFromIndexDB.length > 0) {
        return dataFromIndexDB;
      }
      const dataFromAPI = await retrieveDataFromAPI(token);
      return dataFromAPI;
    } catch (error) {
      console.error(`Erro ao recuperar dados: ${error.message}`);
      throw error;
    }
  };
  
const retrieveDataFromAPI = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/api/retrieve/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao recuperar dados da API: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error(`Erro ao recuperar dados: ${error.message}`);
    throw error;
  }
};
  
  

export { addNote, getAllNotes, removeNote, getNoteById, updateNote, persistDataToAPI, retrieveDataFromAPI,retrieveData,persistData }
