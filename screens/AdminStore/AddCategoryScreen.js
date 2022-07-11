import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AdminProductsContext } from '../../services/admin-products-context';

const AddCategoriesScreen = ({ navigation }) => {

  const { setIsLoading, isLoading, createCategory, setCategories } = useContext(AdminProductsContext);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleErrors, setTitleErrors] = useState();
  const [imageErrors, setImageErrors] = useState();
  const [titleInput, setTitleInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const titleChangingHandler = (typedTitle) => {
    setTitleInput(typedTitle);
  }

  const imageChangingHandler = (typedImage) => {
    setImageInput(typedImage);
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

  const createCategoryHandler = async () => {
    setIsLoading(true);
    try {
      const data = await createCategory(titleInput, imageInput);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'title'){
            setTitleErrors(i.message);
            setIsTitleValid(false);
          } else if(i.type === 'image'){
            setImageErrors(i.message);
            setIsImageValid(false);
          }
        }
      } else {
        setCategories(prevCategory => [...prevCategory, { id: data.id, title: data.title, image: data.image, }])
        navigation.navigate('AdminCategories');
      }
    } catch (err) {
      console.log(err);
      console.log('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Category</Text>
      <View style={styles.inputContainer}>
        <Input label='Category title' onCheckValidity={checkTitleIsValid} onInputChange={titleChangingHandler} errors={titleErrors} inputIsValid={isTitleValid} autoCapitalize='words' autoComplete='name' autoCorrect={true} keyboardType='default' placeholder='Title' type='title'></Input>
        <Input label='Image url' onCheckValidity={checkImageIsValid} onInputChange={imageChangingHandler} errors={imageErrors} inputIsValid={isImageValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='url' placeholder='Image URL' type='image'></Input>
        {imageInput.length > 0 && <Image style={styles.imagePreview} source={{ uri: imageInput }}></Image>}
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={createCategoryHandler} style={styles.button}>Create Category</Button>}
        {isLoading && <ActivityIndicator></ActivityIndicator>}
      </View>
    </View>
  )
}

export default AddCategoriesScreen;

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
    paddingVertical: 50,
    paddingHorizontal: 24,
    flex: 1,
    width: '100%'
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