import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AdminProductsContext } from '../../services/admin-products-context';
import Dropdown from '../../components/ui/Dropdown';
import { ModalContext } from '../../services/modal-context';
import ModalView from '../../components/ui/ModalView';

const CreateProductScreen = ({ navigation }) => {

  const { categories ,setIsLoading, isLoading, createProduct, setProducts } = useContext(AdminProductsContext);
  const { openModalHandler, setMessage, setNavigationLocation, setAnimationName } = useContext(ModalContext);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleErrors, setTitleErrors] = useState();
  const [imageErrors, setImageErrors] = useState();
  const [categoryErrors, setCategoryErrors] = useState();
  const [priceErrors, setPriceErrors] = useState();
  const [titleInput, setTitleInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const categoriesData = categories.map((cat, index) => ({ label: cat.title, value: index.toString() }));

  const titleChangingHandler = (typedTitle) => {
    setTitleInput(typedTitle);
  }

  const imageChangingHandler = (typedImage) => {
    setImageInput(typedImage);
  }

  const priceChangingHandler = (typedPrice) => {
    setPriceInput(typedPrice);
  }

  const checkTitleIsValid = () => {
    if(titleInput.trim().length < 2){
      setIsTitleValid(false);
      setTitleErrors('Please enter a valid title');
    } else {
      setIsTitleValid(true);
      setTitleErrors(null);
    }
  }

  const checkImageIsValid = () => {
    if(!imageInput.startsWith('http')){
      setIsImageValid(false);
      setImageErrors('Please enter a valid url');
    } else {
      setIsImageValid(true);
      setImageErrors(null)
    }
  }

  const checkPriceIsValid = () => {
    if(priceInput.trim().length === 0){
        setIsPriceValid(false);
        setPriceErrors('Please enter a valid price');
    } else {
        setIsPriceValid(true);
        setPriceErrors(null);
    }
  }

  const createProductHandler = async () => {
    if(!categoryInput || categoryInput.length === 0){
        setIsCategoryValid(false);
        setCategoryErrors('Please select a category')
        return;
    }
    setIsLoading(true);
    try {
      const data = await createProduct(titleInput, priceInput, categoryInput, imageInput);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'title'){
            setTitleErrors(i.message);
            setIsTitleValid(false);
          } else if(i.type === 'image'){
            setImageErrors(i.message);
            setIsImageValid(false);
          } else if(i.type === 'price'){
            setPriceErrors(i.message);
            setIsPriceValid(false);
          } else if(i.type === 'category'){
            setCategoryErrors(i.message);
            setIsCategoryValid(false);
          }
        }
      } else {
        setProducts(prevProducts => [...prevProducts, { id: data.id, title: data.title, image: data.image, category: data.category, price: data.price, isDiscount: data.isDiscount, isFinished: data.isFinished, newPrice: data.newPrice, createdAt: data.createdAt }])
        setNavigationLocation('AdminHome');
        setMessage('Your product has been created Successfully');
        setAnimationName(require('../../assets/animations/purple-tick.json'));
        openModalHandler();
      }
    } catch (err) {
      console.log(err);
      console.log('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ModalView></ModalView>
      <Text style={styles.title}>Create a New Product</Text>
      <View style={styles.inputContainer}>
        <Input label='Product title' onCheckValidity={checkTitleIsValid} onInputChange={titleChangingHandler} errors={titleErrors} inputIsValid={isTitleValid} autoCapitalize='words' autoComplete='name' autoCorrect={true} keyboardType='default' placeholder='Title' type='title'></Input>
        <Input label='Image url' onCheckValidity={checkImageIsValid} onInputChange={imageChangingHandler} errors={imageErrors} inputIsValid={isImageValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='url' placeholder='Image URL' type='image'></Input>
        {imageInput.length > 0 && <Image style={styles.imagePreview} source={{ uri: imageInput }}></Image>}
        <Text style={styles.label}>Category</Text>
        <Dropdown isValid={isCategoryValid} error={categoryErrors} label='Select category' data={categoriesData} onSelect={setCategoryInput}></Dropdown>
        <Input label='Price' onCheckValidity={checkPriceIsValid} onInputChange={priceChangingHandler} errors={priceErrors} inputIsValid={isPriceValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='phone-pad' placeholder='Price' type='price'></Input>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={createProductHandler} style={styles.button}>Create Product</Button>}
        {isLoading && <ActivityIndicator></ActivityIndicator>}
      </View>
    </ScrollView>
  )
}

export default CreateProductScreen;

const styles = StyleSheet.create({
  button: {
    width: '75%',
  },
  buttonContainer: {
    marginVertical: 12,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flex: 1,
    width: '100%',
  },
  googleAuthentication: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: 'white'
  },
  imagePreview: {
    marginTop: 12,
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 26,
    width: '90%',
    alignSelf: 'center'
  },
  label: {
    alignSelf: 'flex-start',
    marginVertical: 6,
    fontFamily: styling.fontFamily.gobold,
    fontSize: styling.fontSize.regular,
    color: styling.color.primary700
},
  loginText: {
    fontSize: 16,
    fontFamily: styling.fontFamily.gobold,
    color: styling.color.primary400
  },
  orText: {
    fontSize: styling.fontSize.title,
    fontWeight: 'bold',
    marginVertical: 10
  },
  text: {
    alignSelf: 'flex-end',
    fontSize: styling.fontSize.smallTitle,
    color: styling.color.primary500,
    fontWeight: 'bold'
  },
  title: {
    color: styling.color.primary400,
    fontSize: styling.fontSize.largeTitle,
    fontFamily: styling.fontFamily.goboldBold,
    textAlign: 'left',
    marginBottom: 40,
  }
})