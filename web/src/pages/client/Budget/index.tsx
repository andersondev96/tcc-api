import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineSearch } from "react-icons/ai"
import { Header } from "../../../components/Header"
import { Table } from "../../../components/Table"
import { TableHead } from "../../../components/Table/TableHead";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody"
import { TableData } from "../../../components/Table/TableData"
import { PaginationTable } from "../../../components/PaginationTable";
import { Link, useNavigate } from "react-router-dom";

export const Budget: React.FC = () => {
  const navigate = useNavigate();
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
              <TableHead>
                <TableRowHead>
                  <TableHeader>Data</TableHeader>
                  <TableHeader>Empresa</TableHeader>
                  <TableHeader>Objetivo do serviço</TableHeader>
                  <TableHeader>Prazo</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader></TableHeader>
                </TableRowHead>
              </TableHead>
              <TableBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>Sightglass coffee</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/04/2022</TableData>
                  <TableData>Finalizada</TableData>
                  <TableData>
                    <Link to="/budget/details">
                      <AiOutlineEye size={24} color="#547DE5" />
                    </Link>
                  </TableData>
                </TableRowBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>Sightglass coffee</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/04/2022</TableData>
                  <TableData>Finalizada</TableData>
                  <TableData>
                    <Link to="/budget/details">
                      <AiOutlineEye size={24} color="#547DE5" />
                    </Link>
                  </TableData>
                </TableRowBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>Sightglass coffee</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/04/2022</TableData>
                  <TableData>Finalizada</TableData>
                  <TableData>
                    <Link to="/budget/details">
                      <AiOutlineEye size={24} color="#547DE5" />
                    </Link>
                  </TableData>
                </TableRowBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>Sightglass coffee</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/04/2022</TableData>
                  <TableData>Finalizada</TableData>
                  <TableData>
                    <Link to="/budget/details">
                      <AiOutlineEye size={24} color="#547DE5" />
                    </Link>
                  </TableData>
                </TableRowBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>Sightglass coffee</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/04/2022</TableData>
                  <TableData>Finalizada</TableData>
                  <TableData>
                    <Link to="/budget/details">
                      <AiOutlineEye size={24} color="#547DE5" />
                    </Link>
                  </TableData>
                </TableRowBody>
              </TableBody>
            </Table>

            <PaginationTable />

          </div>
        </div>
      </div>
    </div>
  )
}