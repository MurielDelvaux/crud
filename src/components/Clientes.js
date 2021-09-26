import {React, useEffect, useState} from "react";
import styled from 'styled-components';
import { Container,Row, Col,Card,Button, Input } from 'reactstrap';
import { BoxArrowInRight, Dash, Plus } from 'react-bootstrap-icons';
import useOpenAddModal from "../hooks/useOpenAddModal";
import { ModalClientes } from "./ModalClientes";

export function Clientes(){
    const {isOpenModal, setIsOpenModal, handleEditClientOn, isEdit, setIsEdit, setClientCard, clientCard} = useOpenAddModal();

    const [cards,setCards] = useState(null)
    const logout =() =>{
        localStorage.removeItem("auth")
        window.location.assign ("http://localhost:3000/home")
    }
    
    const Thing =styled.div`        
        .something:hover{
          cursor: pointer;
          filter: brightness(60%);                  
        }  
    `;

    const removeCard =(id)=>{
        const data = cards.filter((e)=>e.id!=id)
        localStorage.tabelaCliente = JSON.stringify(data)
        setCards(data)
    }
    useEffect(()=> {
        if(!localStorage.getItem('tabelaCliente')){
            setCards(null)
        }else{
            let data = JSON.parse(localStorage.tabelaCliente)
            setCards(data)
         }
    },[localStorage.tabelaCliente])

   
    return(
        <>
        <Container className="themed-container" fluid={true} >
            <Row xs="1" style={{height:"100vh", backgroundColor:"#1f2b38"}} className="justify-content-md-center align-items-center" >
               <ModalClientes 
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                clientCard={clientCard}
                />
               <Col className="justify-content-md-space-between align-items-center col-md-6" style={{backgroundColor:"#1f2b38", height:"100vh"}}>
                    <div className="d-flex flex-row align-items-center justify-content-between mb-5" >
                        <h4 className="mt-2" style={{color:"white"}}>Clientes</h4>
                        <div className="row">                            
                            <Thing>
                                <BoxArrowInRight className="something" color="#fff" size={25} onClick={logout} />
                            </Thing>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">   
                                         
                        <Input placeholder="Pesquisar..."  style={{ width:"35%", height:"20%"}}/>                           
                        <Button variant="primary" style={{backgroundColor:"#429184"}}  onClick={()=>{setIsOpenModal(true)}}>                            
                            <Plus color="#fff" size={20}/> Adicionar
                           
                        </Button>
                       
                       
                    </div>
                                         
                       {cards&&cards.length>0&&
                       cards.map((e)=>{
                        return(
                             <div className="d-flex justify-content-center mt-3" key={e.id}>
                                 <Card body style={{backgroundColor:"rgb(255,255,255,0.2)",color:"white", cursor:'pointer'}} onClick={()=>{handleEditClientOn(e.id)}}>
                                     <div className="d-flex justify-content-between ">                       
                                         <h5>{e.nome}</h5> 
                                         <div className="d-flex flex-row">
                                             <Button className="d-flex justify-content-center align-items-center" color="danger" style={{fontSize:"0.7em"}} onClick={()=>{
                                                 removeCard(e.id)
                                             }} >
                                                 <Dash color="#fff" size={20} /><span className="d-md-block d-none">Remover</span>
                                             </Button>
                                         </div>                          
         
                                     </div>
                                     <div>                       
                                         <p>{`${e.endereco} n°${e.numero}, ${e.cidade} - ${e.estado}`}</p>
                                     </div>
                                 </Card>
                             </div>
                         )})}                                          

                    
                    
                </Col>
                
            </Row>
        
        </Container>

        </>
    );
}