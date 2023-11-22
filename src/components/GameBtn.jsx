/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react"

const GameBtn = forwardRef(({ color, border, bg, onClick }, ref) => (

    <button 
      color={color}
      className={ `${border} ${bg} w-[175px] sm:w-[200px] h-[175px] sm:h-[200px] m-2 border-solid border-4 border-gray-800 duration-200 hover:scale-105` } 
      onClick={onClick} 
      ref={ref}
      />
  
));

export default GameBtn;