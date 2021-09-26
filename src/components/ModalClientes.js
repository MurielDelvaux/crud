import {React, useState} from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Button, Form, Label, Input } from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';



export function ModalClientes({isOpenModal,setIsOpenModal, isEdit, setIsEdit, clientCard, handleEditClientOn}){
    const [nome, setNome] = useState(null);
    const [cep, setCep] = useState(null);
    const [endereco, setEnderenco] = useState(null);
    const [numero, setNumero] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [estado, setEstado] = useState(null);
    const [pais, setPais] = useState(null);
    const [edit, setEdit] = useState(false)
    const addCliente=()=>{
        const novoCliente={
            id: uuidv4(),
            nome: nome,
            cep: cep,
            endereco:endereco,
            numero:numero,
            telefone:telefone,
            cidade: cidade,
            estado:estado,
            pais:pais
        }
        if(!localStorage.getItem("tabelaCliente")){
            //console.log('EXISTE=>' ,localStorage.tabelaCliente)
            const tabelaCliente = [novoCliente];
            localStorage.tabelaCliente = JSON.stringify(tabelaCliente);
        }else{
            const dataCliente = JSON.parse(localStorage.tabelaCliente);
            dataCliente.push(novoCliente);
            localStorage.tabelaCliente = JSON.stringify(dataCliente);
            
        }
        setIsOpenModal(false);
        setEdit(false)       
    }

    const editClient = ()=>{
        const novoCliente={
            id: clientCard.id,
            nome: nome||clientCard.name,
            cep: cep||clientCard.cep,
            endereco:endereco||clientCard.endereco,
            numero:numero||clientCard.numero,
            telefone:telefone||clientCard.telefone,
            cidade: cidade||clientCard.cidade,
            estado:estado||clientCard.estado,
            pais:pais||clientCard.pais
        }
        var clientes = JSON.parse(localStorage.tabelaCliente)
        clientes.length>0?clientes.map((e, i)=>{
            if(e.id===clientCard.id){
                clientes[i] = novoCliente
            }
        }):console.log('NAO DEU')
        localStorage.tabelaCliente = JSON.stringify(clientes)
        
        setIsOpenModal(false);
        setEdit(false)    
    }
    async function onBlurCep(e){
        const {value} = e.target;

        const valorCep = value.replace(/[^0-9]/g,'');
        if(valorCep.length!=8){
            return;
        }
        

        const consulta = await fetch(`https://viacep.com.br/ws/${valorCep}/json`)
          .then((res)=> res.json())
          .then((data) => {
              console.log(data)
            return(data);
            });
            
            setEnderenco(consulta.logradouro+', '+consulta.bairro)
            setCidade(consulta.localidade)
            setEstado(consulta.uf)
    }

    return(
        <Modal isOpen={isOpenModal}  /* fade={()=>{setOpenAddModal(false)}} */ animation={false} >
        <ModalHeader className="d-flex justify-content-between"style={{backgroundColor:"#429184", color:"white"}}>
            {isEdit&&!edit?`EDITAR`:'Novo Cliente'}
        </ModalHeader>
            <ModalBody>
               
                    <Form>
                    <Row form className="d-flex flex-row">
                        <Col>
                            <Label for="enterName">Nome</Label>
                            <Input type="text" name="nome" id="enterName" placeholder={isEdit&&!edit&&clientCard&&clientCard.nome?clientCard.nome: 'Enter Name'} className="form-control" onChange={(e)=>{setNome(e.target.value)}} disabled={edit}/>
                           
                        </Col>
                        <Col style={{marginLeft:"1em"}}>                                           
                            <Label for="enterZip">CEP</Label>
                            <Input type="text" name="zip" id="enterZip" placeholder={isEdit&&!edit&&clientCard&&clientCard.cep?clientCard.cep:  "Enter zip code" } className="form-control" onChange={(e)=>{setCep(e.target.value)}} disabled={edit} onBlur={onBlurCep} />
                                                                      
                        </Col>     
                    </Row>
                    <Row form className="d-flex flex-row ">
                        <Col>                                           
                            <Label for="enterEndereco">Endereço</Label>
                            <Input type="text" name="endereco" id="enterEndereco" placeholder={isEdit&&!edit&&clientCard&&clientCard.endereco?clientCard.endereco:"Enter address" } className="form-control" onChange={(e)=>{setEnderenco(e.target.value)}} disabled={edit} value={endereco}/>                                            
                        </Col>     
                    </Row>
                    <Row form className="d-flex flex-row ">
                        <Col>                                           
                            <Label for="enterNumber">Número</Label>
                            <Input type="number" name="number" id="enterNumber" placeholder={isEdit&&!edit&&clientCard&&clientCard.numero?clientCard.numero:  "Enter house number" } className="form-control" onChange={(e)=>{setNumero(e.target.value)}} disabled={edit} />                                            
                        </Col>
                        <Col style={{marginLeft:"1em"}}>
                            <Label for="enterTel">Telefone</Label>
                            <Input type="text" name="phone" id="enterPhone" placeholder={isEdit&&!edit&&clientCard&&clientCard.telefone?clientCard.telefone: "Enter phone number"} className="form-control" onChange={(e)=>{setTelefone(e.target.value)}} disabled={edit} />
                        </Col>  
                        </Row>
                            <Row form className="d-flex flex-row ">
                                <Col>                                           
                                    <Label for="enterCity">Cidade</Label>
                                    <Input type="text" name="city" id="enterCity" placeholder={isEdit&&!edit&&clientCard&&clientCard.city?clientCard.city: "Enter city"} className="form-control" onChange={(e)=>{setCidade(e.target.value)}} disabled={edit} value={cidade}/>                                            
                                </Col>
                                <Col style={{marginLeft:"1em"}}>                                           
                                    <Label for="enterState">Estado</Label>
                                    <Input type="text" name="estado" id="enterState" placeholder={isEdit&&!edit&&clientCard&&clientCard.estado?clientCard.estado: "Enter state"} className="form-control" onChange={(e)=>{setEstado(e.target.value)}} disabled={edit} value={estado} />                                            
                                </Col>
                                <Col style={{marginLeft:"1em"}}>                                           
                                    <Label for="enterCountry">País</Label>
                                    <Input type="text" name="country" id="enterCountry" placeholder={isEdit&&!edit&&clientCard&&clientCard.pais?clientCard.pais: "Enter country" } className="form-control" onChange={(e)=>{setPais(e.target.value)}} disabled={edit} />                                            
                                </Col>
                            </Row>
                </Form>

                
            </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="secondary"  onClick={()=>{
                        setIsOpenModal(false)
                        setIsEdit(false)
                        setEdit(false)}} >
                        Cancelar
                    </Button>
                    <Button style={{backgroundColor:"#429184"}} variant="primary"  onClick={isEdit&&!edit? editClient:addCliente }>
                        Salvar
                    </Button>
                </ModalFooter>                  
    </Modal>

    )
}