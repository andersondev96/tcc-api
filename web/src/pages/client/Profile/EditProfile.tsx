import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { Header } from "../../../components/Header"

export const EditProfile: React.FC = () => {
  return (
    <div>
      <Header />

      <button className="p-12 pb-0 flex flex-row items-center gap-2 font-montserrat font-semibold text-sm text-indigo-400">
        <AiOutlineArrowLeft />
        <span>Voltar</span>
      </button>

      <div className="flex flex-col items-center p-[6.25rem]">
        <h1 className="font-montserrat font-medium text-2xl">Editar perfil</h1>

        <div className="mt-16">
          <div>
            <input type="file" name="" id="" />
          </div>
          <div className="mt-16 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Nome</label>
              <input
                type="text"
                placeholder="John Silva"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                placeholder="john@example.com"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Telefone</label>
              <input
                type="text"
                placeholder="(31) 99999-99999"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">CPF</label>
              <input
                type="text"
                placeholder="999.999.999-99"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Senha atual</label>
              <input
                type="text"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Nova senha</label>
              <input
                type="text"
                className="border rounded bg-gray-200 font-montserrat font-light text-sm"
              />
            </div>

            <div className="mt-4 flex flex-row items-center justify-center">
            <button
              className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-2xl text-white uppercase hover:brightness-90 transition-colors"
            >
              <FiSave />
              Salvar
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}