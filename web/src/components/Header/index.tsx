import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/avatar.jpg';

export const Header: React.FC = () => {
  const [cursorInUser, setCursorInUser] = useState(false);

  return (
    <nav className="flex flex-row items-center px-[3.75rem] h-[4.125rem] bg-blue-400 mobile:hidden">
      <div className="flex flex-row items-center justify-between w-full">
        <ul className="flex flex-row items-center gap-12">

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <AiOutlineHome size={32} color="#FFFFFF" />
            <Link to="/home">
              <span
                className="font-montserrat font-medium text-base text-white">
                Home
              </span>
            </Link>
          </li>

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <MdOutlineBusinessCenter size={32} color="#FFFFFF" />
            <Link to="/business">
              <span
                className="font-montserrat font-medium text-base text-white">
                Negócio
              </span>
            </Link>
          </li>

          <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
            <FiShoppingBag size={32} color="#FFFFFF" />
            <Link to="/service">
              <span
                className="font-montserrat font-medium text-base text-white">
                Serviços
              </span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col items-center">
          <li id="dropdownNavLink" data-dropdown-toggle="dropdownNavbar" className="flex flex-col">
            <button
              onMouseOver={() => setCursorInUser(true)}
              className={`flex flex-row items-center gap-6 cursor-pointer hover:opacity-60 transition-opacity`}
            >
              <img
                src={AvatarImg}
                alt=""
                className="h-9 w-9 object-fill rounded-full"
              />
              <span
                className="font-montserrat font-medium text-base text-white">
                João
              </span>
            </button>
          </li>
          <div id="dropdownNavBar" className={`${!cursorInUser ? 'hidden' : ''} absolute z-10 bg-white rounded shadow w-44 top-14`}>
            <ul className="py-1 text-sm text-gray-700"
              onMouseOver={() => setCursorInUser(true)}
              onMouseOut={() => setCursorInUser(false)}
            >
              <Link to="#">
                <li className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors">
                  <span className="block px-4 py-2">Favoritos</span>
                </li>
              </Link>

              <Link to="#">
                <li className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors">
                  <span className="block px-4 py-2">Orçamento</span>
                </li>
              </Link>

              <Link to="/profile">
                <li className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors">
                  <span className="block px-4 py-2">Editar perfil</span>
                </li>
              </Link>

              <Link to="/login">
                <li className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors">
                  <span className="block px-4 py-2">Sair</span>
                </li>
              </Link>

            </ul>
          </div>



        </ul>
      </div>
    </nav>
  )
}