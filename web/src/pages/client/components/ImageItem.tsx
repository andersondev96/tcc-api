import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Coffee1 from "../../../assets/coffee-img1.jpg"

export const ImageItem: React.FC = () => {
  const [itemSelected, setItemSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-row items-end">
      <img
        src={Coffee1}
        alt="Coffee1"
        className={`w-16 h-16 object-fill rounded border-4 cursor-pointer ${itemSelected ? 'border-blue-400' : 'border-transparent'}`}
        onClick={() => setItemSelected(!itemSelected)}
      />
     {/*  {itemSelected ? (
        <div className="absolute flex flex-col items-center justify-between h-8 w-8 bg-indigo-200 rounded-full ml-12 mb-1">
          <FiChevronUp size={12} color="#FFFFFF" onClick={() => setQuantity(quantity + 1)} />
          <span className="font-inter font-medium text-xs text-white">{quantity}</span>
          <FiChevronDown size={12} color="#FFFFFF" onClick={() => setQuantity(quantity - 1)} />
        </div>
      ) : ''} */}
    </div>
  );
}