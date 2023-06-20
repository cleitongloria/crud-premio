import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Autor extends StatefulWidget {
  const Autor({Key? key}) : super(key: key);

  @override
  _AutorState createState() => _AutorState();
}

class _AutorState extends State<Autor> {
  final _formKey = GlobalKey<FormState>();

  String nome = '';
  String email = '';
  String cpf = '';
  String telefone = '';
  List<dynamic> autores = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Autor'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o nome';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    nome = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o email';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    email = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'CPF'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o CPF';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    cpf = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Telefone'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o telefone';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    telefone = value!;
                  });
                },
              ),
              ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    cadastrarAutor(nome, email, cpf, telefone);
                    form.reset();
                  }
                },
                child: const Text('Salvar'),
              ),
              ElevatedButton(
                onPressed: buscarAutores,
                child: const Text('Buscar Autores'),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: autores.length,
                  itemBuilder: (context, index) {
                    final autor = autores[index];
                    final autorId = autor['id'].toString();
                    final nome = autor['name'];
                    final email = autor['email'];
                    final cpf = autor['cpf'];
                    final telefone = autor['telefone'];

                    return ListTile(
                      title: Text('Nome: $nome'),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Email: $email'),
                          Text('CPF: $cpf'),
                          Text('Telefone: $telefone'),
                        ],
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () {
                              atualizarAvaliador(autor);
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              removerAutor(autorId);
                            },
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> cadastrarAutor(
      String nome, String email, String cpf, String telefone) async {
    final url = Uri.parse('http://localhost:3030/autores');

    final response = await http.post(
      url,
      body: json.encode({
        'name': nome,
        'email': email,
        'cpf': cpf,
        'telefone': telefone,
      }),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode != 201) {
      throw Exception('Erro ao cadastrar autor');
    }
  }

  Future<void> buscarAutores() async {
    final url = Uri.parse('http://localhost:3030/autores/bsc/todos');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);

      if (data is List) {
        setState(() {
          autores = data;
        });
      } else {
        throw Exception('Resposta inválida: não é uma lista de autores');
      }
    } else {
      throw Exception('Erro ao buscar autores');
    }
  }

  Future<void> atualizarAvaliador(Map<String, dynamic> autor) async {
    final TextEditingController nomeController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController cpfController = TextEditingController();
    final TextEditingController telefoneController = TextEditingController();

    // Preencha os controladores de texto com os valores atuais do autor
    nomeController.text = autor['name'];
    emailController.text = autor['email'];
    cpfController.text = autor['cpf'];
    telefoneController.text = autor['telefone'];

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Editar Autor'),
          content: Column(
            children: [
              TextField(
                controller: nomeController,
                decoration: const InputDecoration(labelText: 'Nome'),
              ),
              TextField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              TextField(
                controller: cpfController,
                decoration: const InputDecoration(labelText: 'CPF'),
              ),
              TextField(
                controller: telefoneController,
                decoration: const InputDecoration(labelText: 'Telefone'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                final String nome = nomeController.text;
                final String email = emailController.text;
                final String cpf = cpfController.text;
                final String telefone = telefoneController.text;

                atualizarDadosAutor(
                    autor['id'].toString(), nome, email, cpf, telefone);

                Navigator.pop(context);
              },
              child: const Text('Salvar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> atualizarDadosAutor(String autorId, String nome, String email,
      String cpf, String telefone) async {
    final url = Uri.parse('http://localhost:3030/autores/atulz/$autorId');

    final response = await http.put(
      url,
      body: json.encode({
        'name': nome,
        'email': email,
        'cpf': cpf,
        'telefone': telefone,
      }),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode != 200) {
      throw Exception('Erro ao atualizar autor');
    }
  }

  Future<void> removerAutor(String autorId) async {
    final url = Uri.parse('http://localhost:3030/autores/dlt/$autorId');

    final response = await http.delete(url);

    if (response.statusCode == 200) {
      setState(() {
        autores.removeWhere((autor) => autor['id'].toString() == autorId);
      });
    } else {
      throw Exception('Erro ao remover autor');
    }
  }
}
