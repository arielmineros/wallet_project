import { useEffect } from "react";

const ListarRegistros = async()=>{
    console.log('contract==>',contract);
    if(contract){
        try{
            const contadorRegistros = await contract.methods.registroCouter().call();
        }catch(error){
            console.error('Error al actualizar el valor: ',error)
        }
    }
}
useEffect(()=>{ListarRegistros();},[contract]);
