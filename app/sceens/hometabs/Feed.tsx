import React, { useState, useEffect } from "react";
import { GET_ALL, GET_IMG } from "../../../api/apiService";
import {
  ScrollView,
  View,
  Text as RNText,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductItem from "./Items/ProductItem";

const Feed = ({ navigation, route }: any) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = route.params || {};
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  useEffect(() => {
    // Simplified fetch function
    const fetchCategories = async () => {
      try {
        const response = await GET_ALL("categories");
        console.log("Categories response:", response);
        if (response?.content && Array.isArray(response.content)) {
          setCategories(response.content);
        } else {
          console.error("Invalid categories format:", response);
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GET_ALL("products", { 
          pageNumber: 0,
          pageSize: 1000  // Sử dụng pageSize thay vì size
          
        });
        
        console.log("Full response:", response);

        if (response?.content && Array.isArray(response.content)) {
          let filteredProducts = response.content;

          if (selectedCategory) {
            filteredProducts = response.content.filter(
              (product) =>
                Number(product.category?.categoryId) ===
                Number(selectedCategory)
            );
          }
          if (sortOrder === "oldest") {
            filteredProducts = filteredProducts.reverse();
          }
          if (searchQuery.trim()) {
            filteredProducts = filteredProducts.filter((product) =>
              product.productName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          }

          console.log("Number of products:", filteredProducts.length);
          setProducts(filteredProducts);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery,sortOrder]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.background}>
          <View style={styles.header}></View>
          <View style={styles.searchRow}>
            <MaterialCommunityIcons name="magnify" size={24} color="#230C02" />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search products...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name="bell" size={24} color="#230C02" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="menu" size={24} color="#230C02" />
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <RNText style={styles.titleText}>
              What would you like to drink today?
            </RNText>
          </View>

          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.horizontalScroll}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.customButton,
                  !selectedCategory && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <RNText
                  style={[
                    styles.buttonText,
                    !selectedCategory && { color: "#EEDCC6" },
                  ]}
                >
                  All
                </RNText>
              </TouchableOpacity>
            </View>
            {categories.map((category) => (
              <View key={category.categoryId} style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.customButton,
                    selectedCategory === category.categoryId &&
                      styles.selectedButton,
                  ]}
                  onPress={() => {
                    console.log("Selecting category:", category.categoryId);
                    setSelectedCategory(category.categoryId);
                  }}
                >
                  <RNText
                    style={[
                      styles.buttonText,
                      selectedCategory === category.categoryId && {
                        color: "#EEDCC6",
                      },
                    ]}
                  >
                    {category.categoryName}
                  </RNText>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.sortButtons}>
        <TouchableOpacity onPress={() => setSortOrder("newest")}>
          <RNText
            style={[
              styles.sortButton,
              sortOrder === "newest" && styles.activeSort,
            ]}
          >
            Cũ Nhất
          </RNText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOrder("oldest")}>
          <RNText
            style={[
              styles.sortButton,
              sortOrder === "oldest" && styles.activeSort,
            ]}
          >
            Mới Nhất
          </RNText>
        </TouchableOpacity>
      </View>
          <View style={styles.recentOrdersSection}>
            {isLoading ? (
              <RNText>Loading...</RNText>
            ) : (
              products.map((product) => (
                <TouchableHighlight
                  key={product.productId}
                  style={styles.orderItem}
                  onPress={() => navigation.navigate("Details", { product })}
                >
                  <ProductItem
                    navigation={navigation}
                    key={product.productId}
                    imageSource={GET_IMG("products/image", product.image)}
                    productName={product.productName}
                    categoryName={product.category?.categoryName}
                    description={product.description}
                    price={product.price}
                    coffee={product}
                  />
                </TouchableHighlight>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </>
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
    borderRadius: 8,
  },
  buttonText: {
    color: "#230C02",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    height: 85,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#230C02",
    marginLeft: 20,
    lineHeight: 30,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  productsGrid: {
    flexDirection: "column",
    gap: 15,
  },
  productCard: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recentOrdersSection: {
    padding: 20,
    backgroundColor: "#230C02",
    minHeight: 900,
  },
  recentOrdersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 20,
    borderRadius: 15,
  },
  selectedButton: {
    backgroundColor: "#230C02",
  },

  sortButtons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  sortButton: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#230C02",
  },
  activeSort: {
    fontWeight: "bold",
    color: "#563c31",
  },
});

export default Feed;
