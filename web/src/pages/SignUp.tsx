import { Link, useNavigate } from 'react-router-dom';
import { ImArrowLeft } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { FiSave } from 'react-icons/fi';
import { Input } from '../components/Input';
import Banner from '../assets/image_onboarding.png';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-row sm:flex-col justify-between sm:justify-start min-h-screen sm:w-screen">
      <div className="flex w-1/2 h-screen sm:h-48 sm:w-full">
        <img
          src={Banner}
          alt="Banner"
          className="w-screen object-cover border-r-4 border-gray-300 sm:border-none"
        />
      </div>
      <div className="flex flex-col items-center sm:items-start justify-center w-1/2 bg-blue-900 sm:bg-white sm:w-screen">
        <Link 
          className="sm:hidden"
          to="/" 
        >
          <div className="flex flex-row items-center gap-2">
            <ImArrowLeft color="#FFFFFF" />
            <span className="font-montserrat text-white tex-sm">Voltar</span>
          </div>
        </Link>
        <div className="flex flex-col bg-white h-[34.188rem] w-[28.5rem] rounded mt-4 sm:mt-0">
          <div className="flex items-center p-8 h-[4.125rem] w-full sm:w-screen rounded-t sm:rounded-none bg-indigo-600">
            <span className="font-inter font-medium uppercase text-white text-2xl">
              Cadastrar
            </span>
          </div>

          <div className="flex flex-col mt-8">
            <form className="flex flex-col items-center gap-2">
              <Input
                name="name"
                label="Nome"
                placeholder="Digite o seu nome"
              />
              <Input
                name="email"
                label="E-mail"
                placeholder="Digite o seu e-mail"
              />
              <Input
                name="password"
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
              />
              <Input
                name="confirm_password"
                label="Confirmar a senha"
                type="password"
                placeholder="Digite a sua senha"
              />

              <button
                className="flex items-center justify-center mt-6 gap-3 bg-indigo-400 w-40 h-12 rounded hover:brightness-90 transition-opacity"
              >
                <FiSave size={24} color="#FFFFFF" />
                <span
                  className="font-inter text-lg text-white uppercase"
                >
                  Salvar
                </span>
              </button>
            </form>


            <div className="flex flex-row items-center gap-[0.938rem] px-[3.875rem] mt-8 cursor-pointer hover:brightness-90">
              <FcGoogle size={24} />
              <span className="font-montserrat font-semibold text-sm">Cadastrar com o Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
