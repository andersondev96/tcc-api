import Banner from '../assets/image_onboarding.png';

export const Welcome: React.FC = () => {

  return (
    <div className="flex flex-row sm:flex-col justify-between min-h-screen sm:w-screen gap-[3.25rem] sm:gap-0">
      <div className="flex w-1/2 h-screen sm:h-full sm:w-full">
        <img
          src={Banner}
          alt="Banner"
          className="sm:h-32 w-screen object-cover border-r-4 border-gray-300 sm:border-none"
        />
      </div>
      <div className="flex flex-col align-center justify-center w-1/2 sm:w-screen p-4">
        <div className="flex align-center justify-center mt-[1.125rem]">
          <h1
            className="font-inter font-extrabold text-[2.6rem] sm:text-3xl text-blue-800 leading-tight uppercase text-center"
          >
            Faça um bom <br />
            negócio <br />
            e ajude um <br />
            pequeno <br />
            empreendedor
          </h1>
        </div>
        
          <div className="grid grid-rows-1 sm:grid-rows-3 sm:justify-center grid-flow-col gap-4 mt-[4.75rem] sm:mt-[2.5rem]">
            <span
              className="flex items-center justify-center rounded p-2 min-h-12 w-[12.75rem] bg-indigo-600 text-white font-inter text-sm text-center"
            >
              + 200 vendas realizadas
            </span>

            <span
              className="flex items-center justify-center rounded p-2 min-h-12 w-[12.75rem] bg-indigo-600 text-white font-inter text-sm text-center"
            >
              + 400 compradores
            </span>

            <span
              className="flex items-center justify-center rounded p-2 min-h-12 w-[12.75rem] bg-indigo-600 text-white font-inter text-sm text-center"
            >
              + 50 empreendedores cadastrados
            </span>
        </div>

        <div className="flex flex-row items-center justify-center mt-28 sm:mt-12 gap-16 sm:gap-10">
          <button 
            className="bg-indigo-400 w-36 h-12 rounded font-inter text-lg text-white hover:bg-white hover:border hover: border-indigo-400 hover:text-indigo-400 transition-colors"
          >
            Entrar
          </button>
          <button 
            className="border border-blue-400 w-36 h-12 rounded font-inter text-lg text-indigo-400 hover:bg-indigo-400 hover:text-white transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}
