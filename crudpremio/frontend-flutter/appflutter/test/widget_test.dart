// testWidgets('Teste de navegação entre telas', (WidgetTester tester) async {
//   // Build our app and trigger a frame.
//   await tester.pumpWidget(const MyApp());

//   // Verifica se a HomePage é exibida inicialmente.
//   expect(find.text('Minha página inicial'), findsOneWidget);

//   // Clica na opção de navegação "Autor" e espera que a tela de cadastro do autor seja exibida.
//   await tester.tap(find.text('Autor'));
//   await tester.pumpAndSettle(); // espera a animação de transição terminar
//   expect(find.text('cadastro de autor'), findsOneWidget);

//   // Clica na opção de navegação "Avaliador" e espera que a tela de cadastro do avaliador seja exibida.
//   await tester.tap(find.text('Avaliador'));
//   await tester.pumpAndSettle(); // espera a animação de transição terminar
//   expect(find.text('cadastro de avaliador'), findsOneWidget);

//   // Clica na opção de navegação "Projeto" e espera que a tela de cadastro do projeto seja exibida.
//   await tester.tap(find.text('Projeto'));
//   await tester.pumpAndSettle(); // espera a animação de transição terminar
//   expect(find.text('cadastro de projeto'), findsOneWidget);
// });