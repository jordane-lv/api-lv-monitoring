<p align="center">
  <a href="https://lvnetwork.com.br/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/logo-lv-network-dark.svg"/>
      <source media="(prefers-color-scheme: light)" srcset="./.github/logo-lv-network-light.svg"/>
      <img width="200px" alt="Logo LV Network" src="./.github/logo-lv-network-light.svg" />
    </picture>
  </a>
</p>

<h1 align="center">API LV Monitoramento</h1>

## 💻 Projeto

API criada com o intuito de automatizar o processo da primeira criação dos dados, dos clientes da [LV Network](https://lvnetwork.com.br), no sistema de monitoramento.

Todos os dados são inseridos seguindo padrões pré estabelecidos pela equipe responsável.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

## 🎲 Como executar?

**Com Docker**

1. Clone o repositório
3. Duplique o arquivo ```.env.example``` que está na raiz do projeto
4. Altere o nome do arquivo para ```.env```
5. Insira os dados das variáveis de ambiente.
6. Inicie o servidor com ```docker-compose up -d```.

> **OBS.:** O servidor irá executar na porta 3333 da máquina, para alterar mude as configurações no arquivo ```docker-compose.yaml```.

Exemplo:

```yaml
...
    ports:
      - 5000:3333
...
```

> Mantenha a porta que está após os dois pontos como 3333 pois o projeto foi configurado para executar nessa porta.

---

**Direto na máquina**

Se não quiser executar como o Docker é possível também executar diretamente na máquina.

1. Clone o repositório
2. Instale as dependências com ```yarn```
3. Duplique o arquivo ```.env.example``` que está na raiz do projeto
4. Altere o nome do arquivo para ```.env```
5. Insira os dados das variáveis de ambiente.
6. Inicie o servidor com ```yarn dev```.

## Autor

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/jordane-chaves" width="100px;" alt="Foto de Perfil de Jordane Chaves"/>
<br />

Feito com 💜 por Jordane Chaves
