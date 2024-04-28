import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TextInputMask} from 'react-native-masked-text';
import {format} from 'date-fns';
import {deleteProduct, getAllProducts} from '../../services/service';
import {Button} from '../../components';
import {RootStackParamList} from '../../../App';

type HomeProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({navigation}: HomeProps) => {
  const [products, setProducts] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectProductName, setSelectProductName] = useState('');
  const [searchText, setSearchText] = useState<string>('');
  const [productsSearched, setProductsSearched] = useState<any>([]);

  useEffect(() => {
    const handleProducts = async () => {
      const data = await getAllProducts();
      if (data) {
        setProducts(data.data);
      }
      setProductsSearched(data.data);
    };
    handleProducts();
  }, []);

  const formattedDate = (data: string) => {
    return format(new Date(data), 'dd/MM/yyyy');
  };

  const handleSendToEdit = (product: any) => {
    navigation.navigate('Editar', {
      body: product,
    });
  };

  const handleSendToAdd = () => {
    navigation.navigate('Adicionar');
  };

  const handleDeleteItem = (id: string) => {
    deleteProduct(id);
    setShowDeleteModal(false);
  };

  const handleOpenDeleteModal = (id: string, productName: string) => {
    handleDeleteItem(id);
    setSelectProductName(productName);
    setShowDeleteModal(true);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (text === '') {
      setProductsSearched(products);
    }
    setProductsSearched(filteredProducts);
  };

  return (
    <>
      <View
        style={{
          padding: 10,
        }}>
        <View style={styles.header}>
          <Text style={{fontSize: 20}}>{products.length} Produtos</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Buscar Produto"
            onChangeText={text => handleSearch(text)}></TextInput>
          <TouchableOpacity onPress={() => handleSendToAdd()}>
            <Image
              source={require('../../assets/images/addButton.png')}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{borderBlockColor: 'black'}}
          data={productsSearched}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  padding: 10,
                }}>
                <View style={styles.container}>
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity onPress={() => handleSendToEdit(item)}>
                      <View>
                        <Image
                          style={{width: 150, height: 150}}
                          source={{
                            uri: `data:image/${item.image.extension};base64,${item.image.file}`,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleOpenDeleteModal(item.id, item.name)}
                      style={{position: 'absolute', top: 0, right: 0}}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={require('../../assets/images/trash.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleSendToEdit(item)}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.label}>Preço</Text>

                    <TextInputMask
                      style={styles.values}
                      type={'money'}
                      placeholder={'R$ ' + item.price}
                      options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: '',
                      }}
                      value={'R$ ' + item.price}
                    />
                    <Text style={styles.label}>Data da Venda:</Text>
                    <Text style={styles.values}>
                      {formattedDate(item.sale_date)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.containerModal}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{marginBottom: 20}}>
              Tem certeza que deseja excluir {selectProductName}?
            </Text>
            <Button
              placeHolder="Cancelar"
              onClick={() => setShowDeleteModal(false)}
            />
            <Button placeHolder="Excluir" onClick={() => handleDeleteItem} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D9D8DA',
    padding: 5,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  title: {color: '#3E3A40', fontWeight: 'bold', width: 150},
  label: {
    color: '#5F5B62',
  },
  values: {color: '#3E3A40', fontWeight: 'bold', padding: 0},
  itemEmpty: {
    backgroundColor: 'transparent',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
  },
  containerInput: {
    display: 'flex',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,

    paddingHorizontal: 10,
    width: 300,
    flex: 1,
  },
});

export default HomeScreen;
