import { RecipeCard } from "@/components/RecipeCard/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface homeScreenProps {
    
}


const home = (props: homeScreenProps) => {

    const { recipes, loading } = useRecipes();

    if (loading) return <Text>Ładowanie...</Text>;

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
                data={recipes}
                renderItem={({item}) => <RecipeCard title={item.name} imgUrl={item.imageUrl} favorite={item.favorite} time={item.cookTime} grade={item.stars} />}
            />     
            <Link href="/" style={{position: "absolute", bottom: 0, right: 0, margin: 5, backgroundColor: '#0082fc', borderRadius:100}}>
              <Ionicons
                  name="add-sharp"
                 
                  color={"white"}
                  size={70}
              /> 
            </Link>
            
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default home;