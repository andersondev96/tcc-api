import React from "react";
import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";
import { Link } from "react-router-dom";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

export const DetailsBudgetEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64  p-12">
        <PreviousPageButton />
        <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
          <h1 className="font-montserrat font-medium text-2xl">Orçamentos</h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col mobile:flex-col mobile:gap-2 mobile:items-start">
            <span className="font-montserrat font-semibold mb-4 text-lg">
              Informações do cliente
            </span>
            <div className="flex flex-row gap-6">
              <span className="font-montserrat font-semibold">Nome:</span>
              <p className="font-montserrat font-light text-base ml-6">
                João Pedro Xavier
              </p>
            </div>
            <div className="flex flex-row gap-6">
              <span className="font-montserrat font-semibold">E-mail:</span>
              <p className="font-montserrat font-light text-base ml-6">
                joaoxavier@gmail.com
              </p>
            </div>
            <div className="flex flex-row gap-6">
              <span className="font-montserrat font-semibold">Telefone:</span>
              <p className="font-montserrat font-light text-base ml-1">
                (99) 99999-9999
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-montserrat font-semibold text-lg">
              Sobre a proposta
            </span>
            <div className="w-[33.125rem] overflow-x-auto relative shadow-md sm:rounded mt-4 mobile:w-60">
              <table className="w-full">
                <thead className="font-montserrat font-semibold text-sm text-center bg-gray-300">
                  <tr>
                    <th className="py-2 px-6"></th>
                    <th className="py-2 px-6">Produto/Serviço</th>
                    <th className="py-2 px-6">Quantidade</th>
                  </tr>
                </thead>
                <tbody className="font-montserrat font-light text-sm text-center">
                  <tr>
                    <td className="py-2 px-6">
                      <img
                        src={Coffee}
                        alt=""
                        className="h-16 w-16 rounded mobile:h-8 mobile:w-8"
                      />
                    </td>
                    <td className="py-2 px-6">Cappuccino cremoso</td>
                    <td className="py-2 px-6">100</td>
                  </tr>

                  <tr className="font-montserrat font-light text-sm">
                    <td className="py-2 px-6">
                      <img src={Coffee} alt="" className="h-16 w-16 rounded" />
                    </td>
                    <td className="py-2 px-6">Cappuccino cremoso</td>
                    <td className="py-2 px-6">100</td>
                  </tr>

                  <tr className="font-montserrat font-light text-sm">
                    <td className="py-2 px-6">
                      <img src={Coffee} alt="" className="h-16 w-16 rounded" />
                    </td>
                    <td className="py-2 px-6">Cappuccino cremoso</td>
                    <td className="py-2 px-6">100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[45.25rem]">
            <span className="font-montserrat font-semibold text-lg">
              Objetivo do serviço
            </span>
            <p className="font-montserrat font-light text-sm">
              Cappuccino para festa
            </p>
          </div>

          <div className="flex flex-col gap-2 w-[45.25rem]">
            <span className="font-montserrat font-semibold text-lg">
              Prazo esperado
            </span>
            <p className="font-montserrat font-light text-sm">11/04/2022</p>
          </div>

          <div className="flex flex-col gap-2 w-[45.25rem] mobile:w-60">
            <span className="font-montserrat font-semibold text-lg">
              Observações
            </span>
            <p className="font-montserrat font-light text-sm text-justify">
              Olá gostaria de fazer uma proposta de orçamento para o
              fornecimento dos produtos acima, tenho uma festa para dar e
              gostaria de negociar um valor amigvel para os cappuccinos e
              frappuccinos.
            </p>
          </div>

          <div className="mt-2 flex flex-row gap-12 mobile:flex-col mobile:gap-2">
            <Link to="/dashboard/budget/create-proposal">
              <button className="flex flex-row items-center justify-center gap-5 w-[9.25rem] h-12 rounded bg-blue-600 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300">
                <span>Criar proposta</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
