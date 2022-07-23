import React from "react";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { FiEdit2, FiSettings } from "react-icons/fi";
import { MdOutlineDesignServices, MdOutlinePeopleAlt } from "react-icons/md";
import { BsCalculator } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";  
export const SideBar: React.FC = () => {
  return (
    <div className="flex flex-no-wrap">
      <div className="w-64 absolute sm:relative bg-indigo-600 shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="flex items-center mt-4 mb-2 px-8">
          <div className="w-10 h-10 bg-cover rounded-md mr-3">
            <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_5.png" className="rounded-full h-full w-full overflow-hidden shadow" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Steve Doe</p>
            <p className="text-gray-600 text-xs">Singhtglass Coffee</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-white">
          <FiEdit2 />
          <p>Editar perfil</p>
        </div>

        <ul className="mt-8 border-t  border-gray-200">
          <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8 mt-8">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <AiOutlineDashboard size={24} />
              <span className="ml-2">Dashboard</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <BiStore size={24} />
              <span className="ml-2">Empresa</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <MdOutlineDesignServices size={24} />
              <span className="ml-2">Serviços</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <MdOutlinePeopleAlt size={24} />
              <span className="ml-2">Clientes</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center  px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <BsCalculator size={24} />
              <span className="ml-2">Orçamentos</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
             <IoChatbubblesOutline size={24}/>
              <span className="ml-2">Chat</span>
            </div>
          </li>
          <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
            <div className="flex items-center font-montserrat font-semibold text-base">
              <FiSettings size={24} />
              <span className="ml-2">Configurações</span>
            </div>
          </li>
        </ul>
        <div className="mt-[5.625rem] px-8 bg-indigo-800">
          <ul className="w-full flex items-center font-montserrat font-semibold text-base">
            <li className="flex flex-row items-center justify-center gap-12 cursor-pointer text-white pt-5 pb-3">
            <AiOutlineClose size={24} />
              Sair
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}


