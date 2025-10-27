import { RecipeCard } from "@/components/RecipeCard/RecipeCard";
import { Recipe } from "@/model/Recipe.model";
import { RecipieService } from "@/sevices/recipie/RecipeService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface homeScreenProps {
    
}


const home = (props: homeScreenProps) => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const recipesService = new RecipieService;
        setRecipes(recipesService.getAllRecipies());
    },[])
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                data={recipes}
                renderItem={({item}) => <RecipeCard title={item.name} imgUrl={item.imageUrl} favorite={item.favorite} time={item.cookTime} grade={item.stars} />}
            />     
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