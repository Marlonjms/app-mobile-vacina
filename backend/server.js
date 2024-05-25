
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appVacinas'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para cadastrar usuário
app.post('/api/cadastrar-usuario', (req, res) => {
  const { cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade } = req.body;
  const sql = 'INSERT INTO Usuario (cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.status(200).send('Usuário cadastrado com sucesso!');
    }
  });
});

// Endpoint para validar login
app.post('/api/login', (req, res) => {
  const { cpf, senha } = req.body;
  const sql = 'SELECT * FROM Usuario WHERE cpf = ? AND senha = ?';
  db.query(sql, [cpf, senha], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).send('Erro ao fazer login');
    } else {
      if (results.length > 0) {
        res.status(200).send('Login realizado com sucesso!');
      } else {
        res.status(401).send('Credenciais inválidas');
      }
    }
  });
});

// Outros endpoints aqui...

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});








/*

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appVacinas'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para inserir dados no banco
app.post('/api/insert', (req, res) => {
  const { id, nome_vacina, data_vacinacao, lote_vacina, local_vacina } = req.body;
  const sql = 'INSERT INTO Vacina (id, nome_vacina, data_vacinacao, lote_vacina, local_vacina) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [id, nome_vacina, data_vacinacao, lote_vacina, local_vacina], (err, result) => {
    if (err) throw err;
    res.send('Dados inseridos com sucesso!');
  });
});

// Endpoint para obter todas as vacinas
app.get('/api/consultas', (req, res) => {
  const sql = 'SELECT * FROM Vacina';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint para deletar uma vacina
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Vacina WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Vacina deletada com sucesso!');
  });
});

// Endpoint para atualizar uma vacina
app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { nome_vacina, data_vacinacao, lote_vacina, local_vacina } = req.body;
  const sql = 'UPDATE Vacina SET nome_vacina = ?, data_vacinacao = ?, lote_vacina = ?, local_vacina = ? WHERE id = ?';
  db.query(sql, [nome_vacina, data_vacinacao, lote_vacina, local_vacina, id], (err, result) => {
    if (err) throw err;
    res.send('Vacina atualizada com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


*/











