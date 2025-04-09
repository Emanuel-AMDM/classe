class Produto{

    public tipo: string;

    constructor(tipo: string){

        this.tipo = tipo;
    }
}

class Cliente{

    public nome: string;

    public cpf: string;

    public pedido: Array <Produto> = [];

    constructor(nome: string, cpf: string){

        this.nome = nome;

        this.cpf = cpf;
    }

    produtosCliente(produto: Produto){

        this.pedido.push(produto);
    }

    obterProdutosCliente(){

        return this.pedido;
    }

    cancelarProdutosCliente(){

        this.pedido = [];
    }
}

class Pedido{

    public produtos: Array <Produto> = [];

    public clienteCPF: string;

    public pedido: string;

    constructor(produto: Produto, clienteCPF: string, pedido: string){

        this.produtos.push(produto);

        this.clienteCPF = clienteCPF;

        this.pedido = pedido;
    }

    obterPedido(){

        return this.pedido;
    }

    removerPedido(){

        this.pedido = '';
        this.clienteCPF = '';
        this.produtos = [];
    }
}

class Loja{

    public produtos: Array <Produto> = [];

    public clientes: Array <Cliente> = [];

    public pedidos: Array <Pedido> = [];

    adicionarProduto(produto: Produto){

        this.produtos.push(produto);
    }

    removerProduto(produto: Produto){

        this.produtos = this.produtos.filter(function(produtosComprados: Produto){
            return produtosComprados != produto;
        });
    }

    buscarProduto(tipo: string){
        
        const produtoBuscado: Produto | undefined = this.produtos.find(function(produtosLoja: Produto){
            return produtosLoja.tipo == tipo;
        });

        return produtoBuscado;
    }

    adicionarCliente(cliente: Cliente){

        this.clientes.push(cliente);
    }

    buscarCliente(cpf: string){

        const clienteBuscado: Cliente | undefined = this.clientes.find(function(clienteLocalizado){
            return clienteLocalizado.cpf == cpf;
        });

        return clienteBuscado;
    }

    adicionarPedido(numeroPedido: Pedido){
        
        this.pedidos.push(numeroPedido);
    }

    criarPedidoLoja(tipo: string, cpf: string){

        const produto: Produto | undefined = this.buscarProduto(tipo);

        if(!produto){return null;}

        const cliente: Cliente | undefined = this.buscarCliente(cpf);
        
        if(!cliente){return null;}

        this.removerProduto(produto);

        cliente.produtosCliente(produto);

        const numeroPedido = '444';

        const pedido = new Pedido(produto, cpf, numeroPedido);

        this.adicionarPedido(pedido);
    }

    buscarPedido(numeroPedido: string){

        const pedidoBuscado: Pedido | undefined = this.pedidos.find(function(pedidoLocalizado){
            return pedidoLocalizado.pedido = numeroPedido;
        })

        return pedidoBuscado;
    }

    cancelarPedidoLoja(cpf: string, numeroPedido: string){

        const cliente: Cliente | undefined = this.buscarCliente(cpf);

        if(!cliente){return null;}

        const produtos: Array <Produto> = cliente.obterProdutosCliente();

        if (!produtos){return null;}

        const pedido: Pedido | undefined = this.buscarPedido(numeroPedido);

        if (!pedido){return null;}

        for(const produto of produtos){

            this.adicionarProduto(produto);
        }

        cliente.cancelarProdutosCliente();

        pedido.removerPedido();
    }

}

const loja: Loja = new Loja();
const cliente: Cliente = new Cliente('Emanuel','123');
const produto: Produto = new Produto('camiseta');
loja.adicionarProduto(produto);
console.log(loja);

loja.adicionarCliente(cliente);
console.log(loja);

loja.criarPedidoLoja('camiseta','123');
console.log(loja);

loja.buscarPedido('444');
console.log(loja);

loja.cancelarPedidoLoja('123','444');
console.log(loja);