import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import AvatarImg from '../../assets/avatar.jpg';

export const Header: React.FC = () => {
  return (
    <nav className="flex flex-row items-center px-[3.75rem] h-[4.125rem] bg-blue-400 mobile:hidden">
      <div className="flex flex-row items-center justify-between w-full">
        <ul className="flex flex-row items-center gap-12">

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <AiOutlineHome size={32} color="#FFFFFF" />
            <span
              className="font-montserrat font-medium text-base text-white">
              Home
            </span>
          </li>

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <MdOutlineBusinessCenter size={32} color="#FFFFFF" />
            <span
              className="font-montserrat font-medium text-base text-white">
              Negócio
            </span>
          </li>

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <FiShoppingBag size={32} color="#FFFFFF" />
            <span
              className="font-montserrat font-medium text-base text-white">
              Serviços
            </span>
          </li>
        </ul>
        <ul className="flex flex-col items-center">
          <li id="dropdownNavLink" data-dropdown-toggle="dropdownNavbar" className="flex flex-row items-center gap-6 cursor-pointer hover:opacity-60 transition-opacity">
            <img
              src={AvatarImg}
              alt=""
              className="h-9 w-9 object-fill rounded-full"
            />
            <span
              className="font-montserrat font-medium text-base text-white">
              João
            </span>
          </li>

          <div id="dropdownNavBar" className="z-10 hidden bg-white rounded shadow w-44">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <span className="block px-4 py-2">Favoritos</span>
              </li>
              <li>
                <span className="block px-4 py-2">Orçamento</span>
              </li>
              <li>
                <span className="block px-4 py-2">Editar perfil</span>
              </li>
              <li>
                <span className="block px-4 py-2">Sair</span>
              </li>
            </ul>
          </div>

        </ul>
      </div>
    </nav>
  )
}