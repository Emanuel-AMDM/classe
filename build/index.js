// index.ts
class Livro {
  titulo;
  constructor(titulo) {
    this.titulo = titulo;
  }
}

class Membro {
  nome;
  cpf;
  livrosAlugados = [];
  constructor(nome, cpf) {
    this.nome = nome;
    this.cpf = cpf;
  }
  alugarLivro(livro) {
    this.livrosAlugados.push(livro);
  }
  obterLivrosAlugados() {
    return this.livrosAlugados;
  }
  devolverLivrosAlugados() {
    this.livrosAlugados = [];
  }
}

class Biblioteca {
  livros = [];
  membros = [];
  adicionarLivro(livro) {
    this.livros.push(livro);
  }
  removerLivro(livro) {
    this.livros = this.livros.filter(function(livroBiblioteca) {
      return livroBiblioteca != livro;
    });
  }
  buscarLivro(titulo) {
    const livroBuscado = this.livros.find(function(livroBiblioteca) {
      return livroBiblioteca.titulo == titulo;
    });
    return livroBuscado;
  }
  buscarMembro(cpf) {
    const membroBuscado = this.membros.find(function(membroBuscado2) {
      return membroBuscado2.cpf == cpf;
    });
    return membroBuscado;
  }
  adicionarMembro(membro) {
    this.membros.push(membro);
  }
  reservarLivro(titulo, cpf) {
    const livro = this.buscarLivro(titulo);
    if (!livro) {
      return null;
    }
    const membro = this.buscarMembro(cpf);
    if (!membro) {
      return null;
    }
    this.removerLivro(livro);
    membro.alugarLivro(livro);
  }
  devolverLivros(cpf) {
    const membro = this.buscarMembro(cpf);
    if (!membro) {
      return null;
    }
    const livrosAlugados = membro.obterLivrosAlugados();
    for (const livro of livrosAlugados) {
      this.adicionarLivro(livro);
    }
    membro.devolverLivrosAlugados();
  }
}
var biblioteca = new Biblioteca;
var membro = new Membro("Emanuel", "123");
var livro1 = new Livro("teste1");
var livro2 = new Livro("teste2");
biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarMembro(membro);
console.log(biblioteca);
biblioteca.reservarLivro("teste3", "123");
console.log(biblioteca);
biblioteca.reservarLivro("teste4", "123");
console.log(biblioteca);
biblioteca.devolverLivros("1234");
console.log(biblioteca);
