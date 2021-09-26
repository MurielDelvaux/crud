import { useState, useEffect } from "react";

const useOpenAddModal =()=>{
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [clientCard, setClientCard] = useState(false)
    const [nome, setNome] = useState(null);
    const [cep, setCep] = useState(null);
    const [endereco, setEnderenco] = useState(null);
    const [numero, setNumero] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [estado, setEstado] = useState(null);
    const [pais, setPais] = useState(null);

    const handleEditClientOn = (id)=>{
        const data = JSON.parse(localStorage.tabelaCliente)
        const card = data.find((e)=>e.id===id)
        
             
        setClientCard(card)
        setIsEdit(true)
        setIsOpenModal(true)
    }
    

    return {isOpenModal, setIsOpenModal, handleEditClientOn, isEdit, setIsEdit, setClientCard, clientCard};

}

export default useOpenAddModal;