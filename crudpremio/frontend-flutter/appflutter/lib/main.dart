import 'package:flutter/material.dart';
import 'autor.dart';
import 'avaliador.dart';
import 'projeto.dart';
import 'premio.dart';
import 'avaliacao.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Meu aplicativo',
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Premiação de Projetos'),
      ),
      body: ListView(
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  children: [
                    ListTile(
                      title: const Text(
                        'Autor',
                        style: TextStyle(
                          color: Colors.blue, // Cor do link
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Autor()),
                        );
                      },
                    ),
                    ListTile(
                      title: const Text(
                        'Avaliador',
                        style: TextStyle(
                          color: Colors.blue, // Cor do link
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Avaliador()),
                        );
                      },
                    ),
                    ListTile(
                      title: const Text(
                        'Projeto',
                        style: TextStyle(
                          color: Colors.blue, // Cor do link
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Projeto()),
                        );
                      },
                    ),
                    ListTile(
                      title: const Text(
                        'Prêmio',
                        style: TextStyle(
                          color: Colors.blue, // Cor do link
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Premio()),
                        );
                      },
                    ),
                    ListTile(
                      title: const Text(
                        'Avaliação',
                        style: TextStyle(
                          color: Colors.blue, // Cor do link
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Avaliacao()),
                        );
                      },
                    ),
                  ],
                ),
              ),
              Container(
                width: 200,
                height: 200,
                alignment: Alignment.center,
                child: Image.asset(
                  'assets/image.png',
                  width: 150,
                  height: 150,
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
