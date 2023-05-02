# projeto15-crafty-commerce-back
API que armazena os dados para o funcionamento do crafty-commerce-front.

## Getting started:
Para começar a usufruir dos dados, o usuário deve possuir um cadastro e estar logado em sua conta.

**1. Criando cadastro:**

O frontend deve enviar uma requisição do tipo **`POST`** para a rota `/signup`, com o body:

`{name, email, password}`

onde email precisa possuir o formato de um email válido e password precisa ter, no mínimo, 5 caracteres.

**2. Fazendo login:**

Deve ser enviada uma requisição do tipo **`POST`** para a rota `/login`, contendo o seguinte body: 

`{ email, password }`

que armazena o email e a senha do usuário. Em caso de sucesso no login, o backend envia um objeto contendo nome do usuário e token de autenticação: 

`{ name, token }`

**3. Exibindo os produtos:**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/products`, passando o token de autenticação do usuário no cabeçalho da requisição no seguinte formato: 

`{headers: 
  {Authorization: Bearer {TOKEN} }`. 
  
O backend então responde com um array de todos os produtos em estoque.

**4. Detalhando um produto:**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/product/:id`, passando o token de autenticação do usuário no cabeçalho da requisição no seguinte formato: 

`{headers: 
  {Authorization: Bearer {TOKEN} }`. 
  
E o id do produto deve ser informado como parâmetro da rota. O backend então responde com um objeto que representa aquele produto e possui a seguinte sintaxe:

`{ id, name, description, type, price, image }`

Onde `id` representa o id daquele produto, `name` o seu nome, `description` uma breve descrição detalhada daquele produto, `type` indica a categoria daquele produto, `price` é seu preço unitário e ìmage` uma imagem ilustrativa do produto em estoque.

**5. Procurando produtos por categoria**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/products/:type`, passando o token de autenticação do usuário no cabeçalho da requisição e a categoria do produto deve ser passada como parâmetro da rota. O backend então envia um array com todos os produtos pertencentes àquela categoria.

**6. Adicionando um produto ao carrinho**

Deve ser enviada uma requisição do tipo **`POST`** para a rota `/addProduct/:id`, contendo o token de autorização no cabeçalho da requisição e o seguinte body, informando a quantidade de unidades do produto a serem adicionadas no carrinho:

`{ quantity }`,
sendo `quantity` um número inteiro e positivo.

O id do produto deve ser informado no parâmetro da requisição e, em caso de sucesso, envia ao frontend uma mensagem informando que o produto foi adicionado ao carrinho com sucesso. Caso o produto já esteja no carrinho do usuário e seja enviada uma nova requisição, a quantidade de unidades do produto será atualizada. O usuário não é capaz de adicionar o mesmo produto ao mesmo carrinho mais de uma vez.

**7. Verificando carrinho**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/cartProducts`, passando o token de autenticação do usuário no cabeçalho da requisição. O backend então envia um objeto com o ID de identificação do usuário, além de todos os produtos adicionados ao carrinho organizados em um array. Cada item desse array é um objeto contendo todas as características daquele produto, mais a quantidade enviada pelo usuário ao adicioná-lo ao carrinho.

**8. Removendo um produto do carrinho**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/deleteProduct/:id`, informando o token de autenticação do usuário no cabeçalho da requisição e o id do produto a ser removido do carrinho como parâmetro da rota. Em caso de sucesso, o backend então retira o produto do carrinho do usuário, se aquele tiver sido adicionado anteriormente e envia uma mensagem informando acerca da exclusão.

**9. Alterando a quantidade de produtos no carrinho**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/modifyProductQuantity/:type/:id`, passando o token de autenticação como cabeçalho da requisição. `Type`e `id` são parâmetros da rota e indicam, respectivamente, o tipo de modificação a ser efetuada ( `plus` para adicionar +1 a quantidade atual do produto no carrinho e `minus`para diminuir a quantidade atual em -1), e o id do produto que terá sua quantidade modificada. Caso haja a quantidade do produto seja 1 e o tipo passado pelo usuário for `minus`, o produto será deletado do carrinho.

**10. Finalizando compra**

Deve ser enviada uma requisição do tipo **`POST`** para a rota `/checkout`, contendo o token de autenticação no cabeçalho da requisição e o seguinte body:

`{ payment, subtotal }`, sendo `payment`uma string que indica a forma de pagamento do usuário e aceita como valores válidos: `Cartão de crédito`, `Cartão de débito`, `Boleto Bancário`, `Pix`. `Subtotal`, por sua vez, é um número que representa o somatório do preço total de todos os itens do carrinho daquele usuário.

Em caso de sucesso, o backend armazena as informações da compra no banco de dados e envia para o frontend o status 200 indicando que a compra foi efetuada com sucesso.

**11. Obtendo dados da compra**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/checkout`, contendo o token de autenticação no cabeçalho da requisição. O backend envia ao frontend os dados da compra e da forma de pagamento.

**12. Limpando carrinho após compra**

Deve ser enviada uma requisição do tipo **`GET`** para a rota `/deleteCart`, contendo o token de autenticação no cabeçalho da requisição. O backend então exclui todos os dados do carrinho do usuário e envia uma mensagem ao frontend informando sobre essa exclusão.
