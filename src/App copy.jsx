
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  // https://tse1.mm.bing.net/th?id=OIP.DzyoDXerRw_GfO2dlLRxyAHaG7&pid=Api&rs=1&c=1&qlt=95&w=113&h=105
  // https://sp.yimg.com/ib/th?id=OPHS.5WonrnYfuwpDBQ474C474&o=5&pid=21.1&w=&h=
  // https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTiB0AVBL-UGraxYoAdyWTIk8BImt9F8HMjXrPuKkYqJrGnOfFUuYmwZfdiY7p_FhglMARqe-XONSqf545AwKBJpOFIop4ZFVHxEaHOkGZnshkZ069OAz5R5B_1Tc-z2_FOMC-A99m5Jw&usqp=CAc
  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState('');

  /*** Url e variavel que carrega do banco */
  const url = "http://localhost:3000/produto";
  const [data, setData] = useState([]);

  /** Status dos Botões Form Inserir e Alterar */
  const [ClassInserir, setClassInserir] = useState('')
  const [classAlterar, setClassAlterar] = useState('sumir')

  /** Lista da nossa base */
  useEffect( () => {
    axios.get(url)
    .then( res => setData(res.data))
  }, [data, setData])

  const Inserir = () => {
    axios.post(url, {
      produto, valor, quantidade, foto
    })
  }

  const Remover = (id, produto) =>{
    const res = window.confirm("Deseja realmente excluir? " + produto)
    if(res === true){
      axios.delete(`${url}/${id}`)
      return false;
    }
  }

  const Cadastrar = (e) => {
    e.preventDefault();
    
    if( produto === ""){
      alert("Por favor preencher o campo nome")
    }else if( quantidade === ""){
      alert("Por favor preencher o campo quantidade")
    }else if( foto === ""){
      alert("Por favor preencher o campo foto")
    }else{
      alert("Cadastrado com sucesso")
      Inserir()
      setProduto("")
      setValor("")
      setQuantidade("")
    }
  }

  const CarregarCampos = (produto, valor, quantidade, foto, id) => {
     
    /*** Muda os status do botão */
     setClassInserir('sumir'), setClassAlterar('')

     setProduto(produto), setValor(valor), setQuantidade(quantidade), setFoto(foto), setId(id)
  }

  const Alterar = (e) => {
    e.preventDefault();
    // alert("id: " + id);

    /** verifica o recebimento
        console.log(
          "Produto: " + produto +
          " Valor: " + valor +
          " Quantidade: " + quantidade +
          " Foto: " + foto
        );
    */
    
    /*** Faz a alteração  */
    axios.put(`${url}/${id}`, {
      produto, valor, quantidade, foto
    }).then( () => {
      alert("Alterado com sucesso " + produto)
      setProduto(""), setValor(""), setQuantidade(""), setFoto("")
      
      /*** Muda os status do botão */
      setClassInserir(''), setClassAlterar('sumir')
    }).catch( (error) => {
      alert( error + ' :( não deu ...')
    })
    
  }

  return (
    <div className='container'>

      <h1 className='mt-5 mb-5'>Cadastro React + Bootstrap</h1>

      <form>
          <div className="row mb-3">
            <div className="col">
              <input type="text" placeholder='produto'
                value={produto}
                className='form-control'
                onChange={e => setProduto(e.target.value)}
              />
            </div>
            <div className="col-2">
              <input type="text" placeholder='valor'
                value={valor}
                className='form-control'
                onChange={e => setValor(e.target.value)}
              />
            </div>
            <div className="col-1">
              <input type="text" placeholder='quantidade'
                value={quantidade}
                className='form-control text-center'
                onChange={e => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input type="text" placeholder=''
                value={foto}
                className='form-control'
                onChange={e => setFoto(e.target.value)}
              />
            </div>
          </div>

          <div className="group-button d-flex gap-2 mb-3">
            <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />
            <button onClick={Cadastrar} className={`btn btn-success ${ClassInserir}` }> Inserir </button>
            <button onClick={Alterar} className={`btn btn-primary ${classAlterar}` }> Salvar </button>
          </div>

      </form>

      <table className='table'>
          <thead>
            <tr>
              <th>Código</th>
              <th width={800}>Produto</th>
              <th width={150}>Valor</th>
              <th>QTD</th>
              <th>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produto}</td>
                  <td>{item.valor}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    <img width={40} src={item.foto} alt="imagem do produto" />
                  </td>
                  <td>
                    <div className="td-group-btn d-flex gap-1">
                      <button className={`btn btn-danger`}
                        onClick={ () => Remover(item.id, item.produto)} ><i className="fa-solid fa-trash"></i>
                      </button>
                      <button 
                        className="btn btn-warning" 
                        onClick={ () => CarregarCampos(item.produto, item.valor, item.quantidade, item.foto, item.id)}
                      > <i className="fa-solid fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
      </table>

    </div>
  )
}

export default App
