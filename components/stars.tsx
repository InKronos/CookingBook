import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type StarsProps = {
  grade: number;
};

const Stars = (props: StarsProps) => {
    const fullStars = Math.floor(props.grade);
    const hasHalf = props.grade - fullStars >= 0.5;
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

const styles = StyleSheet.create({
    starRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
})


export default Stars;