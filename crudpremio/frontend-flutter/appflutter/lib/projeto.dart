import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

class Projeto extends StatefulWidget {
  const Projeto({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ProjetoState createState() => _ProjetoState();
}

class _ProjetoState extends State<Projeto> {
  final _formKey = GlobalKey<FormState>();

  String area = '';
  String titulo = '';
  String resumo = '';
  DateTime? dataEnvio;
  List<dynamic> projetos = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Projeto'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                decoration: const InputDecoration(labelText: 'Área'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira a área';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    area = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Título'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o título';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    titulo = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Resumo'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira um resumo';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    resumo = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Data de Envio'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, informe uma data de envio';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    dataEnvio = DateFormat('yyyy-MM-dd').parse(value!);
                  });
                },
              ),
              ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    cadastrarProjetos(area, titulo, resumo, dataEnvio!);
                    form.reset();
                  }
                },
                child: const Text('Salvar'),
              ),
              ElevatedButton(
                onPressed: buscarProjetos,
                child: const Text('Buscar Projetos'),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: projetos.length,
                  itemBuilder: (context, index) {
                    final projeto = projetos[index];
                    final area = projeto['area'];
                    final titulo = projeto['titulo'];
                    final resumo = projeto['resumo'];
                    final dataEnvio = projeto['data_envio'];

                    return ListTile(
                      title: Text('Área: $area'),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Título: $titulo'),
                          Text('Resumo: $resumo'),
                          Text('Data de Envio: $dataEnvio'),
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

  Future<void> cadastrarProjetos(
      String area, String titulo, String resumo, DateTime dataEnvio) async {
    final url = Uri.parse('http://localhost:3030/cdprojetos');

    final formattedDate = DateFormat('yyyy-MM-dd').format(dataEnvio);

    final response = await http.post(
      url,
      body: json.encode({
        'area': area,
        'titulo': titulo,
        'resumo': resumo,
        'dataEnvio': formattedDate,
      }),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode != 201) {
      throw Exception('Erro ao cadastrar projeto');
    }
  }

  Future<void> buscarProjetos() async {
    final url = Uri.parse('http://localhost:3030/projetos/bsc/todos');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        projetos = data['projetos'];
      });
    } else {
      throw Exception('Erro ao buscar projetos');
    }
  }
}
