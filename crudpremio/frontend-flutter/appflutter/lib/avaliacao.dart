import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

class Avaliacao extends StatefulWidget {
  const Avaliacao({Key? key}) : super(key: key);

  @override
  _AvaliacaoState createState() => _AvaliacaoState();
}

class _AvaliacaoState extends State<Avaliacao> {
  final _formKey = GlobalKey<FormState>();

  String parecer = '';
  double nota = 0.0;
  DateTime? dataAvaliacao;
  List<dynamic> avaliacoes = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Avaliacao'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                decoration: const InputDecoration(labelText: 'Parecer'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o parecer';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    parecer = value!;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Nota'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira a nota';
                  }
                  if (double.tryParse(value) == null) {
                    return 'A nota deve ser um número válido';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    nota = double.parse(value!);
                  });
                },
              ),
              TextFormField(
                decoration:
                    const InputDecoration(labelText: 'Data de Avaliacao'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, informe uma data de avaliação';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    dataAvaliacao = DateFormat('dd/MM/yyyy').parse(value!);
                  });
                },
              ),
              ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    cadastrarAvaliacao(parecer, nota, dataAvaliacao!);
                    form.reset();
                  }
                },
                child: const Text('Salvar'),
              ),
              ElevatedButton(
                onPressed: buscarAvaliacoes,
                child: const Text('Buscar Avaliacoes'),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: avaliacoes.length,
                  itemBuilder: (context, index) {
                    final avaliacao = avaliacoes[index];
                    final parecer = avaliacao['parecer'];
                    final nota = avaliacao['nota'];
                    final dataAvaliacao = avaliacao['data_avaliacao'];

                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ListTile(
                          title: Text('Parecer: $parecer'),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Nota: $nota'),
                              Text('Data de Avaliação: $dataAvaliacao'),
                            ],
                          ),
                        ),
                        Divider(),
                      ],
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

  Future<void> cadastrarAvaliacao(
      String parecer, double nota, DateTime dataAvaliacao) async {
    final url = Uri.parse('http://localhost:3030/cdavaliacoes');

    final formattedDate = DateFormat('yyyy-MM-dd').format(dataAvaliacao);

    final response = await http.post(
      url,
      body: json.encode({
        'parecer': parecer,
        'nota': nota,
        'data_avaliacao': formattedDate,
      }),
      headers: {'Content-Type': 'application/json'},
    );
    if (response.statusCode != 201) {
      throw Exception('Erro ao cadastrar avaliacoes');
    }
  }

  Future<void> buscarAvaliacoes() async {
    final url = Uri.parse('http://localhost:3030/avaliacoes/bsc/todos');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      setState(() {
        avaliacoes = json.decode(response.body);
      });
    } else {
      throw Exception('Erro ao buscar avaliacoes');
    }
  }
}
