import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '../../components';
import {RootStackParamList} from '../../../App';
import {setEditProduct} from '../../services/service';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type FormProps = NativeStackScreenProps<RootStackParamList, 'Editar'>;

const EditScreen = ({route}: FormProps) => {
  const {body} = route.params;

  const [product, setProduct] = useState<any>([]);
  const [productNewImage, setproductNewImage] = useState('');

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  useEffect(() => {
    const handleProducts = async () => {
      if (body) {
        setProduct(body);
      }
    };
    handleProducts();
  }, [body]);

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
      id: product.id,
      name: product.name,
      image: product.image.file,
      price: product.price,
      sale_date: product.sale_date,
      idCandidato: 1784,
    };
    setEditProduct(jsonToApi);
  };

  const handleOpenLibrary = async () => {
    const newImage = await launchImageLibrary(options);
    if (newImage?.assets) {
      setproductNewImage(newImage.assets[0].uri!);
    }
  };
  const handleOpenCamera = async () => {
    const newImage = await launchCamera(options);
    if (newImage?.assets) {
      setproductNewImage(newImage.assets[0].uri!);
    }
  };

  return (
    <>
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
            Editar Produto
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
        <Text style={styles.item}>Data da Venda:</Text>
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
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity onPress={() => handleOpenLibrary()}>
                <Image source={require('../../assets/images/anexo1.png')} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleOpenCamera()}>
                <Image source={require('../../assets/images/anexo2.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {productNewImage ? (
          <Image
            source={{
              uri: productNewImage,
            }}
            style={{alignSelf: 'center', width: 340, height: 260}}
          />
        ) : product.image ? (
          <Image
            source={{
              uri: `data:image/${product.image.extension};base64,${product.image.file}`,
            }}
            style={{alignSelf: 'center', width: 340, height: 260}}
          />
        ) : (
          <Image
            source={require('../../assets/images/anexo3.png')}
            style={{alignSelf: 'center', width: 340, height: 260}}
          />
        )}
        <Button
          placeHolder="Editar produto"
          onClick={() => handleSendEditProduct()}></Button>
      </ScrollView>
    </>
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

export default EditScreen;
