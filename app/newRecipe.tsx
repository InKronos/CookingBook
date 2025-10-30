
import { useAddRecipe } from '@/hooks/useRecipes';
import { Recipe } from '@/model/Recipe.model';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const newRecipe = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [cookTime, setCookTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0); 
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [imageUri, setImageUri] = useState<string>('');
  const { loading, addRecipe } = useAddRecipe();
  const [success, setSuccess] = useState<boolean>(false)
  const router = useRouter();

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (text: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Brak uprawnień',
        'Potrzebujemy dostępu do Twojej galerii, aby dodać zdjęcie.'
      );
      return;
    }

    // Uruchomienie galerii
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Pozwala na kadrowanie
      aspect: [4, 3], // Proporcje kadrowania
      quality: 1, // Najwyższa jakość
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveRecipe = () => {
      const recipe = new Recipe();
      recipe.id = 0;
      recipe.cookTime = cookTime;
      recipe.imageUrl = imageUri;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.stars = rating;
      recipe.name = recipeName;
      recipe.favorite = false;
      addRecipe(recipe);
      setSuccess(true);
  }

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= rating ? 'star' : 'star-o'}
            size={32}
            color={i <= rating ? "gold" : 'grey'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.imagePlaceholder}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <MaterialIcons name="image" size={80} color="#a0a0a0" />
          )}
          <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
            <Text style={styles.addPhotoButtonText}>{imageUri ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nazwa przepisu</Text>
          <TextInput
            style={styles.input}
            value={recipeName}
            onChangeText={setRecipeName}
            placeholder="Wpisz nazwę przepisu"
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Składniki</Text>
            <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <TextInput
                style={styles.ingredientInput}
                value={ingredient}
                onChangeText={(text) => handleIngredientChange(text, index)}
                placeholder={`Składnik ${index + 1}`}
              />
              <TouchableOpacity onPress={() => removeIngredient(index)}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Czas przygotowania (w min)</Text>
          <TextInput
            style={styles.input}
            value={cookTime}
            onChangeText={setCookTime}
            placeholder="np. 30"
            keyboardType="numeric"
          />

          
          <Text style={styles.label}>Ocena</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>

          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={styles.multilineInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Dodaj opis przygotowania..."
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
            <Text style={styles.saveButtonText}>Zapisz</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAwareScrollView>
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
      <Modal visible={success && !loading} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.popupText}>Przepis został dodany</Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => router.push({pathname: "/"})}
          >
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
}

// Style
const styles = StyleSheet.create({
  
  imagePreview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  }, 
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  addPhotoButtonText: {
    color: 'white',
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 120,
    textAlignVertical: 'top', 
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 3,
  },
  saveButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  popupText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});


export default newRecipe;