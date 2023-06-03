import axios from "axios";

interface IAddress {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
}

export async function getCEP(cep: string): Promise<IAddress | undefined> {
  const endpoint = `https://viacep.com.br/ws/${cep}/json`;

  const response = await axios.get(endpoint);
  const data = response.data;

  if (response.status === 200) {
    return {
      cep: data.cep,
      street: data.logradouro,
      district: data.bairro,
      state: data.uf,
      city: data.localidade
    };
  } else {
    return undefined;
  }
};