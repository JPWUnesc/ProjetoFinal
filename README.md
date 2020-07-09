# RPGi

Seja muito bem-vindo a RPGi, como o próprio nome já diz é a melhor junção de RPG com API. Na sequência você entenderá como esta solução funciona, nosso objetivo é simples porém nobre. Ajudá-lo a criar seus personagens de RPG. Nossa Api conta com fluxo de autenticação próprio onde o objetivo é que cada usuário crie seu personagens. Os recursos que disponibilizados são:

  - Tipos de equipamento
  - Equipamentos
  - Raças
  - Clases
  - Habilidades
  - Personagens

## Inicie a aplicação!

Copie o repositório para uma basta em seus computador com [Node.JS]('nodejs.org'), em seguida siga os seguintes:
- Comando para estalar os pacotes node
    ```sh
    npm install
    ```
- Comando para iniciliazar o projeto
     ```sh
    npm start
    ```

### Iniciando

    Caso nenhuma alteração tenha sido feita no projeto, o mesmo rodará no link "localhost:3000", este link deve ser sua base, desta forma deve sempre colocar este link antes de cada recurso apresentado. Exemplo: /auth/register, deve ser adicionado a base antes deste recurso, ficando assim: localhost:3000/auth/register

#### Login e criação de usuário
Para que você possa criar seu mundo é necessário criar seu próprio usuário:

 * `POST` /auth/register
    Os campos obrigatórios deste método serão mostrados abaixo, porem alêm dos campos obrigatórios, o e-mail deve ser único. Também é automaticamente logado o usuario após a criação.
    *   nome (`Obrigatório`) 
    *   email (`Obrigatório`)
    *   password (`Obrigatório`)
        * Request Body   
            ```JSON
            {
            	"name": "Usuario",
            	"email": "email@unico.com",
            	"password": "1"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Registro salvo com sucesso!",
                  "content": {
                    "user": {
                      "_id": "5ecf03b374f59d317cbca7d1",
                      "email": "email@unico.com",
                      "createdAt": "2020-05-28T00:20:03.923Z",
                      "__v": 0
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2YwM2IzNzRmNTlkMzE3Y2JjYTdkMSIsImlhdCI6MTU5MDYyNTIwNCwiZXhwIjoxNTkwNzExNjA0fQ.FRPPTDsEx2WCaumJUmQf4RCgn0oWcKh4RzIN7zfwFTo"
                  }
                }
            ```
 * `POST` /auth/register
    *   email (`Obrigatório`)
    *   password (`Obrigatório`)
        * Request Body   
            ```JSON
            {
            	"email": "email@unico.com",
            	"password": "1"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Usúario autenticado com sucesso!",
                  "content": {
                    "user": {
                      "_id": "5ecf03b374f59d317cbca7d1",
                      "email": "email@unico.com",
                      "createdAt": "2020-05-28T00:20:03.923Z",
                      "__v": 0
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2YwM2IzNzRmNTlkMzE3Y2JjYTdkMSIsImlhdCI6MTU5MDYyNTMxNCwiZXhwIjoxNTkwNzExNzE0fQ.dMtFl7iMEg2A-84YXGcD51WrVfmjCzaW8-wLkx6POQI"
                  }
                }
            ```
            
