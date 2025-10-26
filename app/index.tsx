import { Link, router } from "expo-router";
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from "@/model/Recipe.model";
import { RecipieService } from "@/sevices/recipie/RecipeService";
interface homeScreenProps {
    
}


type ItemProps = {title: string};
const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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
                renderItem={({item}) => <Item title={item.name} />}
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