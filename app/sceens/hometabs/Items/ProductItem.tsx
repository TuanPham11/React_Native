import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const ProductItem = ({
  imageSource,
  productName,
  categoryName,
  description,
  coffee,
  navigation,
  price,
}) => {
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { coffee })}
      >
        <View style={styles.productCard}>
          <View style={styles.productDetails}>
            {/* Hiển thị tiêu đề của sản phẩm */}
            <Text>{categoryName}</Text>
            <Text style={styles.productTitle}>{productName}</Text>
            <Text>{price} $</Text>
          </View>

          {/* Hiển thị hình ảnh sản phẩm */}
          <Image source={{ uri: imageSource }} style={styles.productImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    padding: 16,
    alignItems: "center",
  },
  productCard: {
    width: 350,
    height: 100,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 15,
    overflow: "hidden",
    padding: 5,
  },
  productDetails: {
    flex: 2,
    justifyContent: "center",
    padding: 10,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  productImage: {
    width: 80,
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
});
