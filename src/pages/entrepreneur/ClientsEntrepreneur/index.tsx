import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { Table } from "../../../components/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { TableHead } from "../../../components/Table/TableHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";

export const ClientsEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
          <h1 className="font-montserrat font-medium text-2xl">Clientes</h1>
        </div>
        <div className="flex flex-col p-12">
          <Search />
          <Table>
            <TableHead>
              <TableRowHead>
                <TableHeader>Nome</TableHeader>
                <TableHeader>E-mail</TableHeader>
                <TableHeader>Telefone</TableHeader>
              </TableRowHead>
            </TableHead>
            <TableBody>
              <TableRowBody>
                <TableData>João Pedro Xavier</TableData>
                <TableData>joao.xavier@gmail.com</TableData>
                <TableData>(99) 99999-9999</TableData>
              </TableRowBody>
              <TableRowBody>
                <TableData>João Pedro Xavier</TableData>
                <TableData>joao.xavier@gmail.com</TableData>
                <TableData>(99) 99999-9999</TableData>
              </TableRowBody>
              <TableRowBody>
                <TableData>João Pedro Xavier</TableData>
                <TableData>joao.xavier@gmail.com</TableData>
                <TableData>(99) 99999-9999</TableData>
              </TableRowBody>
              <TableRowBody>
                <TableData>João Pedro Xavier</TableData>
                <TableData>joao.xavier@gmail.com</TableData>
                <TableData>(99) 99999-9999</TableData>
              </TableRowBody>
              <TableRowBody>
                <TableData>João Pedro Xavier</TableData>
                <TableData>joao.xavier@gmail.com</TableData>
                <TableData>(99) 99999-9999</TableData>
              </TableRowBody>
            </TableBody>
          </Table>

          <PaginationTable />
        </div>
      </div>
    </div>
  );
};
