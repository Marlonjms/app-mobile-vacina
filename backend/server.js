const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Coloque sua senha aqui, se houver
  database: 'appVacinas'
});

connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao MySQL: ', error);
  } else {
    console.log('Conexão bem-sucedida ao MySQL!');
  }
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { cpf, senha } = req.body;
  const sqlSelect = 'SELECT * FROM Usuario WHERE cpf = ? AND senha = ?';
  connection.query(sqlSelect, [cpf, senha], (error, results) => {
    if (error) {
      console.error('Erro ao fazer login: ', error);
      res.status(500).send('Erro ao fazer login');
    } else if (results.length > 0) {
      res.status(200).send('Login bem-sucedido');
    } else {
      res.status(401).send('CPF ou senha incorretos');
    }
  });
});

// Rota de cadastrar usuário
app.post('/api/cadastrar-usuario', (req, res) => {
  const { cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade } = req.body;
  const sql = 'INSERT INTO Usuario (cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.status(200).send('Usuário cadastrado com sucesso!');
    }
  });
});

// Rota de inserção de vacina
app.post('/api/vacina', (req, res) => {
  const { cpf, nome_vacina, data_vacinacao, local_vacina, lote_vacina } = req.body;
  const sqlInsert = 'INSERT INTO Vacina (cpf, nome_vacina, data_vacinacao, local_vacina, lote_vacina) VALUES (?, ?, ?, ?, ?)';
  connection.query(sqlInsert, [cpf, nome_vacina, data_vacinacao, local_vacina, lote_vacina], (error, result) => {
    if (error) {
      console.error('Erro ao adicionar vacina: ', error);
      res.status(500).send('Erro ao adicionar vacina');
    } else {
      res.status(200).send('Vacina adicionada com sucesso');
    }
  });
});

// Rota de consulta de vacinas por CPF
app.get('/api/vacina/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const sqlSelect = 'SELECT * FROM Vacina WHERE cpf = ?';
  connection.query(sqlSelect, [cpf], (error, results) => {
    if (error) {
      console.error('Erro ao consultar vacinas: ', error);
      res.status(500).send('Erro ao consultar vacinas');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota de atualização de vacina
app.put('/api/vacina/:id', (req, res) => {
  const id = req.params.id;
  const { nome_vacina, data_vacinacao, local_vacina, lote_vacina } = req.body;
  const sqlUpdate = 'UPDATE Vacina SET nome_vacina = ?, data_vacinacao = ?, local_vacina = ?, lote_vacina = ? WHERE id = ?';
  connection.query(sqlUpdate, [nome_vacina, data_vacinacao, local_vacina, lote_vacina, id], (error, result) => {
    if (error) {
      console.error('Erro ao atualizar vacina: ', error);
      res.status(500).send('Erro ao atualizar vacina');
    } else {
      res.status(200).send('Vacina atualizada com sucesso');
    }
  });
});

// Rota de exclusão de vacina
app.delete('/api/vacina/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 'DELETE FROM Vacina WHERE id = ?';
  connection.query(sqlDelete, [id], (error, result) => {
    if (error) {
      console.error('Erro ao deletar vacina: ', error);
      res.status(500).send('Erro ao deletar vacina');
    } else {
      res.status(200).send('Vacina deletada com sucesso');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
