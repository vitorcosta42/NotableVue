// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
import jwt from 'jsonwebtoken';

const JWT_SECRET = '20/01/2003'; 

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

app.post('/api/persist', async (req, res) => {
  const { data } = req.body;

  try {
    const newNote = new Note(data);
    await newNote.save();

    const token = jwt.sign({ noteId: newNote._id }, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error('Erro ao persistir dados:', error);
    res.status(500).json({ error: 'Erro ao persistir dados.' });
  }
});

app.get('/api/retrieve/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.noteId) {
      throw new Error('Token inválido');
    }

    const note = await Note.findById(decoded.noteId);

    if (!note) {
      throw new Error('Nota não encontrada');
    }
    
    res.json({ data: note });
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    res.status(500).json({ error: 'Erro ao recuperar dados.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
