

//

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
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
  const sqlSelect = 'SELECT * FROM Usuario WHERE cpf = ?';
  connection.query(sqlSelect, [cpf], async (error, results) => {
    if (error) {
      console.error('Erro ao fazer login: ', error);
      res.status(500).send('Erro ao fazer login');
    } else if (results.length > 0) {
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (isPasswordValid) {
        res.status(200).send('Login bem-sucedido');
      } else {
        res.status(401).send('CPF ou senha incorretos');
      }
    } else {
      res.status(401).send('CPF ou senha incorretos');
    }
  });
});

// Rota de cadastrar usuário
app.post('/api/cadastrar-usuario', async (req, res) => {
  const { cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade } = req.body;
  
  try {
    // Criptografar a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    const sql = 'INSERT INTO Usuario (cpf, nome, email, senha, data_nascimento, telefone, sexo, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [cpf, nome, email, hashedSenha, data_nascimento, telefone, sexo, cidade], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send('Erro ao cadastrar usuário');
      } else {
        res.status(200).send('Usuário cadastrado com sucesso!');
      }
    });
  } catch (err) {
    console.error('Erro ao criptografar a senha:', err);
    res.status(500).send('Erro ao cadastrar usuário');
  }
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

// eviar a img
app.post('/api/uploadImagemPerfil', (req, res) => {
  const { cpf, imagem } = req.body;
  const query = `REPLACE INTO ImagemPerfil (cpf, imagem) VALUES (?, ?)`;

  connection.query(query, [cpf, Buffer.from(imagem, 'base64')], (err, result) => {
    if (err) {
      console.error('Erro ao inserir imagem:', err);
      return res.status(500).json({ message: 'Erro ao inserir imagem' });
    }
    res.status(200).json({ message: 'Imagem enviada com sucesso' });
  });
});

//mostrar a img
app.get('/api/imagemPerfil', (req, res) => {
  const { cpf } = req.query;
  const query = `SELECT imagem FROM ImagemPerfil WHERE cpf = ?`;

  connection.query(query, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagem:', err);
      return res.status(500).json({ message: 'Erro ao buscar imagem' });
    }
    if (results.length > 0) {
      const image = results[0].imagem.toString('base64');
      res.status(200).json({ imagem: image });
    } else {
      res.status(404).json({ message: 'Imagem não encontrada' });
    }
  });
});

//excluir a img

app.delete('/api/deleteImagemPerfil', (req, res) => {
  const { cpf } = req.query;
  const query = `DELETE FROM ImagemPerfil WHERE cpf = ?`;

  connection.query(query, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar imagem:', err);
      return res.status(500).json({ message: 'Erro ao deletar imagem' });
    }
    res.status(200).json({ message: 'Imagem deletada com sucesso' });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
