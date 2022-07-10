import { AiOutlineSearch } from "react-icons/ai";
import { Header } from "../../../components/Header";
import { BusinessHeader } from "./components/BusinessHeader";
import { Card } from "./components/Card";

import Coffee1 from "../../../assets/coffee-img1.jpg";

export const Service: React.FC = () => {
  

  return (
    <div className="flex flex-col">
      <Header />
      <BusinessHeader />
      <div className="px-[6.25rem] py-[2.625rem] mobile:px-[1.125rem] mobile:py-[1.75rem]">
        <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
        <div className="mt-[2rem] flex flex-row mobile:mt-[1rem]">
          <input
            className="border-none bg-gray-300 font-inter rounded-l font-light text-xl px-8 py-4 w-[20rem] h-[3rem] mobile:w-[12rem] mobile:h-[2.5rem] mobile:text-sm"
            type="text"
            placeholder="Pesquisar"
          />
          <button className="h-[3rem] w-[3rem] bg-gray-300 flex flex-row items-center justify-center rounded-r border-l border-black hover:opacity-80 transition-opacity mobile:w-[2.5rem] mobile:h-[2.5rem]">
            <AiOutlineSearch size={24} color="#393737" />
          </button>
        </div>
        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Em destaque</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={3} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Bebidas quentes</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Bebidas geladas</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={1} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Chás</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Doces</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
          </div>
        </div>
      </div>
    </div>
  );
}