import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineSearch } from "react-icons/ai"
import { Header } from "../../../components/Header"
import { Table } from "../../../components/Table"
import { Tbody } from "../../../components/Table/Tbody"
import { Td } from "../../../components/Table/Td"
import { Th } from "../../../components/Table/Th"
import { Thead } from "../../../components/Table/Thead"
import { Tr } from "../../../components/Table/Tr"

export const Budget: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col p-12">
        <button className="pb-0 flex flex-row items-center gap-2 font-montserrat font-semibold text-sm text-indigo-400">
          <AiOutlineArrowLeft />
          <span>Voltar</span>
        </button>
        <div className="flex flex-col">
          <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
            <h1 className="font-montserrat font-medium text-2xl">Meus orçamentos</h1>
          </div>
          <div className="flex flex-col">
            <div className="mt-2 flex flex-row mobile:mt-[1rem]">
              <input
                className="border-none bg-gray-300 font-inter rounded-l font-light text-xl px-8 py-4 w-[20rem] h-[3rem] mobile:w-[12rem] mobile:h-[2.5rem] mobile:text-sm"
                type="text"
                placeholder="Pesquisar"
              />
              <button className="h-[3rem] w-[3rem] bg-gray-300 flex flex-row items-center justify-center rounded-r border-l border-black hover:opacity-80 transition-opacity mobile:w-[2.5rem] mobile:h-[2.5rem]">
                <AiOutlineSearch size={24} color="#393737" />
              </button>
            </div>

            <Table>
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Empresa</Th>
                  <Th>Objetivo do serviço</Th>
                  <Th>Prazo</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>04/07/2022</Td>
                  <Td>Sightglass coffee</Td>
                  <Td>Cappuccino para festa</Td>
                  <Td>12/04/2022</Td>
                  <Td>Finalizada</Td>
                  <Td>
                    <AiOutlineEye size={24} color="#547DE5" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>04/07/2022</Td>
                  <Td>Sightglass coffee</Td>
                  <Td>Cappuccino para festa</Td>
                  <Td>12/04/2022</Td>
                  <Td>Finalizada</Td>
                  <Td>
                    <AiOutlineEye size={24} color="#547DE5" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>04/07/2022</Td>
                  <Td>Sightglass coffee</Td>
                  <Td>Cappuccino para festa</Td>
                  <Td>12/04/2022</Td>
                  <Td>Finalizada</Td>
                  <Td>
                    <AiOutlineEye size={24} color="#547DE5" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>04/07/2022</Td>
                  <Td>Sightglass coffee</Td>
                  <Td>Cappuccino para festa</Td>
                  <Td>12/04/2022</Td>
                  <Td>Finalizada</Td>
                  <Td>
                    <AiOutlineEye size={24} color="#547DE5" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>04/07/2022</Td>
                  <Td>Sightglass coffee</Td>
                  <Td>Cappuccino para festa</Td>
                  <Td>12/04/2022</Td>
                  <Td>Finalizada</Td>
                  <Td>
                    <AiOutlineEye size={24} color="#547DE5" />
                  </Td>
                </Tr>
              </Tbody>
            </Table>

          </div>
        </div>
      </div>
    </div>
  )
}