import SimonGame from './components/SimonGame'
import simonImg from './assets/simonLogo.png'

function App() {
  
  return (
    <div className='bg-black w-screen h-screen justify-center'>
      <div className='flex flex-col justify-center align-center'>
        <img src={simonImg} alt="" className='w-[736px] h-[460px] self-center rounded-full' />
      </div>
      <SimonGame />
    </div>
  )
}

export default App
