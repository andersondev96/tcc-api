import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/avatar.jpg';

export const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="flex flex-row items-center px-[3.75rem] h-[4.125rem] bg-blue-400 mobile:hidden">
      <div className="flex flex-row items-center justify-between w-full">
        <ul className="flex flex-row items-center gap-12">

          <Link to="/home">
            <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
              <AiOutlineHome size={32} color="#FFFFFF" />
              <span
                className="font-montserrat font-medium text-base text-white">
                Home
              </span>
            </li>
          </Link>

          <Link to="/business">
            <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
              <MdOutlineBusinessCenter size={32} color="#FFFFFF" />
              <span
                className="font-montserrat font-medium text-base text-white">
                Negócio
              </span>
            </li>
          </Link>

          <Link to="/service">
            <li className="flex flex-row items-center gap-4 cursor-pointer hover:opacity-60 transition-opacity">
              <FiShoppingBag size={32} color="#FFFFFF" />
              <span
                className="font-montserrat font-medium text-base text-white">
                Serviços
              </span>
            </li>
          </Link>
        </ul>
        <ul
          className="flex flex-col items-center"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <li id="dropdownNavLink" data-dropdown-toggle="dropdownNavbar" className="flex flex-col">
            <button

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
          <div id="dropdownNavBar" className={`${!showDropdown ? 'hidden' : ''} absolute z-10 bg-white rounded shadow w-44 top-[3.125rem]`}>
            <ul className="py-1 text-sm text-gray-700"
            >
              <Link to="/favorites">
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