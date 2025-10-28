import Stars from "@/components/stars";
import { useRecipe } from "@/hooks/useRecipes";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const recipeScreen = () => {
    const { id, nameTitle } = useLocalSearchParams<{ id: string, nameTitle: string }>();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerTitle: nameTitle});
    }, [navigation]);

    const { recipe, loading } = useRecipe(parseInt(id));
    
    if (loading) return <Text>Ładowanie...</Text>;

    if (recipe != undefined)
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.container}>
            
            <Image source={recipe.imageUrl} style={styles.image} />

            <View style={styles.row}>
                <Stars grade={recipe.stars}/>
                <TouchableOpacity>
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

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                {recipe.favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                </Text>
            </TouchableOpacity>
    </ScrollView>
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
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default recipeScreen;