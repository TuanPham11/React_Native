import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GET_IMG } from "@/api/apiService";

const PastOrderRoute = ({ navigation, route }: { navigation: any; route: any; }) => {
  const { coffee } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(350);
  const [imageError, setImageError] = useState(false); // Trạng thái theo dõi lỗi hình ảnh
   
  
  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thông tin sản phẩm.</Text>
      </View>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <MaterialCommunityIcons name="magnify" size={24} color="#230C02" />
          <TextInput
            style={styles.searchInput}
            placeholder="Good day, Selenay"
          />
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={24} color="#230C02" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="#230C02" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: GET_IMG("products", coffee.photo) }} // Kiểm tra URL
        style={styles.productImage}
        onError={() => setImageError(true)} // Cập nhật trạng thái khi có lỗi
      />
      {imageError && (
        <Image
          source={require("../../../../assets/images/sp1.jpg")} // Hình ảnh placeholder khi có lỗi
          style={styles.productImage}
        />
      )}

      {/* Product Detail Card */}
      <View style={styles.detailCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.category}>{coffee.categoryTitle}</Text>
          <View style={styles.cardIcons}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={24}
                color="#EEDCC6"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={24}
                color="#EEDCC6"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.productName}>{coffee.title}</Text>
        <Text style={styles.productDescription}>{coffee.description}</Text>

        {/* Rating */}
        <View style={styles.rating}>
          <MaterialCommunityIcons name="star" size={24} color="#EEDCC6" />
<Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.reviewText}>(10k)</Text>
        </View>

        {/* Size Selection */}
        <Text style={styles.sizeLabel}>Size</Text>
        <View style={styles.sizeSelection}>
          {[250, 350, 450].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size ? styles.activeSize : styles.inactiveSize,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && { color: "#230C02" },
                ]}
              >
                {size}
              </Text>
              <MaterialCommunityIcons
                name="coffee-outline"
                size={24}
                color={selectedSize === size ? "#230C02" : "#EEDCC6"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Price */}
        <Text style={styles.price}>
          {(coffee.price * quantity).toFixed(2)}đ
        </Text>

        {/* Quantity Picker & Add to Cart */}
        <View style={styles.cartSection}>
          <View style={styles.quantityPicker}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{coffee.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => navigation.navigate("Cart", { coffee, quantity: coffee.quantity ,price: coffee.price})}
            >
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Các style không thay đổi
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEDCC6",
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 34,
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    color: "#230C02",
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailCard: {
    backgroundColor: "#3A2924",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    position: "absolute",
    width: "100%",
height: 600,
    bottom: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  cardIcons: {
    flexDirection: "row",
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    color: "#EEDCC6",
    fontSize: 16,
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    color: "#F2994A",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  reviewText: {
    color: "#EEDCC6",
    fontSize: 14,
    marginLeft: 5,
  },
  sizeLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 15,
  },
  sizeSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sizeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 40,
    borderRadius: 10,
  },
  inactiveSize: {
    backgroundColor: "#5A4742",
  },
  activeSize: {
    backgroundColor: "#EEDCC6",
  },
  sizeText: {
    fontSize: 16,
    marginRight: 5,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  cartSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  quantityPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  quantityValue: {
    color: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#EEDCC6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: "#230C02",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PastOrderRoute;