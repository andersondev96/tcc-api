import { useState } from "react";

import CoffeeImg1 from '../../../assets/coffee-img1.jpg';
import { AiFillHeart, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

export const ServiceCard: React.FC = () => {
  const [mouseEnter, setMouseEnter] = useState(false);
  return (
    <div className="flex flex-col w-[12.5rem]">
      <div
        className="h-[12.5rem] border-4 border-gray-600 rounded"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <img src={CoffeeImg1} alt="Coffee Image" className="absolute w-[12rem] h-[12rem]" />
        {
          mouseEnter && (
            <div className="flex flex-col justify-center gap-2 p-2 absolute w-[12rem] h-16 mt-[8rem] bg-gray-300 bg-opacity-60">
              <div className="flex flex-col justify-between">
                <span className="font-montserrat font-semibold text-sm">Cappuccino</span>
                <p className="font-inter font-light text-xs">Cafés e bebidas quentes</p>
              </div>
              <span className="font-inter font-semibold text-sm text-amber-900">R$ 5,00</span>
            </div>
          )
        }
      </div>
      <div className="flex flex-row justify-between px-2 mt-2">
        <button className="flex flex-row items-center gap-2 text-green-500 font-montserrat font-medium text-sm hover:text-green-600  transition-colors duration-300">
          <FiEdit2 />
          <span>Editar</span>
        </button>
        <button className="flex flex-row items-center gap-2 text-red-500 font-montserrat font-medium text-sm hover:text-red-600  transition-colors duration-300">
          <AiOutlineDelete />
          <span>Excluir</span>
        </button>
      </div>
    </div>
  )
}