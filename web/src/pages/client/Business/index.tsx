import { Header } from "../../../components/Header";
import { BusinessHeader } from './components/BusinessHeader';
import { Paragraph } from "./components/Paragraph";

export const Business: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <BusinessHeader />
      <div className="px-[6.25rem] py-[2.625rem] mobile:px-[3.125rem] mobile:py-[1.75rem]">
        <div className="flex flex-col gap-8 mobile:gap-4">
          <Paragraph
            title="Sobre o negócio"
            text="Estamos a começar a temporada com a nossa mistura de Solstício de Verão. Uma celebração de longos dias, tempo quente e um pouco de R&amp;R extra. É suculento, doce e delicioso quente ou gelado.
            Obtemos e assados este blend para produzir um espectro de sabores que entrega uma experiência animada e refinada no copo."
          />

          <Paragraph
            title="Serviços oferecidos"
            text="Café"
          />

          <Paragraph
            title="Endereço"
            text="Mission District 3014 20th Street, SF, CA, 94110"
          />

          <div className="flex flex-col gap-2">
            <span className="font-inter font-semibold text-gray-700">
              Horários de funcionamento
            </span>
            <div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Seg à Sex:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 17:00</p>
              </div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Sáb:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 19:00</p>
              </div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Dom:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 21:00</p>
              </div>
            </div>
          </div>

          <Paragraph
            title="Telefone"
            text="+1 415-861-1313"
        />
        </div>

        

      </div>
    </div>
  )
}