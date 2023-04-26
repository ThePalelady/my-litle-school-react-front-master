# Visão geral

O Login pode ser feito com qualquer credencial, menos o login de estudante que só pode ser feito com o Nome de algum que
existe, ao logar o usuario só vai ter acesso a uma pagina, que é a do cartão dele.

O dashboard (/admin) possui uma listagem com as Cursas, Turmas e Alunos e um botão para Editar e Deletar rapidamente

O Alunos (/students) possui uma listagem de todos os estudantes separado pelas turmas.
Cada card redireciona para uma pagina especifica com os dados do aluno para editar, deletar e visualizar o Card.

# Decisões
## Gerenciamento de estados
  - Zustand: No React é muito comum o compartilhamento de estados entre muitos componentes, aumentando muito a complexidade da interface. Zustand gerencia estados globais, reduzindo o compartilhamento de estados.
  Com o numero de compartilhamento de estados reduzindo, é possivel economizar até mesmo chamadas ao Back-end ja que estados compartilhados causam o re-renderizamento continuo entre componentes que podem estar fazendo requisições ao Back-end.

## Consumo e Entrega de dados
  Uma coisa que iniciantes não entendem é que, maior parte das bibliotecas Javascript do Front-end (React, Angular e Vue) são feitas exclusivamente para o desenvolvimento de SPAs (Single-Page Applications), aplicações que possuem somente uma Página.
  Não tendo isso em mente, é comum ter a ideia de adicionar uma biblioteca de roteamento (react-router-dom) para mapear componentes para servir rotas diferentes e de acordo com essas paginas, projetar rotas no Back-end que sirvam cada pagina exclusivamente. Porém, não é isso que acontece por de baixo dos panos, as bibliotecas de mapeamento apenas "trocam" o HTML dinamicamente entre multiplos componentes, causando a impressão de que há navegação entre as paginas. Com isso, iniciantes tendem a fazer consultas por dados em cada pagina para suas devidas rotas, causando chamadas excessivas e desnecessarias ao Back-end. Considerando que a aplicação inteira roda em um pagina só, é possivel projetar uma rota que retorne de uma vez todos os dados necessarios para todas as paginas e compartilha-los por estados globais, reduzindo drasticamente consultas pelo lado do Back-end.

