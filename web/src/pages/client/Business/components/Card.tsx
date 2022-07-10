import { useState } from "react";
import { AssessmentsStars } from "./AssessmentsStars";
import { ModalContainer } from "../../../../components/ModalContainer"
import Coffee1 from "../../../../assets/coffee-img1.jpg";

import { AiFillHeart, AiOutlineCloseCircle } from "react-icons/ai";
import { ButtonAction } from "./ButtonAction";
import { Assessments } from "./Assessments";
import { AssessmentsForm } from "./AssessmentsForm";

interface CardProps {
  image: string;
  product: string;
  stars: number;
  price: string;
}

export const Card: React.FC<CardProps> = ({ image, product, stars, price }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const [displayHeart, setDisplayHeart] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <div
      className="flex flex-row items-center w-[20rem] mobile:w-[16rem] h-20 bg-gray-400  rounded"
      onMouseOver={!like ? () => setDisplayHeart(true) : () => { }}
      onMouseLeave={!like ? () => setDisplayHeart(false) : () => { }}
    >
      <img src={image} alt={product} className="h-20 w-20 rounded-l" />
      <div className="flex flex-col">
        <div className="absolute flex flex-row ml-52 mt-3 mobile:ml-36">
          {displayHeart ? (
            <AiFillHeart
              size={16}
              onClick={() => setLike(!like)}
              className="cursor-pointer"
              color={`${like ? '#FF0000' : '#FFFFFF'}`}
            />
          ) : ''}
        </div>

        <div className="flex flex-col justify-center py-2 px-3  w-full cursor-pointer" onClick={openModal}>
          <div className="flex flex-row justify-between">
            <span className="font-montserrat font-semibold mb-1 mobile:text-sm">{product}</span>
          </div>
          <AssessmentsStars stars={stars} />
          <span className="font-inter font-semibold text-sm mobile:text-xs mt-2 text-amber-900">{price}</span>
        </div>
      </div>

      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div>
          
          <div className="flex flex-row items-center gap-[6.25rem] px-[3.125rem] py-[7.75rem] h-[8.875rem] bg-gray-200 border-b-2 border-gray-500">
            <img src={Coffee1} alt="Coffee1" className="w-[6.25rem] h-[6.25rem] object-fill rounded-full" />
            <div className="flex flex-col gap-[0.25rem]">
              <span className="font-inter font-medium text-[1.75rem]">Café simples</span>
              <AssessmentsStars stars={3} />
              <span className="font-inter font-semibold text-amber-900 text-2xl">R$ 2,00</span>
            </div>
          </div>
          <div className="px-12 py-12 flex flex-col">
            <div className="flex flex-col gap-2">
              <span className="font-inter font-semibold text-lg">Descrição</span>
              <p className="font-inter font-light text-lg">Café com açúcar saboroso preparado pela casa. <br />
                Quantidade: 200 ml
              </p>
              <div className="mt-6 flex flex-row gap-[2.75rem]">
                <ButtonAction type="favorite" />
                <ButtonAction type="calculate" />
              </div>
            </div>
            <div className="mt-[2.25rem] flex flex-col">
              <div className="flex flex-col gap-[0.375rem]">
                <span className="font-inter font-semibold">Avaliações</span>
                <p className="font-inter font-light text-xs">4 comentários</p>
              </div>
              <Assessments text="Ótimo café" stars={3} />
              <Assessments text="Muito bom este café" stars={4} />
              <Assessments text="Café saboroso" stars={5} />
            </div>

            <div className="mt-8">
              <AssessmentsForm />
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  )
}