import  MapImg  from "../../assets/mapa.png";
import { Map } from "../../components/Map";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-8 bg-blue-400 min-h-screen min-w-[22.125rem] py-[6.25rem] px-[3.125rem]">
        <div className="flex flex-col gap-4">
          <label 
            htmlFor="category" 
            className="font-montserrat font-medium text-lg text-white"
            >
              Categoria do negócio
            </label>
          <select 
            name="" 
            id=""
            className="h-[2.75rem] px-[1.25rem] rounded border-none outline-none"
          >
            <option value="" selected>Selecione uma opção</option>
            <option value="">Cafeteria</option>
            <option value="">Sorveteria</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label 
            htmlFor="price" 
            className="font-montserrat font-medium text-lg text-white"
          >
            Faixa de preço
          </label>
          <input id="default-range" type="range" value="50" className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

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
