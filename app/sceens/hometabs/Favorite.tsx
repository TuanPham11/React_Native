import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const Favorite = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.background}>
          <View style={styles.header}></View>
          <View style={styles.searchRow}>
          
            <Text
              style={styles.searchInput}>Good day</Text>
            
           
            <TouchableOpacity>
              <MaterialCommunityIcons name="bell" size={24} color="#230C02" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="menu" size={24} color="#230C02" />
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Favorite</Text>
            <Text style={styles.Text}>
              Your favorite drinks to lighten up your day
            </Text>
          </View>

          {/* Product Sections */}
          <View style={styles.productSection}>
            <View style={styles.productContainer}>
              <View style={styles.productCard}>
                <View style={styles.productDetails}>
                  <Text>Black coffee</Text>

                  <TouchableOpacity>
                    <Text
                      style={styles.productTitle}
                      onPress={() => navigation.navigate("ProductDetail")}
                    >
                      Iced Americano
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row" }}>
                    
                    <MaterialCommunityIcons name="heart" style={styles.icon} />
                    <Text style={styles.num}>119</Text>
                  </View>
                </View>
                <Image
                  source={require("../../../assets/images/sp1.jpg")}
                  style={styles.productImage}
                />
              </View>
            </View>

            <View style={styles.productContainer}>
              <View style={styles.productCard}>
                <View style={styles.productDetails}>
                  <Text>Winter special</Text>
                  <Text style={styles.productTitle}>Capucchino Latte</Text>
                  <View style={{ flexDirection: "row" }}>
                    
                    <MaterialCommunityIcons name="heart" style={styles.icon} />
                    <Text style={styles.num}>90</Text>
                  </View>
                </View>
                <Image
                  source={require("../../../assets/images/sp2.jpg")}
                  style={styles.productImage}
                />
              </View>
            </View>

            <View style={styles.productContainer}>
              <View style={styles.productCard}>
                <View style={styles.productDetails}>
                  <Text>Black coffee</Text>
                  <Text style={styles.productTitle}>Iced Americano</Text>
                  <View style={{ flexDirection: "row" }}>
                    
                    <MaterialCommunityIcons name="heart" style={styles.icon} />
                    <Text style={styles.num}>50</Text>
                  </View>
                </View>
                <Image
                  source={require("../../../assets/images/sp3.jpg")}
                  style={styles.productImage}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    backgroundColor: "#EEDCC6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },
  searchRow: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  searchInput: {
    width: 333,
    height: 34,
    backgroundColor: "#EEDCC6",
    paddingLeft: 20,
    marginBottom: 10,
    color: "#230C02",
  },
  customButton: {
    backgroundColor: "#EEDCC6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Optional: Add rounded corners
  },
  buttonText: {
    color: "#230C02", // Change this to your desired text color
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    height: 85,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#230C02",
    marginLeft: 20,
  },
  Text: {
    fontSize: 16,

    color: "#834D1E",
    marginLeft: 20,
  },
  icon: {
    color: "#FB452D",
    marginTop: 10,
  },
  num: {
    color: "#230C02",
    marginTop: 10,
    marginLeft: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  productSection: {
    backgroundColor: "#230C02",
    minHeight: 700,
  },
  productContainer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#230C02",
  },
  productCard: {
    width: 350,
    height: 100,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 15, // Add this line to make the corners rounded
    overflow: "hidden", // Ensures the content inside respects the border radius
    padding: 5,
  },
  productDetails: {
    flex: 2,
    justifyContent: "center",
    padding: 10,
  },
  productTitle: {
    fontWeight: "bold",
  },
  productImage: {
    width: 80, // Define a width for the image
    height: "100%", // Ensure the image covers the height of the card
    borderRadius: 15, // Apply the same border radius for rounded corners
    resizeMode: "cover",
  },
});

export default Favorite;
