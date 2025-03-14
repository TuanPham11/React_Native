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

const WellcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.welcomeText}>Welcome{"\n"} Back!</Text>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.signinButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text
          style={styles.signupButtonText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Create an account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
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
    marginStart: -150,
    marginTop: 250,
    marginBottom: 200, // Giảm marginTop để tránh bị đẩy lên quá cao
  },
  formContainer: {
    width: 350,
    marginTop: 20,
  },

  signinButton: {
    width: 350,
    padding: 15,
    backgroundColor: "#230C02",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 30,
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupButton: {
    width: 350,
    padding: 15,
    borderWidth: 1,
    borderColor: "#230C02",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 30,
  },
  signupButtonText: {
    color: "#230C02",
    fontSize: 20,
  },
  forgotPasswordText: {
    color: "#230C02",
    fontSize: 20,
    marginTop: 20,
  },
});

export default WellcomeScreen;
