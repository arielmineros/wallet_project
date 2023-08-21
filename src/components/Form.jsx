import './Form.css'
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'

function Form(){

    // document.querySelector('formulario').addEventListener("submit", function(e){
    //     e.preventDefault()
    //     const data = Object.fromEntries(
    //         new FormData(e.target)
    //     )
    //     console.log(JSON.stringify(data))
    // })
    
    return(
        
        <div className='formulario'>
            <form className="campo-texto">
                <div className='campo-texto'>
                    <label htmlFor="">Lugar de Formacion</label>
                    <input type="text" placeholder="Lugar de formacion" aria-label="default input example" required></input>
                </div>
                <div className='campo-texto'>
                    <label htmlFor="">Categoria</label>
                    <input type="text" placeholder="Categoria" aria-label="default input example" required></input>
                </div>
                <div className='campo-texto'>
                    <label htmlFor="">titulo</label>
                    <input type="text" placeholder="Titulo" aria-label="default input example" required></input>
                </div>
                <div className='campo-texto'>
                    <label htmlFor="">Fecha de incio</label>
                    <input type="text" placeholder="Fecha de inicio" aria-label="default input example" required></input>
                </div>
                <div className='campo-texto'>
                    <label htmlFor="">Fecha de finalizacion</label>
                    <input type="text" placeholder="Fecha de finalizacion" aria-label="default input example" required></input>
                </div>
                <div className='campo-texto'>
                    <button type="button" className='boton'>Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default Form;