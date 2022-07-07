import { useState } from "react";
import { Map } from "../../components/Map";
import { Range } from "../../components/Range";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-row sm:flex-col-reverse justify-between">
      <div className="flex flex-col gap-4 bg-blue-400 min-h-screen min-w-[22.125rem] py-[4.25rem] px-[3.125rem]">
        <div className="flex flex-col gap-1">
          <label 
            htmlFor="category" 
            className="font-montserrat font-medium text-white"
            >
              Estado
            </label>
          <select 
            id="states"
            name="" 
            className="h-[2.75rem] px-[1.25rem] rounded border-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="default" selected disabled>Selecione uma opção</option>
            <option value="MG">Minas Gerais</option>
            <option value="SP">São Paulo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label 
            htmlFor="category" 
            className="font-montserrat font-medium text-white"
            >
              Cidade
            </label>
          <select 
            id="city"
            name="" 
            className="h-[2.75rem] px-[1.25rem] rounded border-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="default" selected disabled>Selecione uma opção</option>
            <option value="Itabira">Itabira</option>
            <option value="João Monlevade">João Monlevade</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label 
            htmlFor="category" 
            className="font-montserrat font-medium text-white"
            >
              Categoria do negócio
            </label>
          <select 
            id="categories"
            name="" 
            className="h-[2.75rem] px-[1.25rem] rounded border-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="default" selected disabled>Selecione uma opção</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Sorveteria">Sorveteria</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <Range />
        </div>

        <div className="flex flex-row justify-center mt-[4.25rem]">
          <button 
            className="bg-indigo-500 h-[2.5rem] w-[7.813rem] rounded font-montserrat font-semibold text-white hover:brightness-90 transition-opacity"
          >
            Pesquisar
          </button>
        </div>
      </div>

      <div>
        <Map />
      </div>
    </div>
  );
}
