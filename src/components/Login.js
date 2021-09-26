import {React, useState} from "react";
import { Container,Row, Col,Form, FormGroup, Label, Input, FormText,Card, CardBody, Button } from 'reactstrap';
import teste from '../imagem.png'
import { v4 as uuidv4 } from 'uuid';
import FacebookLogin from 'react-facebook-login';


export function Login(){
    const [isLogin, setIsLogin]=useState(true);
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [emailLogin, setEmailLogin] = useState(null);
    const [senhaLogin, setSenhaLogin] = useState(null);
   
    
    const addUsuario= ()=>{
        const novoUsuario ={
            Id: uuidv4(),
            Nome: nome,
            Email: email,
            Senha: senha            
        }

        var tabelaUsuario = JSON.parse(localStorage.tabelaUsuario);

        tabelaUsuario.push(novoUsuario)
        localStorage.tabelaUsuario = JSON.stringify(tabelaUsuario)
        localStorage.auth = JSON.stringify(novoUsuario)        
    }    

    const loginUsuario = ()=>{
        const tabelaUsuario = JSON.parse(localStorage.tabelaUsuario)
        const findUser = tabelaUsuario.filter((e)=>emailLogin===e.Email);
        const isValidPassword = findUser[0].Senha === senhaLogin
        /* criando sessão */
        const identificacao = findUser[0].Id;
        const uExistente ={
            Id: identificacao,
            Nome: findUser[0].Nome,
            Email: findUser[0].Email,
            Senha: findUser[0].senha 
        }
        localStorage.auth = JSON.stringify(uExistente);
        window.location.href="http://localhost:3000/clientes"

    }

    const responseFacebook = (response) => {
        window.location.href="http://localhost:3000/clientes"
    }

     
    return(
        <>
           
           <Container className="themed-container" fluid={true}>
                <Row xs="1" style={{height:"100vh"}} className="justify-content-md-center align-items-center">
                    
                    <Col className="d-flex flex-column justify-content-center d-lg-block d-md-block d-none col-sm-4" style={{backgroundColor:"#429184", height:"100vh"}}>
                    
                        <div className="d-flex flex-column align-items-center">
                            <div className="col mt-5">
                                <img src={teste} alt="imagem" ></img>
                            </div>
                        </div>
                    
                    </Col>
                    <Col className="d-flex flex-column justify-content-center col-md-8" style={{backgroundColor:"#1f2b38", height:"100vh"}}>
                        <div className="d-flex flex-column align-items-center">                            
                            <div className="justify-content-start" style={{position:"absolute", top:"1em", right:"1em"}}>
                                <Button style={{backgroundColor:"#429184", color:"#1f2b38", border:"1px solid #429184" }} onClick={()=>{setIsLogin(false)}}>Sign Up</Button>                  
                                <Button style={{backgroundColor:"transparent", color:"#429184", border:"1px solid #429184"}} onClick={()=>{setIsLogin(true)}} className="outline-dark">Sign In</Button>
                            </div>
                            {isLogin?(
                                <Card className="align-items-center col-10 col-md-7" style={{backgroundColor:"#263544"}}>
                                <CardBody>                                    
                                    <Form>
                                        <FormGroup className="mb-1 mt-2" controlId="formBasicEmail">
                                            <Label style={{color:"#d9dce0"}}>Email address</Label>
                                            <Input type="email" placeholder="Enter email" onChange={(e)=>{setEmailLogin(e.target.value)}}/>
                                            <FormText className="text-muted" >
                                            We'll never share your email with anyone else 
                                            </FormText>
                                        </FormGroup>
                                        <FormGroup className="mb-1" controlId="formBasicPassword">
                                            <Label style={{color:"#d9dce0" }}>Password</Label>
                                            <Input type="password" placeholder="Password" onChange={(e)=>{setSenhaLogin(e.target.value)}}/>
                                        </FormGroup>
                                        <FormGroup check className="mb-4" style={{color:"#d9dce0" }}>
                                            <Input type="checkbox" style={{backgroundColor:"#429184"}} />{' '}
                                            Check me out
                                        </FormGroup>
                                        
                                        <FormGroup>
                                            <Button variant="primary" style={{backgroundColor:"#429184"}} onClick={loginUsuario}>
                                                Enter
                                            </Button>
                                        </FormGroup>
                                        <p style={{borderBottom:"0.5px solid #3e5266",marginTop:"1em"}}/>
                                        <div className="r">
                                            <FacebookLogin
                                                appId="321091869821146"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                textButton="entrar"
                                                icon="fa-facebook"
                                                size="small"                                       
                                            
                                            />,
                                        </div>
                                  
                                        
                                        
                                    </Form>
                                    
                                </CardBody>
                            </Card>
                            ):(

                                <Card className="align-items-center" style={{width:"50%",backgroundColor:"#263544" }}>
                                <CardBody>
                                
                                    <Form>
                                                                        
                                        <FormGroup className="mb-1 mt-2" controlId="formBasicEmail">
                                            <Label style={{color:"#d9dce0"}}>Nome</Label>
                                            <Input type="text" placeholder="Nome completo" onChange={(e)=>{setNome(e.target.value)}}/>                                        
                                        </FormGroup>
                                        <FormGroup className="mb-2" controlId="formBasicEmail">
                                            <Label style={{color:"#d9dce0"}}>Email address</Label>
                                            <Input type="email" placeholder="Enter email"  onChange={(e)=>{setEmail(e.target.value)}} />                                        
                                        </FormGroup>
                                        <FormGroup className="mb-2" controlId="formBasicPassword">
                                            <Label style={{color:"#d9dce0" }}>Password</Label>
                                            <Input type="password" placeholder="Password" onChange={(e)=>{setSenha(e.target.value)}} />
                                            <FormText className="text-muted" >
                                            We'll never share your data with anyone else!
                                            </FormText>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button variant="primary" style={{backgroundColor:"#429184"}} onClick={addUsuario} >
                                                Submit
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                            )}
                        </div>      
                    </Col>  
                </Row>
           </Container>

        </>
    );
}