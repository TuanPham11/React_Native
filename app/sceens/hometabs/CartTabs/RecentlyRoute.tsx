import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RecentlyRoute = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Closest Cafe Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>☕ Closest cafe:</Text>
          <Text style={styles.sectionContent}>Co/Choc Tebet (1.5 km)</Text>
          <Text style={styles.sectionContent}>
            Jl. Santuy no. 41, Tebet Barat, Jakarta Selatan
          </Text>
        </View>

        {/* Delivery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>📍 Deliver to:</Text>
          <Text style={styles.sectionContent}>No saved address</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Your order:</Text>
          <View style={styles.orderItem}>
            <Image
              source={{ uri: "../../../../assets/images/sp2.jpg" }}
              style={styles.image}
            />
            <View style={styles.orderDetails}>
              <Text>1x CAPPUCINO LATTE</Text>
              <Text>£4.95</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Drinks */}
        <View style={styles.section}>
          <View style={styles.recommendHeader}>
            <Text style={styles.sectionHeader}>Other drinks we recommend</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal>
            <View style={styles.recommendItem}>
              <Image
                source={{ uri: "../../../../assets/images/sp3.jpg" }}
                style={styles.recommendImage}
              />
              <Text>ICED YIN & YANG</Text>
              <Text>£4.95</Text>
            </View>
            <View style={styles.recommendItem}>
              <Image
                source={{ uri: "../../../../assets/images/sp1.jpg" }}
                style={styles.recommendImage}
              />
              <Text>ICED CHOCOLATE</Text>
              <Text>£6.95</Text>
            </View>
          </ScrollView>
        </View>

        {/* Order Summary Total */}
        <View style={styles.section}>
          <Text>Subtotal: £4.95</Text>
          <Text>Delivery fee: £1.95</Text>
          <Text>Packaging fee: £2.95</Text>
          <Text>Promo: 0</Text>
          <Text style={styles.total}>TOTAL: £9.85</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4E1D2",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f2e3d4",
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#EEDCC6",
    borderRadius: 15,
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: "#4E342E",
  },
  tabText: {
    color: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionHeader: {
    fontWeight: "bold",
  },
  sectionContent: {
    marginVertical: 5,
  },
  editButton: {
    color: "#e91e63",
    textAlign: "right",
    marginTop: 5,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  recommendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendItem: {
    marginRight: 10,
  },
  recommendImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  seeAll: {
    color: "#e91e63",
  },
  total: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default RecentlyRoute;
