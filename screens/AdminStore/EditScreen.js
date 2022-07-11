import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AdminProductsContext } from '../../services/admin-products-context';
import Dropdown from '../../components/ui/Dropdown';
import { Ionicons } from '@expo/vector-icons'
import { ModalContext } from '../../services/modal-context';
import ModalView from '../../components/ui/ModalView';

const EditScreen = ({ navigation, route }) => {

  const { products ,setIsLoading, isLoading, editProduct, deleteProduct, setProducts } = useContext(AdminProductsContext);
  const { openModalHandler, setMessage, setNavigationLocation, setAnimationName } = useContext(ModalContext);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDiscountValid, setIsDiscountValid] = useState(true);
  const [isFinishedValid, setIsFinishedValid] = useState(true);
  const [isNewPriceValid, setIsNewPriceValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleErrors, setTitleErrors] = useState();
  const [discountErrors, setDiscountErrors] = useState();
  const [finishedErrors, setFinishedErrors] = useState();
  const [newPriceErrors, setNewPriceErrors] = useState();
  const [titleInput, setTitleInput] = useState('');
  const [isDiscountInput, setIsDiscountInput] = useState('');
  const [isFinishedInput, setIsFinishedInput] = useState('');
  const [newPriceInput, setNewPriceInput] = useState('');

  const boolData = [{ label: 'true', value: '1', }, { label: 'false', value: '2' }];

  useLayoutEffect(() => {
    setTitleInput(route.params.title);
  }, [])

  const titleChangingHandler = (typedTitle) => {
    setTitleInput(typedTitle);
  }

  const newPriceChangingHandler = (typedPrice) => {
    setNewPriceInput(typedPrice);
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

  const checkNewPriceIsValid = () => {
    if(newPriceInput.trim().length === 0){
        setIsNewPriceValid(false);
        setNewPriceErrors('Please enter a valid price');
    } else {
        setIsNewPriceValid(true);
        setNewPriceErrors(null);
    }
  }

  const editProductHandler = async () => {
    if(!isFinishedInput || isFinishedInput.length === 0){
        setIsFinishedValid(false);
        setFinishedErrors('Please select true or false')
        return;
    } 
    if(!isDiscountInput || isDiscountInput.length === 0){
      setIsDiscountValid(false);
      setDiscountErrors('Please select true or false')
      return;
  }
  const discountValue = isDiscountInput === 'true' ? true : false
  const finishedValue = isFinishedInput === 'true' ? true : false
  const newPriceValue = isDiscountInput === 'true' ? newPriceInput : 0
    setIsLoading(true);
    try {
      const data = await editProduct(route.params.id, titleInput, discountValue, finishedValue, newPriceValue);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'title'){
            setTitleErrors(i.message);
            setIsTitleValid(false);
          } else if(i.type === 'newPrice'){
            setNewPriceErrors(i.message);
            setIsNewPriceValid(false);
          } else if(i.type === 'isFinished'){
            setFinishedErrors(i.message);
            setIsFinishedValid(false);
          } else if(i.type === 'isDiscount'){
            setDiscountErrors(i.message);
            setIsDiscountValid(false);
          }
        }
      } else {
        const updatedProduct = products.find((prod) => prod.id === route.params.id);
        const updatedProductIndex = products.findIndex((prod) => prod.id === route.params.id);
        const changedProduct = updatedProduct;
        changedProduct.title = titleInput;
        changedProduct.isDiscount = discountValue;
        changedProduct.isFinished = finishedValue;
        changedProduct.newPrice = newPriceValue;
        products[updatedProductIndex] = changedProduct;
        setNavigationLocation('AdminHome');
        setMessage('Your product has been edited Successfully');
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

  const deleteProductHandler = async () => {
    setIsLoading(true);
    try {
      const data = await deleteProduct(route.params.id);
      const productsWithoutDeleted = products.filter((prod) => prod.id !== route.params.id);
      setProducts(productsWithoutDeleted);
      setNavigationLocation('AdminHome');
      setMessage('Your product has been deleted Successfully');
      setAnimationName(require('../../assets/animations/delete-bin.json'));
      openModalHandler();
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
      <Text style={styles.title}>Edit Product</Text>
      <View style={styles.inputContainer}>
        <Input inputData={route.params.title} label='Product title' onCheckValidity={checkTitleIsValid} onInputChange={titleChangingHandler} errors={titleErrors} inputIsValid={isTitleValid} autoCapitalize='words' autoComplete='name' autoCorrect={true} keyboardType='default' placeholder='Title' type='title'></Input>
        <Text style={styles.label}>Is your product out of stock?</Text>
        <Dropdown isValid={isFinishedValid} error={finishedErrors} label='Select true or false' data={boolData} onSelect={setIsFinishedInput}></Dropdown>
        <Text style={styles.label}>Do you want to offer a discount</Text>
        <Dropdown isValid={isDiscountValid} error={discountErrors} label='Select true or false' data={boolData} onSelect={setIsDiscountInput}></Dropdown>
        {isDiscountInput === 'true' && <Input label='New Price' onCheckValidity={checkNewPriceIsValid} onInputChange={newPriceChangingHandler} errors={newPriceErrors} inputIsValid={isNewPriceValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='phone-pad' placeholder='Price' type='price'></Input>}
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <View style={styles.bothButtonsContainer}>
          <Button onPress={editProductHandler} style={styles.button}><Ionicons name='pencil' size={20} color='white' style={styles.icon}></Ionicons> Edit</Button>
          <Button onPress={deleteProductHandler} textColor={{ color: styling.color.error100 }} style={styles.deleteButton}><Ionicons name='trash' size={20} color={styling.color.error100} style={styles.icon}></Ionicons> Delete</Button>
        </View>}
        {isLoading && <ActivityIndicator></ActivityIndicator>}
      </View>
    </ScrollView>
  )
}

export default EditScreen;

const styles = StyleSheet.create({
  bothButtonsContainer: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
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
  deleteButton: {
    width: '40%',
    backgroundColor: 'white'
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
  icon: {
    marginRight: 20,
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