## Objetos
Todos os objetos dentro da aplicação, necessitam do token de auticação que retorna no autenticador. Este token é do tipo bearer e tem validade de um dia. 
#### Classe
Assim como em todo RPG a classe é essencial para o seu personagem, desta forma antes de mais nada, lembre-se de criar as classes que você irá utilizar. Para obter inspiração, saiba mais neste [link](https://rpgromaduke.weebly.com/classes-e-raccedilas.html).

* `POST` /classes
    Ao criar sua classe lembre-se de que o nome e sua proeficiencia são obrigatórios. As classes podem possuem nomes unicos. As proeficiencias só podem ser informadas duas: "ATAQUE" ou "MAGIA". 
    * Campos
        *   nome (`Obrigatório`) 
        *   proeficiencia (`Obrigatório`)
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Barbaro",
            	"proeficiencia": "ATAQUE",
            	"descricao": "Descrição"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Clase criada com sucesso!",
                  "content": {
                    "_id": "5ecf0437f1d81935f4ca7a45",
                    "nome": "Barbaro",
                    "proeficiencia": "ATAQUE",
            	    "descricao": "Descrição"
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
 * `GET` /classes
    Lista todas as classes criadas por usuário.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "total": 1,
                  "message": "Clases listadas com sucesso!",
                  "content": [
                    {
                      "_id": "5ecf0437f1d81935f4ca7a45",
                      "nome": "Barbaro",
                      "proeficiencia": "ATAQUE",
            	      "descricao": "Descrição"
                      "usuario": "5ecaf5e7a8df583f24d9e9da",
                      "__v": 0
                    }
                  ]
                }
            ```
* `GET` /classes/{id}
    Lista uma unica classe pelo id da mesma.
    *   Requisição
        * Response Body   
            ```JSON
                {
                  "success": true,
                  "message": "Clase encontrada com sucesso!",
                  "content": {
                    "_id": "5ecf08eabd96d848d8402b1f",
                    "nome": "Mago",
                    "proeficiencia": "MAGIA",
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
* `PUT` /classes/{id}
    Altera a classe por seu id informado.
    *  Campos
        *   nome 
        *   proeficiencia
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Dark Barbaro"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Clase alterada com sucesso!",
                  "content": {
                    "_id": "5ecf0437f1d81935f4ca7a45",
                    "nome": "Dark Barbaro",
                    "proeficiencia": "ATAQUE",
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /classes/{id}
    Remove a classe por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Clase removida com sucesso!"
                }
            ```

#### Raça
Tão importante quanto a classe, a raça define seus pontos fortes e afinidades em um RPG,  Para obter inspiração, saiba mais neste [link](https://rpgromaduke.weebly.com/classes-e-raccedilas.html).

* `POST` /racas
    Ao criar sua raça lembre-se de que o nome e sua vida, força e magia são obrigatórios. As raças possuem nomes unicos. 
    * Campos
        *   nome (`Obrigatório`) 
        *   vida (`Obrigatório`)
        *   forca (`Obrigatório`)
        *   magia (`Obrigatório`)
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Humano",
            	"vida": 60,
            	"forca": 40,
            	"magia": 40
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Raça criada com sucesso!",
                  "content": {
                    "_id": "5ecf065fcb003b33b877abe2",
                    "nome": "Humano",
                    "vida": 60,
                    "forca": 40,
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
 * `GET` /racas
    Lista todas as raças.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "total": 1,
                  "message": "Raças listadas com sucesso!",
                  "content": [
                    {
                      "_id": "5ecf065fcb003b33b877abe2",
                      "nome": "Humano",
                      "vida": 60,
                      "forca": 40,
                      "usuario": "5ecaf5e7a8df583f24d9e9da",
                      "__v": 0
                    }
                  ]
                }
            ```
* `GET` /racas/{id}
    Lista uma unica raça pelo id da mesma.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Raça encontrada com sucesso!",
                  "content": {
                    "_id": "5ecf0e31b58d6c368018fade",
                    "nome": "Humano",
                    "vida": 60,
                    "forca": 40,
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
* `PUT` /racas/{id}
    Altera a raça por seu id informado.
    *  Campos
        *   nome
        *   vida
        *   forca
        *   magia
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
           {
            	"nome": "Humano",
            	"vida": 100,
            	"forca": 40,
            	"magia": 40
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Raça alterada com sucesso!",
                  "content": {
                    "_id": "5ecf065fcb003b33b877abe2",
                    "nome": "Humano",
                    "vida": 100,
                    "forca": 40,
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /racas/{id}
    Remove a raça por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Raça removida com sucesso!"
                }
            ```

#### Habilidades
Cada classe possui habilidades especificas estas devem ser cridas.

* `POST` /habilidades
    Ao criar sua habilidade lembre-se de que o nome e sua classe são obrigatórios. As habilidades possuem nomes unicos. 
    * Campos
        *   nome (`Obrigatório`) 
        *   dano (`Obrigatório`)
        *   classe (`Obrigatório`)
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "FireBall",
            	"dano": 20,
            	"clase": "5ecf08eabd96d848d8402b1f"
            }
            ```
        * Response Body    
            ```JSON 
            {
              "success": true,
              "message": "Habilidade criada com sucesso!",
              "content": {
                "tiposEquipamentos": [],
                "_id": "5ecf093cbd96d848d8402b21",
                "nome": "FireBall",
                "dano": 20,
                "clase": "5ecf08eabd96d848d8402b1f",
                "usuario": "5ecaf5e7a8df583f24d9e9da",
                "__v": 0
              }
            }
            ```
 * `GET` /habilidades
    Lista todas as habilidades.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "total": 1,
                  "message": "Habilidades listadas com sucesso!",
                  "content": [
                    {
                      "tiposEquipamentos": [],
                      "_id": "5ecf093cbd96d848d8402b21",
                      "nome": "FireBall",
                      "dano": 20,
                      "clase": {
                        "_id": "5ecf08eabd96d848d8402b1f",
                        "nome": "Mago",
                        "proeficiencia": "MAGIA",
                        "usuario": "5ecaf5e7a8df583f24d9e9da",
                        "__v": 0
                      },
                      "usuario": "5ecaf5e7a8df583f24d9e9da",
                      "__v": 0
                    }
                  ]
                }
            ```
* `GET` /habilidades/{id}
    Traz uma unica habilidade por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Habilidade encontrada com sucesso!",
                  "content": {
                    "_id": "5ecf093cbd96d848d8402b21",
                    "clase": {
                      "_id": "5ecf08eabd96d848d8402b1f",
                      "nome": "Mago",
                      "proeficiencia": "MAGIA",
                      "usuario": "5ecaf5e7a8df583f24d9e9da",
                      "__v": 0
                    },
                    "usuario": "5ecaf5e7a8df583f24d9e9da"
                  }
                }
            ```
* `PUT` /habilidades/{id}
    Altera a raça por seu id informado.
    *  Campos
        *   nome
        *   dano
        *   classe
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
           {
            	"nome": "Small Fireball"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Habilidade alterada com sucesso!",
                  "content": {
                    "tiposEquipamentos": [],
                    "_id": "5ecf093cbd96d848d8402b21",
                    "nome": "Small Fireball",
                    "dano": 20,
                    "clase": "5ecf08eabd96d848d8402b1f",
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /habilidades/{id}
    Remove a habilidade por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Habilidade removida com sucesso!"
                }
            ```

#### Tipos de equipamentos
Para que seu personagem se torne forte, o mesmo precisará de equipamentos e é aqui que você define quais tipos de equipamentos você deseja criar.

* `POST` /tiposequipamento
    Ao criar seu tipo de equipamento lembre-se de que o nome é obrigatório. Os tipos de equipamentos possuem nomes unicos. 
    * Campos
        *   nome (`Obrigatório`) 
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Cajado elfico",
            	"descricao": "Um cajado forjado por magos élficos. Esse cajado possui uma habilidade secreta que é a PAREDE DE TERRA. O mago pode criar uma parede de terra para bloquear um ataque."
            }
            ```
        * Response Body   
        ```JSON
            {
              "success": true,
              "message": "Tipo de equipamento criado com sucesso!",
              "content": {
                "_id": "5ecf0af4bd96d848d8402b23",
                "nome": "Cajado",
                "descricao": "Cajados são equipamentos necessarios para magos.",
                "usuario": "5ecaf5e7a8df583f24d9e9da",
                "__v": 0
              }
            }
        ```
 * `GET` /tiposequipamento
    Lista todas os tipos de equipamentos.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "total": 1,
                  "message": "Tipos de equipamento listados com sucesso!",
                  "content": [
                    {
                      "_id": "5ecf0af4bd96d848d8402b23",
                      "nome": "Cajado",
                      "descricao": "Cajados são equipamentos necessarios para magos.",
                      "usuario": "5ecaf5e7a8df583f24d9e9da",
                      "__v": 0
                    }
                  ]
                }
            ```
* `GET` /tiposequipamento/{id}
    Traz um unico tipo de equipamento por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Tipo de equipamento encontrado com sucesso!",
                  "content": {
                    "_id": "5ecf0af4bd96d848d8402b23",
                    "nome": "Cajado",
                    "descricao": "Cajados são equipamentos necessarios para magos.",
                    "usuario": "5ecaf5e7a8df583f24d9e9da"
                  }
                }
            ```
* `PUT` /tiposequipamento/{id}
    Altera o tipo de equipamento por seu id informado.
    *  Campos
        *   nome
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Cajado elfico da terra"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Tipo de equipamento alterado com sucesso!",
                  "content": {
                    "_id": "5ecf0af4bd96d848d8402b23",
                    "nome": "Cajado",
                    "descricao": "Cajados são equipamentos necessarios para magos.",
                    "usuario": "5ecaf5e7a8df583f24d9e9da",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /tiposequipamento/{id}
    Remove o tipo de equipamento por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Tipo de equipamento removido com sucesso!"
                }
            ```
#### Equipamentos
Após a criação dos tipos de equipamentos, basta criar os equipamentos necessários para seus personagens.

* `POST` /equipamentos
    Ao criar seu equipamento lembre-se de que o nome e seu tipo são obrigatórios. Os equipamentos possuem nomes unicos. 
    * Campos
        *   nome (`Obrigatório`) 
        *   tipoEquipamento (`Obrigatório`)
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Cajado elfico",
            	"tipoEquipamento": "5ecf0ef9b58d6c368018fae0"
            }
            ```
        * Response Body    
            ```JSON 
            {
              "success": true,
              "message": "Equipamento criado com sucesso!",
              "content": {
                "_id": "5ecf0f00b58d6c368018fae1",
                "nome": "Cajado elfico",
                "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                "usuario": "5ecf03b374f59d317cbca7d1",
                "__v": 0
              }
            }
            ```
 * `GET` /equipamentos
    Lista todas os equipamentos.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "total": 1,
                  "message": "Equipamentos listados com sucesso!",
                  "content": [
                    {
                      "_id": "5ecf0f00b58d6c368018fae1",
                      "nome": "Cajado elfico",
                      "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                      "usuario": "5ecf03b374f59d317cbca7d1",
                      "__v": 0
                    }
                  ]
                }
            ```
* `GET` /equipamentos/{id}
    Traz um unico equipamento por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Equipamento encontrado com sucesso!",
                  "content": {
                    "_id": "5ecf0f00b58d6c368018fae1",
                    "nome": "Cajado elfico",
                    "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
* `PUT` /equipamentos/{id}
    Altera a raça por seu id informado.
    *  Campos
        *   nome
        *   tipoEquipamento
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Cajado elfico da terra"
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Equipamento alterado com sucesso!",
                  "content": {
                    "_id": "5ecf0f00b58d6c368018fae1",
                    "nome": "Cajado elfico da terra",
                    "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /equipamentos/{id}
    Remove o equipamento por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Equipamento removido com sucesso!"
                }
            ```

#### Personagens
Seus personagens é composto de todos as características anteriores, para torna-lo forte, ótimos equipamentos, uma boa classe e raça são essenciais.

* `POST` /personagens
    Ao criar seu personagem lembre-se de que o nome, dano, classe e raça são obrigatórios. Os personagens possuem nomes unicos. 
    * Campos
        *   nome (`Obrigatório`) 
        *   dano (`Obrigatório`)
        *   classe (`Obrigatório`)
        *   raca (`Obrigatório`)
        *   equipamentos
        *   habilidades
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Merlin",
            	"dano": 20,
            	"clase": "5ed02a7b0522ea42bc9e49e3",
            	"raca": "5ecf0e31b58d6c368018fade",
            	"descricao": "Mago supremo",
            	"equipamentos": [
            		{
            			"_id": "5ed02b910522ea42bc9e49e5"
            		}
            	],
            	"habilidades": [
            		{
            			"_id": "5ecf0e4db58d6c368018fadf"
            		}
            	]
            }
            ```
        * Response Body    
            ```JSON 
               {
                  "success": true,
                  "message": "Personagem criado com sucesso!",
                  "content": {
                    "nivel": 1,
                    "habilidades": [
                      "5ecf0e4db58d6c368018fadf"
                    ],
                    "equipamentos": [
                      "5ed02b910522ea42bc9e49e5"
                    ],
                    "_id": "5ed02cb67b51c53bc43b2e73",
                    "nome": "Merlin",
                    "clase": "5ed02a7b0522ea42bc9e49e3",
                    "raca": "5ecf0e31b58d6c368018fade",
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
 * `GET` /personagens
    Lista todas os personagens.
    * Filtros
        *  nome
    *   Requisição
        * Response Body   
            ```JSON
            {
              "success": true,
              "total": 1,
              "message": "Personagens listados com sucesso!",
              "content": [
                {
                  "nivel": 1,
                  "habilidades": [
                    {
                      "tiposEquipamentos": [],
                      "_id": "5ecf0e4db58d6c368018fadf",
                      "nome": "FireBall",
                      "dano": 20,
                      "clase": "5ecf08eabd96d848d8402b1f",
                      "usuario": "5ecf03b374f59d317cbca7d1",
                      "__v": 0
                    }
                  ],
                  "equipamentos": [
                    {
                      "_id": "5ed02b910522ea42bc9e49e5",
                      "nome": "Cajado elfico",
                      "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                      "usuario": "5ecf03b374f59d317cbca7d1",
                      "__v": 0
                    }
                  ],
                  "_id": "5ed02cb67b51c53bc43b2e73",
                  "nome": "Merlin",
                  "clase": {
                    "_id": "5ed02a7b0522ea42bc9e49e3",
                    "nome": "Mago",
                    "proeficiencia": "MAGIA",
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  },
                  "raca": {
                    "_id": "5ecf0e31b58d6c368018fade",
                    "nome": "Humano",
                    "vida": 60,
                    "forca": 40,
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  },
                  "usuario": "5ecf03b374f59d317cbca7d1",
                  "__v": 0
                }
              ]
            }
            ```
* `GET` /personagens/{id}
    Traz um unico personagem por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Personagem encontrado com sucesso!",
                  "content": {
                    "nivel": 1,
                    "habilidades": [
                      {
                        "tiposEquipamentos": [],
                        "_id": "5ecf0e4db58d6c368018fadf",
                        "nome": "FireBall",
                        "dano": 20,
                        "clase": "5ecf08eabd96d848d8402b1f",
                        "usuario": "5ecf03b374f59d317cbca7d1",
                        "__v": 0
                      }
                    ],
                    "equipamentos": [
                      {
                        "_id": "5ed02b910522ea42bc9e49e5",
                        "nome": "Cajado elfico",
                        "tipoEquipamento": "5ecf0ef9b58d6c368018fae0",
                        "usuario": "5ecf03b374f59d317cbca7d1",
                        "__v": 0
                      }
                    ],
                    "_id": "5ed02cb67b51c53bc43b2e73",
                    "nome": "Merlin",
                    "clase": {
                      "_id": "5ed02a7b0522ea42bc9e49e3",
                      "nome": "Mago",
                      "proeficiencia": "MAGIA",
                      "usuario": "5ecf03b374f59d317cbca7d1",
                      "__v": 0
                    },
                    "raca": {
                      "_id": "5ecf0e31b58d6c368018fade",
                      "nome": "Humano",
                      "vida": 60,
                      "forca": 40,
                      "usuario": "5ecf03b374f59d317cbca7d1",
                      "__v": 0
                    },
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
* `PUT` /personagens/{id}
    Altera a raça por seu id informado.
    *  Campos
        *   nome
        *   dano
        *   classe
        *   raca
        *   equipamentos
        *   habilidades
        *   descricao
    *   Requisição
        * Request Body   
            ```JSON
            {
            	"nome": "Dark Merlin",
            	"dano": 20,
            	"clase": "5ed02a7b0522ea42bc9e49e3",
            	"raca": "5ecf0e31b58d6c368018fade",
            	"descricao": "Mago supremo negro",
            	"equipamentos": [
            		{
            			"_id": "5ed02b910522ea42bc9e49e5"
            		},
            		{
            			"_id": "5ed02d907b51c53bc43b2e74"
            		}
            	],
            	"habilidades": [
            		{
            			"_id": "5ecf0e4db58d6c368018fadf"
            		},
            		{
            			"_id": "5ed02da67b51c53bc43b2e75"
            		}		
            	]
            }
            ```
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Personagem alterado com sucesso!",
                  "content": {
                    "nivel": 1,
                    "habilidades": [
                      "5ecf0e4db58d6c368018fadf",
                      "5ed02da67b51c53bc43b2e75"
                    ],
                    "equipamentos": [
                      "5ed02b910522ea42bc9e49e5",
                      "5ed02d907b51c53bc43b2e74"
                    ],
                    "_id": "5ed02cb67b51c53bc43b2e73",
                    "nome": "Dark Merlin",
                    "clase": "5ed02a7b0522ea42bc9e49e3",
                    "raca": "5ecf0e31b58d6c368018fade",
                    "usuario": "5ecf03b374f59d317cbca7d1",
                    "__v": 0
                  }
                }
            ```
* `DELETE` /personagens/{id}
    Remove o personagem por seu id informado.
    *   Requisição
        * Response Body   
            ```JSON
            	{
                  "success": true,
                  "message": "Personagem removido com sucesso!"
                }
            ```
