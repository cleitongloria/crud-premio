import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Avaliador extends StatefulWidget {
  const Avaliador({Key? key}) : super(key: key);

  @override
  _AvaliadorState createState() => _AvaliadorState();
}

class _AvaliadorState extends State<Avaliador> {
  final _formKey = GlobalKey<FormState>();

  String nome = '';
  String email = '';
  String cpf = '';
  String telefone = '';
  List<dynamic> avaliadores = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Avaliador'),
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
                    cadastrarAvaliador(nome, email, cpf, telefone);
                    form.reset();
                  }
                },
                child: const Text('Salvar'),
              ),
              ElevatedButton(
                onPressed: buscarAvaliadores,
                child: const Text('Buscar Avaliadores'),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: avaliadores.length,
                  itemBuilder: (context, index) {
                    final avaliador = avaliadores[index];
                    final avaliadorId = avaliador['id'].toString();
                    final nome = avaliador['name'];
                    final email = avaliador['email'];
                    final cpf = avaliador['cpf'];
                    final telefone = avaliador['telefone'];

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
                              atualizarAvaliador(avaliador);
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              excluirAvaliador(avaliadorId);
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

  Future<void> cadastrarAvaliador(
      String nome, String email, String cpf, String telefone) async {
    final url = Uri.parse('http://localhost:3030/avaliadores');

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
      throw Exception('Erro ao cadastrar avaliador');
    }
  }

  Future<void> buscarAvaliadores() async {
    final url = Uri.parse('http://localhost:3030/avaliadores/bsc/todos');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);

      if (data is List) {
        setState(() {
          avaliadores = data;
        });
      } else {
        throw Exception('Resposta inválida: não é uma lista de avaliadores');
      }
    } else {
      throw Exception('Erro ao buscar avaliadores');
    }
  }

  Future<void> atualizarAvaliador(Map<String, dynamic> avaliador) async {
    final TextEditingController nomeController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController cpfController = TextEditingController();
    final TextEditingController telefoneController = TextEditingController();

    // Preencha os controladores de texto com os valores atuais do avaliador
    nomeController.text = avaliador['name'];
    emailController.text = avaliador['email'];
    cpfController.text = avaliador['cpf'];
    telefoneController.text = avaliador['telefone'];

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Editar Avaliador'),
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

                atualizarDadosAvaliador(
                    avaliador['id'].toString(), nome, email, cpf, telefone);

                Navigator.pop(context);
              },
              child: const Text('Salvar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> atualizarDadosAvaliador(String avaliadorId, String nome,
      String email, String cpf, String telefone) async {
    final url =
        Uri.parse('http://localhost:3030/avaliadores/atulz/$avaliadorId');

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
      throw Exception('Erro ao atualizar avaliador');
    }
  }

  Future<void> excluirAvaliador(String avaliadorId) async {
    final url = Uri.parse('http://localhost:3030/avaliadores/dlt/$avaliadorId');

    final response = await http.delete(url);

    if (response.statusCode == 200) {
      setState(() {
        avaliadores.removeWhere(
            (avaliador) => avaliador['id'].toString() == avaliadorId);
      });
    } else {
      throw Exception('Erro ao excluir avaliador');
    }
  }
}
