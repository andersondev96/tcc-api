import { FiSend } from "react-icons/fi";
import Coffee1 from '../../../assets/coffee-img1.jpg';
import UserAvatar from '../../../assets/avatar.jpg';

export const ModalChat: React.FC = () => {
  return (
    <div className="flex flex-col h-full justify-between px-[3.125rem] py-[4rem]">
      <div className="flex flex-col gap-[2.25rem] mt-5 p-[1.875rem] w-[48.75rem] h-[24.625rem] border border-gray-400 rounded overflow-auto">
        <div className="flex flex-row items-center gap-5">
          <img src={Coffee1} alt="" className="h-9 w-9 object-fill rounded-full"/>
          <div className="flex items-center p-[0.938rem] w-[22.5rem] h-full bg-gray-300 rounded">
            <span className="font-montserrat text-sm">Olá, em que posso ajudar?</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">
          <img src={UserAvatar} alt="" className="h-9 w-9 object-fill rounded-full"/>
          <div className="flex items-center p-[0.938rem] w-[22.5rem] h-full bg-blue-200 rounded">
            <span className="font-montserrat text-sm">
              Gostaria de saber informações de um certo serviço que vocês oferecem para os clientes.
              </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">
          <img src={Coffee1} alt="" className="h-9 w-9 object-fill rounded-full"/>
          <div className="flex items-center p-[0.938rem] w-[22.5rem] h-full bg-gray-300 rounded">
            <span className="font-montserrat text-sm">Entendi, você já conhece os nossos serviços?</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">
          <img src={UserAvatar} alt="" className="h-9 w-9 object-fill rounded-full"/>
          <div className="flex items-center p-[0.938rem] w-[22.5rem] h-9 bg-blue-200 rounded">
            <span className="font-montserrat text-sm">Conheço sim</span>
          </div>
        </div>

      </div>
      
      <div className="flex flex-row items-center justify-between">
          <textarea 
            className="w-[48.75rem] pr-14 rounded resize-none bg-gray-300 border-none font-montserrat text-sm" 
            placeholder="Digite a sua mensagem aqui"  
          />
          <button className="flex absolute ml-[45.75rem]">
          <FiSend size={32} color="#08A358" className="" />
          </button>
      </div>
    </div>
  );
}