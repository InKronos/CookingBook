import { useSearchStore } from "@/store/searchStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export const SearchHeader = () => {
  
  const { query, setQuery } = useSearchStore();
  
  return (
  <View style={styles.searchBar}>
    <Ionicons name="search" size={20} color="#555" style={{ marginRight: 6 }} />
    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder="Szukaj przepisu..."
      placeholderTextColor="#888"
      style={styles.input}
    />
  </View>
)};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});