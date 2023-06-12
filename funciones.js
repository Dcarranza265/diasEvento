const inputNombre = document.getElementById("inputNombre")
const inputFecha = document.getElementById("inputFecha")
const formulario = document.getElementById("formulario")
const template = document.getElementById("template").content
const btnEliminar = document.getElementById("btnEliminar")
const tiempoRestante = document.getElementById("tiempoRestante")
const unidadTiempo = document.getElementById("unidadTiempo")
const fragment = document.createDocumentFragment();
const contenido = document.getElementById("contenido")
const eventos = {}
const zonaHoraria = 1000*60*60*5
const enSeg = 1000
const enMin = enSeg*60
const enHoras = enMin*60
const enDias = enHoras*24
let cont = 0



formulario.addEventListener('submit', e =>{
    e.preventDefault()
    registrarEvento(e)
           
})

const registrarEvento = () =>{

    if (inputNombre.value.trim() != "" && inputFecha.value !="" ) {
        cont++
        const nuevoEvento = {
            id: cont,
            nombreEvento: inputNombre.value,
            fechaEvento: inputFecha.value        
        }
        //eventos.push(nuevoEvento);
        eventos[nuevoEvento.id]=nuevoEvento
        inputNombre.value=""
        inputFecha.value=""   
        console.log(eventos)
        mostrarEventos()
    }else{
        alert("Falta completar datos")
    }    
}

const mostrarEventos = () =>{
    contenido.innerHTML=''
    Object.values(eventos).forEach(evento =>{
        const clone = template.cloneNode(true)
        clone.getElementById("nombreEvento").textContent = evento.nombreEvento
        clone.getElementById("fechaEvento").textContent = evento.fechaEvento
        clone.getElementById("btnEliminar").dataset.id = evento.id
        let fechaDestino = new Date(evento.fechaEvento)        
        clone.getElementById("tiempoRestante").textContent = mostrarDias(fechaDestino.getTime())[0] 
        clone.getElementById("unidadTiempo").textContent = mostrarDias(fechaDestino.getTime())[1]         
        fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
}

const mostrarDias = (fechaEvento) => {
    let fechaActual = Date.now()-zonaHoraria;
    let hoy = new Date(fechaActual);    
    let tiempoRestante= Math.floor((fechaEvento-hoy.getTime())/enDias) 
    let unidad = "Dias"
    if (tiempoRestante==0) {
        tiempoRestante = Math.floor((fechaEvento-hoy.getTime()) / enHoras)
        unidad = "Horas"
    }
    const restante = [tiempoRestante, unidad]    
    return restante        
}

function onEliminar(e){
    
    delete eventos[e.target.dataset.id]
    // eventos.splice(evento => evento.id == e.target.dataset.id,1)  
    // console.log(e.target.dataset.id);
    // console.log(eventos);
    mostrarEventos();
}   