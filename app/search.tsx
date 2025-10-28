import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useSearchStore } from "@/store/searchStore";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




type ItemProps = {name: string};

const Item = (props: ItemProps) => (
    <View style={styles.row}>
      <Text style={styles.name}>{props.name}</Text>

      <TouchableOpacity>
        <Ionicons
          name={'book-outline'}
          size={28}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );

interface searchScreenProps {

}

const search = (props: searchScreenProps) => {
   const { query } = useSearchStore();
   
   const { recipes, loading } = useFilteredRecipes(query);

   if (loading) return <Text>Ładowanie...</Text>;

   return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
         <FlatList
         data={recipes}
         renderItem={({item}) => <Item name={item.name} />}
         ItemSeparatorComponent={() => <View style={styles.separator} />}
         />
      </SafeAreaView>
   )
}


const styles = StyleSheet.create({
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});
export default search;