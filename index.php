<?php

class Livro{

    public $titulo;//string

    public function __construct($titulo){ //string

        $this->titulo = $titulo;
    
    }
}

//classe sempre no singular
class Membro{

    public $nome; //string

    public $cpf; //string

    public $livros_alugados = []; //array

    public function __construct(string $nome, string $cpf){ //trata os parametros

        $this->nome = $nome;

        $this->cpf = $cpf;
    }

    public function alugar_livro(Livro $livro){ //coloca um livro no array

        $this->livros_alugados[] = $livro;
    }

    public function obter_livros_alugados(){ //retorna todos os livros
        
        return $this->livros_alugados;
    }

    public function devolver_livros_alugados(){ //remove os livros do array
        
        $this->livros_alugados = [];
    }
}

class Biblioteca{

    //atributo
    public $livros = [];//array

    public $membros = [];//array

    //metodo
    public function adicionar_livro(Livro $livro){

        $this->livros[] = $livro;
    }

    public function remover_livro(Livro $livro){

        $buscar_livro = array_search($livro, $this->livros);//retorna a posição do livro no array

        unset($this->livros[$buscar_livro]);
    }

    public function buscar_livro(string $titulo){

        foreach($this->livros as $livro){ //livro
            if($livro->titulo == $titulo){
                return $livro;
            }
        }
        return NULL;
    }

    public function buscar_membro(string $cpf){

        foreach($this->membros as $membro){
            if($membro->cpf == $cpf){
                return $membro;
            }
        }
        return NULL;
    }

    public function adicionar_membro(Membro $membro){

        $this->membros[] = $membro;
    }

    public function reservar_livro(string $titulo, string $cpf){

        $livro = $this->buscar_livro($titulo);

        $membro = $this->buscar_membro($cpf);
        
        $this->remover_livro($livro);

        $membro->alugar_livro($livro);
    }

    //devolver todos os livros
    //buscar membro pelo cpf para ver quais livros ele tem -- $cpf
    //pegar todos os livros que estão com ele -- $livro
    //adicionar na biblioteca -- new livro
    //remover dele -- $this->remover_livro_membro

    public function devolver_livros(string $cpf){

        $membro = $this->buscar_membro($cpf);//busca o membro

        $livros_alugados = $membro->obter_livros_alugados();//busca livros do membro

        foreach($livros_alugados as $livros){//devolve livros na biblioteca
            
            $this->adicionar_livro($livros);
        }

        $membro->devolver_livros_alugados();//remove os livros do membro
    }

}

//objetos
$biblioteca = new Biblioteca();//crio uma biblioteca
$membro = new Membro('Emanuel', '123');//crio um membro
$livro1 = new Livro('teste1');//crio um livro
$livro2 = new Livro('teste2');//crio outro livro

$biblioteca->adicionar_livro($livro1);//adiciono um livro a biblioteca
$biblioteca->adicionar_livro($livro2);//adiciono outro livro a biblioteca
$biblioteca->adicionar_membro($membro);//adiciono o membro
var_dump($biblioteca);

$biblioteca->reservar_livro('teste3', '123');//membro reserva livro pelo titulo
var_dump($biblioteca);

$biblioteca->reservar_livro('teste4', '123');//membro reserva outro livro pelo titulo
var_dump($biblioteca);

$biblioteca->devolver_livros('1234');//membro devolve livro
var_dump($biblioteca);

// $biblioteca->adicionar_membro(new Membro('Emanuel'));
// var_dump($biblioteca);

// $biblioteca->adicionar_livro(new Livro('teste1'));
// $biblioteca->adicionar_livro(new Livro('teste2'));
// $biblioteca->adicionar_livro(new Livro('teste3'));
// $biblioteca->adicionar_livro(new Livro('teste4'));
// var_dump($biblioteca);

//quando eu retorno algo da function eu preciso colocar em uma variavel
// $livro_buscado = $biblioteca->buscar_livro('teste5');
// var_dump($livro_buscado);

// $biblioteca->remover_livro($livro);
// var_dump($biblioteca);
