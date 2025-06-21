

Este repositório serve como **base para Module Federation**, contendo duas aplicações:

1. **`federation_provider`**: Expondo um botão via Module Federation.
2. **`federation_consumer`**: Consumindo e utilizando o botão exposto pelo provider.

## **Descrição**

Este projeto demonstra um exemplo básico de **Module Federation** utilizando o RsBuild. A aplicação **`federation_provider`** expõe um **componente Button**, e o **`federation_consumer`** o consome dinamicamente em tempo de execução.

---

## **Estrutura do Projeto**

```bash
modules-federation-CAP/
│
├── federation_provider/     # Aplicação que fornece o botão (Provider)
│   ├── src/
│   │   ├── button.tsx       # Componente Button exportado
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   └── rsbuild.config.ts    # Configuração do Rsbuild (Provider)
│
├── federation_consumer/     # Aplicação que consome o botão (Consumer)
│   ├── src/
│   │   ├── bootstrap.tsx
│   │   ├── App.tsx # Componente principal que usa o Button
│   │   └── index.ts         # Entry point da aplicação Consumer
│   └── rsbuild.config.ts    # Configuração do Rsbuild (Consumer)
│
└── README.md                # Documentação do projeto
```

---

## **Pré-requisitos**

Certifique-se de ter o **Node.js** instalado em sua máquina.

> [Node.js Download](https://nodejs.org)

---

## **Como Rodar o Projeto**

### **Passo 1: Clonar o Repositório**

```bash
git clone https://github.com/chagas42/modules-federation-CAP.git
cd modules-federation-CAP
```

### **Passo 2: Instalar Dependências**

Acesse cada pasta e instale as dependências:

```bash
# No provider
cd federation_provider
npm install

# No consumer
cd ../federation_consumer
npm install
```

### **Passo 3: Rodar as Aplicações**

Primeiro, inicie o **provider** em uma porta, como 3001:

```bash
cd federation_provider
npm start
```

Agora, inicie o **consumer** em outra porta, como 3002:

```bash
cd ../federation_consumer
npm start
```

---

## **Funcionamento**

1. **`federation_provider`**: Expõe o componente `Button` via **Module Federation**.
2. **`federation_consumer`**: Carrega dinamicamente o botão do provider e o utiliza dentro do seu layout.

### **Componente Button (Provider)**

```javascript
// src/Button.jsx
import React from "react";

const Button = () => (
  <button onClick={() => alert("Button from Provider!")}>Click Me</button>
);

export default Button;
```

### **Uso do Button no Consumer**

```javascript
// src/App.jsx
import React, { Suspense, lazy } from "react";

const RemoteButton = lazy(() => import("provider/Button"));

const App = () => (
  <Suspense fallback={<div>Loading Button...</div>}>
    <h1>Consumer Application</h1>
    <RemoteButton />
  </Suspense>
);

export default App;
```

---

## **Configuração do RsBuild**

### **Provider (rsbuild.config.ts)**

```javascript
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3001 },
  output: {
    publicPath: "http://localhost:3001/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "provider",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};
```

### **Consumer (rsbuild.config.ts)**

```javascript
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3002 },
  output: {
    publicPath: "http://localhost:3002/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "consumer",
      remotes: {
        provider: "provider@http://localhost:3001/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};
```

---

## **Possíveis Problemas**

- **CORS**: Se houver erros de CORS, configure os headers adequados no Rsbuild Dev Server.
- **Versão do React**: Certifique-se de que ambas as aplicações estão usando a **mesma versão** do React.
- **Portas em Uso**: Verifique se as portas 3001 e 3002 estão disponíveis.

---

## **Conclusão**

Este projeto demonstra o uso básico de **Module Federation** para compartilhar um componente simples entre duas aplicações. Essa abordagem é ideal para arquiteturas de **micro-frontends**, permitindo que diferentes times desenvolvam e implantem partes da interface de forma independente.

---

## **Contribuição**

Sinta-se à vontade para abrir issues ou pull requests se encontrar problemas ou tiver sugestões!

---

## **Licença**

Este projeto é licenciado sob a [MIT License](LICENSE).
