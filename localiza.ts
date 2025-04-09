class Carro{

    public modelo: string;

    constructor(modelo: string){

        this.modelo = modelo;
    }
}

class Clientes{

    public nome: string;

    public cpf: string;

    public carrosAlugados: Array <Carro> = [];

    constructor(nome: string, cpf: string){

        this.nome = nome;

        this.cpf = cpf;
    }

    alugarCarro(carro: Carro){

        //nesse caso o push ta colocando o carro alugado ao final do array
        this.carrosAlugados.push(carro);
    }

    obterCarrosAlugados(): Array <Carro>{

        return this.carrosAlugados;
    }

    devolverCarrosAlugados(): void{

        this.carrosAlugados = [];
    }
}

class Localiza{

    public carros: Array <Carro> = [];

    public clientes: Array <Clientes> = [];

    adicionarCarro(carro: Carro){

        //nesse caso o push ta colocando o carro alugado ao final do array
        this.carros.push(carro);
    }

    removerCarro(carro: Carro){

        //filter faz um loop que tira do array o que for false, por isso o que for = continua no array
        this.carros = this.carros.filter(function(carroLocaliza: Carro){
            return carroLocaliza != carro;
        });
    }

    buscarCarro(modelo: string){

        //find retorna um resultado procurado no loop
        const carroBuscado: Carro | undefined = this.carros.find(function(carroLocaliza: Carro){
            return carroLocaliza.modelo == modelo;
        });

        return carroBuscado;
    }

    buscarCliente(cpf: string){

        const clienteBuscado: Clientes | undefined = this.clientes.find(function(clienteLocaliza: Clientes){
            
            return clienteLocaliza.cpf == cpf;
        });

        return clienteBuscado;
    }

    adicionarCliente(cliente: Clientes){

        //nesse caso o push ta colocando o carro alugado ao final do array
        this.clientes.push(cliente);
    }

    alugarCarro(modelo: string, cpf: string){

        const carro: Carro | undefined = this.buscarCarro(modelo);

        if(!carro){return null;}

        const cliente: Clientes | undefined = this.buscarCliente(cpf);

        if(!cliente){return null;}

        this.removerCarro(carro);

        cliente.alugarCarro(carro);
    }

    devolverCarro(cpf: string){

        const cliente = this.buscarCliente(cpf);

        if(!cliente){return null;}

        const carrosAlugados = cliente.obterCarrosAlugados();

        for(const carro of carrosAlugados){
            
            this.adicionarCarro(carro);
        }

        cliente.devolverCarrosAlugados();
    }

}

const localiza: Localiza = new Localiza();
const carro1: Carro = new Carro('up');
const carro2: Carro = new Carro('tiggo');
const cliente1: Clientes = new Clientes('Emanuel','123');
const cliente2: Clientes = new Clientes('Gustavo','321');

localiza.adicionarCarro(carro1);
console.log(localiza);

localiza.adicionarCarro(carro2);
console.log(localiza);

localiza.adicionarCliente(cliente1);
console.log(localiza);

localiza.adicionarCliente(cliente2);
console.log(localiza);

localiza.alugarCarro('up', '123');
console.log(localiza);

localiza.alugarCarro('tiggo', '321');
console.log(localiza);

localiza.devolverCarro('123');
console.log(localiza);

localiza.devolverCarro('321');
console.log(localiza);