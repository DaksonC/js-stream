# API de Stream de Números Aleatórios
## Visão Geral
Esta API é construída usando o framework NestJS. Ela fornece um endpoint para transmitir números aleatórios em tempo real usando Server-Sent Events (SSE).

## Índice
- Instalação do `server` e `client`
- Executando as APIs `server` e `client`
- Endpoints da API `client`
  - POST /stream/numbers
- Serviços
  - StreamService
- Tratamento de Erros

## Instalação do `server` e `client`
Clone o repositório:
```
 git clone https://github.com/DaksonC/js-stream.git
```
Navegue até o diretório do projeto:
```
 cd js-stream/client
```
e
```
 cd js-stream/server
```

Instale as dependências:
```
npm install
```
ou
```
yarn
```
## Executando as APIs `server` e `client`
Inicie o servidor das APIs executando:
```
npm run start:dev
```
ou
```
yarn start:dev
```
O servidor começará a ouvir na porta 3333.

## Endpoints da API
## POST /stream/numbers
Este endpoint transmite números aleatórios em tempo real usando Server-Sent Events (SSE).

### Requisição
Método: POST

URL: /stream/numbers

Cabeçalhos: Content-Type: application/json
```json
{
  "random": true
}
```
Resposta
Content-Type: text/event-stream
Eventos Transmitidos: Números aleatórios como objetos MessageEvent
### Exemplo
### Requisição
```shell
curl -X POST http://localhost:3333/stream/numbers -H "Content-Type: application/json" -d '{"random": true}'
```
Resposta
```text
Copiar código
event: message
data: 123

event: message
data: 456

...
```
## Serviços
### StreamService
O `StreamService` é responsável por gerar a transmissão de números aleatórios.

Métodos
generateRandomNumberStream()

- Retorna um `Observable<number>` que emite um número aleatório entre 0 e 999 a cada 100 milissegundos.

```typescript
import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StreamService {
  generateRandomNumberStream(): Observable<number> {
    return interval(100).pipe(
      map(() => Math.floor(Math.random() * 1000)),
    );
  }
}
```
## Tratamento de Erros
Se o corpo da requisição não contiver a propriedade `random` definida como `true`, a API lançará um erro com a mensagem "Invalid request body".

Exemplo de uma requisição inválida:
```shell
curl -X POST http://localhost:3333/stream/numbers -H "Content-Type: application/json" -d '{"random": false}'
```
Resposta:

```json
{
  "statusCode": 500,
  "message": "Invalid request body",
  "error": "Internal Server Error"
}
```
## Conclusão
Esta API fornece um mecanismo simples para transmitir números aleatórios usando Server-Sent Events. Ela é estruturada com modularidade em mente, utilizando serviços e controladores do NestJS para separar responsabilidades e tornar a base de código mantível e escalável.
