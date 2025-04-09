class Livro{

    public titulo: string;

    constructor(titulo: string){

        this.titulo = titulo;
    }
}

class Membro{

    public nome: string;

    public cpf: string;

    public livrosAlugados: Array<Livro> = [];

    constructor(nome:string, cpf:string){

        this.nome = nome;
        
        this.cpf = cpf;
    }

    alugarLivro(livro: Livro) {
        
        this.livrosAlugados.push(livro);
    }

    obterLivrosAlugados(): Livro[]{

        return this.livrosAlugados;
    }

    devolverLivrosAlugados(): void{

        this.livrosAlugados = [];
    }
}

class Biblioteca{

    public livros: Array <Livro> = [];

    public membros: Array <Membro> = [];

    adicionarLivro(livro: Livro){

        this.livros.push(livro);
    }

    removerLivro(livro: Livro){

        //filter faz loop de array, quando der true ele armazena e cria outro array
        //nesse caso ele mantem os livros que não passei no parametro
        //quando da false ele tira do array
        //nesse caso ele esta tirando o que é = ao parametro passado
        this.livros = this.livros.filter(function(livroBiblioteca){
            return livroBiblioteca != livro;
        });
    }

    buscarLivro(titulo: string){

        //find faz loop de array, porém diferente do filter ele me retorna apenas um resultado quando encontrado
        const livroBuscado: Livro | undefined = this.livros.find(function(livroBiblioteca){
            return livroBiblioteca.titulo == titulo;
        });

        return livroBuscado;
    }

    buscarMembro(cpf: string){
        const membroBuscado: Membro | undefined = this.membros.find(function(membroBuscado){
            return membroBuscado.cpf == cpf;
        });

        return membroBuscado;
    }

    adicionarMembro(membro: Membro){
        
        this.membros.push(membro);
    }

    reservarLivro(titulo: string, cpf: string){

        const livro: Livro | undefined = this.buscarLivro(titulo);

        if(!livro){return null;}

        const membro: Membro | undefined = this.buscarMembro(cpf);

        if(!membro){return null;}

        this.removerLivro(livro);

        membro.alugarLivro(livro);
    }

    devolverLivros(cpf: string){

        const membro = this.buscarMembro(cpf);

        if(!membro){return null;}

        const livrosAlugados = membro.obterLivrosAlugados();

        for(const livro of livrosAlugados){

            this.adicionarLivro(livro);
        }

        membro.devolverLivrosAlugados();
    }
}

const biblioteca: Biblioteca = new Biblioteca();
const membro: Membro = new Membro('Emanuel','123');
const livro1: Livro = new Livro('teste1');
const livro2: Livro = new Livro('teste2');

biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarMembro(membro);
console.log(biblioteca);

biblioteca.reservarLivro('teste3','123');
console.log(biblioteca);

biblioteca.reservarLivro('teste4','123');
console.log(biblioteca);

biblioteca.devolverLivros('1234');
console.log(biblioteca);