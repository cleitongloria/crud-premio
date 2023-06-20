import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
// ignore: unused_import
import 'package:intl/intl.dart';

class Premio extends StatefulWidget {
  const Premio({Key? key}) : super(key: key);

  @override
  _PremioState createState() => _PremioState();
}

class _PremioState extends State<Premio> {
  final _formKey = GlobalKey<FormState>();

  String name = '';
  String descricao = '';
  int? ano;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Premio'),
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
                    name = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Descrição'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira uma descrição';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    descricao = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Ano'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, informe o ano';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    ano = int.tryParse(value!);
                  });
                },
              ),
              ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    cadastrarPremio(
                      name,
                      descricao,
                      ano!,
                    );
                    form.reset();
                  }
                },
                child: const Text('Salvar'),
              ),
              ElevatedButton(
                onPressed: buscarPremios,
                child: const Text('Buscar Prêmios'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> cadastrarPremio(String name, String descricao, int ano) async {
    final url = Uri.parse('http://localhost:3030/cdpremios');

    final response = await http.post(
      url,
      body: json.encode({
        'name': name,
        'descricao': descricao,
        'ano': ano,
      }),
      headers: {'Content-Type': 'application/json'},
    );
    if (response.statusCode != 201) {
      throw Exception('Erro ao cadastrar prêmio');
    }
  }

  Future<void> buscarPremios() async {
    final url = Uri.parse('http://localhost:3030/buscarPremios');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      // ignore: unused_local_variable
      final data = json.decode(response.body);
      // Processar os dados recebidos
      // ...
    } else {
      throw Exception('Erro ao buscar prêmios');
    }
  }
}
