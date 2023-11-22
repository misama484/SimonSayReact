/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import GameBtn from "./GameBtn"

const colors = ["green", "red", "yellow", "blue"];


const SimonGame = () => {
  //estados
  const [ sequence, setSequence] = useState([]);
  const [ playing, setPlaying] = useState(false);
  const [ platingIdx, setPlayingIdx ] = useState(0)

  //useRef -- crea referencia al bg de cada boton, para poderlo cambiar al ejecutar useEffect
  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);


  //funciones

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  }

  const addNewColor = () =>{
  //seleccionamos color aleatorio del array colores
  const color = colors[Math.floor(Math.random() * colors.length)];
  //copiamos el array sequencia y le anyadimos el color random
  const newSequence = [...sequence, color]
  //seteamos nueva sequencia
  setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if(!playing){
      setPlaying(true)
      addNewColor();
    }
  };

  const handleColorClick = (e) => {
    if(playing){
      //añadimos clase de opacidad al boton
        e.target.classList.add("opacity-50")
        //pasado un delay, continuamos con la ejecucion
        setTimeout(() => {
          e.target.classList.remove("opacity-50")
        
        
        //si estamos jugando, accedemos al tributo color del componente pasado por parametro(e)
        const clickColor = e.target.getAttribute("color");
            
        //comprobamos si hacemos click en el color correcto
        if(clickColor === sequence[platingIdx]){
          //si es correcto, aumentamos el index del color que estamos comprobando
          setPlayingIdx(platingIdx + 1);
          //si hemos llegado al final de la secuencia, pasamos al siguiente nivel
          if(platingIdx + 1 === sequence.length){
            setPlayingIdx(0);
            addNewColor();
          }
        }
        //si hacemos click en el color incorrecto
        else{
          resetGame();
          alert("Perdiste!!")
        }

      }, 250);
    }
  };

  //useEffect, ejecutara la funcion que contiene cuando el segundo valor cambie(sequence)
  useEffect(() => {
    if(sequence.length > 0) {
      //muestra secuencia
      const showSequence = (idx = 0) => {
        let ref = null;

        if(sequence[idx] === "green") ref = greenRef
        if(sequence[idx] === "red") ref = redRef
        if(sequence[idx] === "yellow") ref = yellowRef
        if(sequence[idx] === "blue") ref = blueRef

        //iluminando el boton durante un tiempo
        setTimeout(() => {
          ref.current.classList.add("brightness-[3.5]")

          setTimeout(() => {
            ref.current.classList.remove("brightness-[3.5]")
            //si no es el ultimo color de la sequencia, llamamos a la funcion recursivamente
            if(idx < sequence.length -1) showSequence(idx + 1);
            
          }, 250);

        }, 250);


      }
      showSequence();
    }
  }, [sequence]);



  return (
    <div className="bg-black flex justify-center items-center text-white w-screen h-screen">
      {/* Contenedor juego*/}
      <div className="flex flex-col justify-center items-center">
        {/* contenedor verde y rojo */}
        <div className="">
          {/**boton verde */}
          <GameBtn 
            color = "green"
            bg="bg-green-500" 
            border="rounded-tl-full" 
            ref={greenRef}
            onClick={handleColorClick}
            />

          {/**boton rojo */}
          <GameBtn 
            color = "red"
            bg="bg-red-500" 
            border="rounded-tr-full" 
            ref={redRef}
            onClick={handleColorClick}
            />

        </div>

        {/* contenedor amarillo y azul */}
        <div>
          {/**boton amarillo */}
          <GameBtn 
            color = "yellow"
            bg="bg-yellow-400" 
            border="rounded-bl-full" 
            ref={yellowRef}
            onClick={handleColorClick}
            />

          {/**boton azul */}
          <GameBtn 
            color = "blue"
            bg="bg-blue-500" 
            border="rounded-br-full" 
            ref={blueRef}
            onClick={handleColorClick}
            />

        </div>
        {/**boton de play */}
        <button 
          className=" absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105" 
          onClick={handleNextLevel}
          >
          {sequence.length === 0 ? "Play" : sequence.length}
        </button>
      </div>
    </div>
  )
}

export default SimonGame