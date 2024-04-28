import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import ImagePicker, {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {setSaveProduct} from '../../services/service';
import {TextInputMask} from 'react-native-masked-text';
import {Button} from '../../components';

const AddScreen = () => {
  const [product, setProduct] = useState<any>([]);
  const [imgNewProduct, setimgNewProduct] = useState('');

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const handleNameChange = (value: any) => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      name: value,
    }));
  };
  const handleValorChange = (value: any) => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      price: value,
    }));
  };

  const handleDataChange = (value: any) => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      sale_date: value,
    }));
  };

  const handleSendEditProduct = () => {
    const jsonToApi = {
      name: product.name,
      file: imgNewProduct,
      price: product.price,
      sale_date: product.sale_date,
      idCandidato: 1784,
    };
    setSaveProduct(jsonToApi);
  };

  const handleOpenLibrary = async () => {
    const newImage = await launchImageLibrary(options);
    if (newImage?.assets) {
      setimgNewProduct(newImage.assets[0].uri!);
    }
  };

  const handleOpenCamera = async () => {
    const newImage = await launchCamera(options);

    if (newImage?.assets) {
      setimgNewProduct(newImage.assets[0].uri!);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Adicionar produto
        </Text>
      </View>
      <Text style={styles.item}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder={product.name}
        value={product.name}
        onChangeText={handleNameChange}
      />
      <Text style={styles.item}>Valor do Produto</Text>
      <TextInputMask
        style={styles.input}
        type={'money'}
        placeholder={'R$ ' + product.price}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: '',
        }}
        value={product.price}
        onChangeText={handleValorChange}
      />
      <Text style={styles.item}>Data de venda</Text>
      <TextInputMask
        style={styles.input}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={product.sale_date}
        onChangeText={handleDataChange}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#3E3A40', fontWeight: '700'}}>
          Foto do produto
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={() => handleOpenLibrary()}>
            <Image source={require('../../assets/images/anexo1.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOpenCamera()}>
            <Image source={require('../../assets/images/anexo2.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {imgNewProduct ? (
        <Image
          source={{uri: imgNewProduct}}
          style={{alignSelf: 'center', width: 340, height: 260}}
        />
      ) : (
        <Image
          source={require('../../assets/images/anexo3.png')}
          style={{alignSelf: 'center', width: 340, height: 260}}
        />
      )}

      <Button
        placeHolder="Adicionar produto"
        onClick={() => handleSendEditProduct()}></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    color: '#3E3A40',
    fontWeight: '700',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default AddScreen;
