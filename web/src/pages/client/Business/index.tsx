import { Header } from "../../../components/Header";
import { BusinessHeader } from './components/BusinessHeader';

export const Business: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <BusinessHeader />
    </div>
  )
}