import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Text, View } from "react-native";

type RecipeCardProps = {
  title: string,
  imgUrl: any, //Bo poberane są z require
  favorite: boolean,
  time: string,
  grade: number
};

 const renderStars = (count: number) => {
    const fullStars = Math.floor(count);
    const hasHalf = count - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<MaterialIcons key={`full-${i}`} name="star" size={20} color="gold" />);
    }

    if (hasHalf) {
      stars.push(<MaterialIcons key="half" name="star-half" size={20} color="gold" />);
    }

    while (stars.length < 5) {
      stars.push(<MaterialIcons key={`empty-${stars.length}`} name="star-border" size={20} color="grey" />);
    }

    return <View style={styles.starRow}>{stars}</View>;
  };

export const RecipeCard = ({title, imgUrl, favorite, time, grade}: RecipeCardProps) => (
    <View style={styles.card}>
      <ImageBackground
        source={imgUrl}
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
          {renderStars(grade)}
        </View>
      </ImageBackground>
    </View>
 
);


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