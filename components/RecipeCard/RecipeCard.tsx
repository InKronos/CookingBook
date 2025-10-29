import { assetsMap } from '@/utils/assetMap';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Stars from '../stars';

type RecipeCardProps = {
  id: number,
  title: string,
  imgUrl: string, //Bo poberane są z require
  favorite: boolean,
  time: string,
  grade: number
};


export const RecipeCard = ({id, title, imgUrl, favorite, time, grade}: RecipeCardProps) => {
  const router = useRouter();
  

  
    //Wysyłam tytuł do routera aby nie musieć go ładować z serwisu
  return(
    <TouchableOpacity style={styles.card} onPress={() => router.push({
      pathname: "/recipe/[id]",
      params: { id: id, nameTitle: title}
    })}> 
      <ImageBackground
        source={imgUrl.includes("assets") ? assetsMap[imgUrl]: {uri: imgUrl}}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
         <View style={styles.infoBox}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={24}
              color={favorite ? 'red' : 'gray'}
            />
          </View>

          <Text style={styles.text}>{time} min</Text>
          <Stars grade={grade}/>
        </View>
      </ImageBackground>
    </TouchableOpacity>
 
)};


const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    elevation: 6, // cień (Android)
    shadowColor: "#000", // cień (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    margin: 16,
  },
  image: {
    height: 250,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoBox: {
    backgroundColor: "#7eb6ffe1",
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
});