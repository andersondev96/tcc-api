import { AssessmentsStars } from "./AssessmentsStars";


import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";

interface CardProps {
  image: string;
  product: string;
  stars: number;
  price: string;
}

export const Card: React.FC<CardProps> = ({ image, product, stars, price}) => {
  const [displayHeart, setDisplayHeart] = useState(false);
  const [like, setLike] = useState(false);

  console.log(displayHeart);

  return (
    <div 
      className="flex flex-row items-center w-[20rem] mobile:w-[16rem] h-20 bg-gray-400  rounded" 
      onMouseOver={!like ? () => setDisplayHeart(true) :  () => {}}
      onMouseLeave={!like ? () => setDisplayHeart(false) : () => {}}
      >
      <img src={image} alt={product} className="h-20 w-20 rounded-l" />
      <div className="flex flex-col justify-center py-2 px-3  w-full">
        <div className="flex flex-row justify-between">
        <span className="font-montserrat font-semibold mb-1 mobile:text-sm">{product}</span>
         { displayHeart ? (
           <AiFillHeart 
            size={16} 
            onClick={() => setLike(!like)}
            className="cursor-pointer"
            color={`${like ? '#FF0000' : '#FFFFFF'}`} 
          />
         ) : ''}
        </div>
        <AssessmentsStars stars={stars} />
        <span className="font-inter font-semibold text-sm mobile:text-xs mt-2 text-amber-900">{price}</span>
      </div>
    </div>
  )
}