import React, { useEffect, useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function FormFuncionario(props) {
  const [editPessoa, setEditPessoa] = useState([]);
  const [editProduto, setEditProduto] = useState([]);
  const [listaPessoa, setListaPessoa] = useState([]);
  const [listaProduto, setListaProduto] = useState([]);
  const [doacao, setDoacao] = useState({
    funcionario: null,
    nome: "",
    dataAdmissao: "",
    departamentos: [],
  });

  useEffect(() => {
    const getPessoa = async () => {
      try {
        const retornoPessoas = await fetch(urlBackend + "/pessoas", {
          method: "GET",
        });

        if (retornoPessoas.ok) {
          const listaPessoa = await retornoPessoas.json();
          setListaPessoa(listaPessoa);

          const nomes = listaPessoa.map((pessoa) => pessoa.nome);

          setEditPessoa(nomes);
        } else {
          console.error("Erro ao buscar pessoas:", retornoPessoas.statusText);
        }

        const retornoProduto = await fetch(urlBackend + "/departamento", {
          method: "GET",
        });

     
        if (retornoProduto.ok) {
         
          const listaProduto = await retornoProduto.json();
          console.log(listaProduto);
          setListaProduto(listaProduto);

          const nomesProdutos = listaProduto.map((produto) => produto.nome);
          
          console.log("Departamentos:"+ nomesProdutos);

          setEditProduto(nomesProdutos);
        } else {
          console.error("Erro ao buscar produtos:", retornoProduto.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getPessoa();
  }, []);

  const handleFuncionarioNomeChange = (e) => {
    const funcionarioSelecionado = listaPessoa.find(
      (pessoa) => pessoa.nome === e.target.value
    );

    setDoacao({ ...doacao, funcionario: funcionarioSelecionado });
  };

  const handleProdutoChange = (index, e) => {
    const produtoSelecionado = listaProduto.find(
      (produto) => produto.nome === e.target.value
    );

    const updatedItens = [...doacao.departamentos];
    updatedItens[index].produto = produtoSelecionado;
    setDoacao({ ...doacao, departamentos: updatedItens });
  };


  const handleNomeFuncionarioChange = (e) => {
    setDoacao({ ...doacao, nome: e.target.value });
  };

  const handleFuncionarioDataChange = (e) => {
    setDoacao({ ...doacao, dataAdmissao: e.target.value });
  };




  const handleAddItem = () => {
    setDoacao({
      ...doacao,
      departamentos: [...doacao.departamentos, { produto: "", quantidade: 1 }],
    });
  };
  const handleRemoveItem = (index) => {
    const updatedItens = [...doacao.departamentos];
    updatedItens.splice(index, 1);
    setDoacao({ ...doacao, departamentos: updatedItens });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 

      const departamentosFormatada = doacao.departamentos.map((item) => ({
        codigo: item.produto.codigo,
      }));

      const requestBody = {
        dataAdmissao: doacao.dataAdmissao,
        nome: doacao.nome,
        departamentos: departamentosFormatada,
      };

      console.log("Corpo enviado: "+requestBody);


            try {
              const response = await fetch(`${urlBackend}/funcionario`,{
                  method:"POST",
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify(requestBody)
              })
              if(response.ok){
                  alert("Funcionario cadastrado com sucesso!!");
              }
              return await response.json();
          } catch (error) {
              throw error;
          }

  };

  return (
    <Form onSubmit={handleSubmit}>

          {/**aqui existia um código */}
        
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do funcionário"
              required
              value={doacao.nome}
              id="nome"
              onChange={handleNomeFuncionarioChange}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da pessoa!
          </Form.Control.Feedback>
      
          
       


      <Form.Group className="mb-3">
        <Form.Label>Data de Admissão</Form.Label>
        <FormControl
          type="date"
          onChange={handleFuncionarioDataChange}
          value={doacao.dataAdmissao}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-3">Departamentos: </Form.Label>
        {doacao.departamentos.map((item, index) => (
          <div key={index} className="mb-3">
            <InputGroup className="mb-3">
              <FormControl
                as="select"
                onChange={(e) => handleProdutoChange(index, e)}
                value={item.produto ? item.produto.nome : ""}
              >
                <option value="" disabled>
                  Selecione um Departamento
                </option>
                {editProduto.map((produto, index) => (
                  <option key={index} value={produto}>
                    {produto}
                  </option>
                ))}
              </FormControl>

                {/**aqui existia um código */}

         
              
                {/**aqui existia um código */}


              <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                Remover
              </Button>
            </InputGroup>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddItem} className="ml-5">
          Adicionar Departamento
        </Button>
      </Form.Group>

      <Button
        variant="danger"
        type="button"
        onClick={() => {
          props.exibirTabela(true);
        }}
      >
        Voltar
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
       Cadastrar
      </Button>
    </Form>
  );
}
