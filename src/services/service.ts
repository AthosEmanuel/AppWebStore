import axios from 'axios';

export interface ProductsProps {
  id?: string;
  image?: {
    extension: string;
    file: string;
  };
  name: string;
  sale_date: string;
  price: string;
  file?: string;
}

const IdApi = 1784;

const getAllProducts = async () => {
  try {
    const {data} = await axios.get(
      `https://remopt.dnsalias.com/teste/API/getAllProducts.php?idcandidato=${IdApi}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (id: string) => {
  try {
    const {data} = await axios.get(
      `https://remopt.dnsalias.com/teste/API/getProductById.php?idcandidato=${IdApi}&idproduto=${id}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const setSaveProduct = async (body: ProductsProps) => {
  try {
    await axios.post(
      'https://remopt.dnsalias.com/teste/API/saveProduct.php',
      body,
    );
  } catch (error) {
    console.error(error);
  }
};

const setEditProduct = async (body: ProductsProps) => {
  try {
    await axios.post(
      'https://remopt.dnsalias.com/teste/API/setEditProduct.php',
      body,
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id: string) => {
  try {
    await axios.delete(
      `https://remopt.dnsalias.com/teste/API/deleteProduct.php?idcandidato=${IdApi}&idproduto=${id}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllProducts,
  getProductById,
  setSaveProduct,
  setEditProduct,
  deleteProduct,
};
