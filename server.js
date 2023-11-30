// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

const mongoDBURL = `mongodb+srv://vitorcostadev:${process.env.MONGODB_PASSWORD}@cluster0.uk52orr.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoDBURL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

const Note = mongoose.model('Note', {
  anotacoes: String,
  potencialNegocio: Number,
  categorizacao: [String],
  lembrete: Date,
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Erro ao obter notas:', error);
    res.status(500).json({ error: 'Erro ao obter notas.' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { anotacoes, potencialNegocio, categorizacao, lembrete } = req.body;

  try {
    const newNote = new Note({
      anotacoes,
      potencialNegocio,
      categorizacao,
      lembrete,
    });

    await newNote.save();
    res.json(newNote);
  } catch (error) {
    console.error('Erro ao registrar nota:', error);
    res.status(500).json({ error: 'Erro ao registrar nota.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
