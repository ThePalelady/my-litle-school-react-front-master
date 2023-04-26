# Visão geral

O Login pode ser feito com qualquer credencial, menos o login de estudante que só pode ser feito com o Nome de algum que
existe, ao logar o usuario só vai ter acesso a uma pagina, que é a do cartão dele.

O dashboard (/admin) possui uma listagem com as Cursos, Turmas e Alunos e um botão para Editar e Deletar rapidamente

O Alunos (/students) possui uma listagem de todos os estudantes separado pelas turmas.
Cada card redireciona para uma pagina especifica com os dados do aluno para editar, deletar e visualizar o Card.

# Decisões
## Gerenciamento de estados
  - Zustand: No React é muito comum o compartilhamento de estados entre muitos componentes, aumentando muito a complexidade da interface. Zustand gerencia estados globais, reduzindo o compartilhamento de estados.
  Com o numero de compartilhamento de estados reduzindo, é possivel economizar até mesmo chamadas ao Back-end ja que estados compartilhados causam o re-renderizamento continuo entre componentes que podem estar fazendo requisições ao Back-end.

## Consumo e Entrega de dados
  Considerando que a aplicação inteira roda em um pagina só, é possivel projetar uma rota que retorne de uma vez todos os dados necessarios para todas as paginas e compartilha-los por estados globais, reduzindo drasticamente consultas pelo lado do Back-end.

