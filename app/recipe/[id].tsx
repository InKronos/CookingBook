import Stars from "@/components/stars";
import { useDeleteRecipe, useRecipe, useUpdateFavorite } from "@/hooks/useRecipes";
import { assetsMap } from "@/utils/assetMap";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const recipeScreen = () => {
    const { id, nameTitle } = useLocalSearchParams<{ id: string, nameTitle: string }>();
    const navigation = useNavigation();


    const { recipe: fetchedRecipe, loading } = useRecipe(parseInt(id));

    const { updateFavorite } = useUpdateFavorite();
    const { loading: deleteLoading, deleteRecipe } = useDeleteRecipe();

    const [recipe, setRecipe] = useState(fetchedRecipe);
    const [wantDelete, setWantDelete] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    useEffect(() => {
      navigation.setOptions({ headerTitle: nameTitle});
    }, [navigation]);

    
    useEffect(() => {
      setRecipe(fetchedRecipe);
    }, [fetchedRecipe]);

    function updateFavoite(){
      if(recipe){
        const newFavorite = !recipe.favorite;
        setRecipe({ ...recipe, favorite: newFavorite })
        updateFavorite(recipe.id, newFavorite);
      }
    }

    function deleteRecipeAction() {
      if(recipe){
        deleteRecipe(recipe);
        setDeleteSuccess(true);
      }
    }

    if (loading) return <Text>Ładowanie...</Text>;

    if (recipe != undefined)
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.container}>
            
            <Image source={recipe.imageUrl.includes("assets") ? assetsMap[recipe.imageUrl]: {uri: recipe.imageUrl}} style={styles.image} />

            <View style={styles.row}>
                <Stars grade={recipe.stars}/>
                <TouchableOpacity onPress={updateFavoite}>
                <Ionicons
                    name={recipe.favorite ? 'heart' : 'heart-outline'}
                    size={26}
                    color={recipe.favorite? 'red' : 'black'}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Składniki:</Text>
                <View style={styles.ingredientsBox}>
                {recipe.ingredients.map((ing, i) => (
                    <Text key={i} style={styles.ingredient}>• {ing}</Text>
                ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Jak Przygotować?</Text>
                <Text style={styles.description}>{recipe.description}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={() => router.push({
              pathname: "/editRecipe/[id]",
              params: { id: id}
            })}>
                <Text style={styles.buttonText}>
                Edytuj Przepis
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => setWantDelete(true)}>
                <Text style={styles.buttonText}>
                Usuń Przepis
                </Text>
            </TouchableOpacity>
    </ScrollView>
    <Modal visible={wantDelete} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setWantDelete(false)}>
        <View style={styles.popup}>
            <Text style={styles.popupText}>Czy napewno chcesz usunąć przepis {recipe.name}?</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => deleteRecipeAction()}
                >
                    <Text style={styles.buttonText}>Tak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.button, {backgroundColor: "#be3c3cff"}]}
                onPress={() => setWantDelete(false)}>
                    <Text style={styles.buttonText}>Nie</Text>
                </TouchableOpacity>
            </View>
            
        </View>
          </TouchableOpacity>
      </Modal>
      <Modal visible={deleteLoading} transparent animationType="fade">
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            </Modal>
        <Modal visible={!deleteLoading && deleteSuccess} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Przepis został usunięty</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    )
    else return <Text>Nie znaleźiono przepisu</Text>;

    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bde0fe',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  starRow: {
    flexDirection: 'row',
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  ingredientsBox: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
    height: 200
  },
  popupText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    margin: 10
  },

});

export default recipeScreen;