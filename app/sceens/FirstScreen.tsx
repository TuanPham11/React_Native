import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FirstScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.welcomeText}>COFFEE SHOP</Text>

      <Text style={styles.Text}>Enjoy the drink coffee .</Text>

      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate("Wellcome")}
      >
        <Text style={styles.shopButtonText}>SHOP NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%", // Chỉnh lại width
    height: "100%", // Chỉnh lại height
  },
  welcomeText: {
    fontSize: 35,
    color: "#230C02",
    fontWeight: "bold",
    marginTop: 230, // Giảm marginTop để tránh bị đẩy lên quá cao
  },
  Text: {
    fontSize: 20,
    color: "#230C02",

    marginTop: 30, // Giảm marginTop để tránh bị đẩy lên quá cao
  },
  shopButton: {
    width: 350,
    padding: 15,
    backgroundColor: "#230C02",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    borderRadius: 30,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FirstScreen;
