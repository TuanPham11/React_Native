import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
  Image,
} from "react-native";
import LottieView from "lottie-react-native"; // Import Lottie
import { Order, getUserInfo, GET_IMG } from "../../api/apiService"; // Import hàm Order, getUserInfo và GET_IMG
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderScreen = ({ route, navigation }) => {
  const { cartData, userEmail, quantities, removeFromCart } = route.params; // Lấy dữ liệu từ props
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null); // Thêm trạng thái lỗi
  const [userInfo, setUserInfo] = useState(null); // Thêm trạng thái cho userInfo
  const [orderSuccess, setOrderSuccess] = useState(false); // State to control Lottie animation

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        console.log("User Info:", userInfo); // Log user info for debugging
        setUserInfo(userInfo); // Use userInfo as needed
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setError("Failed to fetch user information."); // Cập nhật trạng thái lỗi
      } finally {
        setLoading(false); // Đặt loading thành false sau khi hoàn thành
      }
    };

    fetchUserInfo();
  }, []);

  const handleOrder = async () => {
    try {
      const result = await Order(userEmail, cartData.cartId, "credit_card"); // Gọi hàm Order
      setOrderSuccess(true); // Show Lottie animation
      Alert.alert("Đặt hàng thành công", `Order ID: ${result.id}`); // Hiển thị thông báo thành công

      // Remove product from cart
      // removeFromCart(cartData.cartId); // Call the function to remove the product from the cart

      // Navigate back to Home after a delay
      setTimeout(() => {
        navigation.navigate("Home"); // Navigate to Home
      }, 3000); // Adjust the delay as needed
    } catch (err) {
      Alert.alert("Lỗi", err.message); // Hiển thị thông báo lỗi
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị loading indicator
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Hiển thị thông báo lỗi
  }

  return (
    <View style={styles.container}>
      {orderSuccess ? (
        <LottieView
          source={require("../../assets/animation/successfully-done.json")} // Path to your Lottie animation file
          autoPlay
          loop={false}
          onAnimationFinish={() => setOrderSuccess(false)} // Reset state after animation
        />
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>☕ Closest cafe:</Text>
            <Text style={styles.sectionContent}>Co/Choc Tebet (1.5 km)</Text>
            <Text style={styles.sectionContent}>
              Jl. Santuy no. 41, Tebet Barat, Jakarta Selatan
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>📍 Deliver to:</Text>
            <Text style={styles.sectionContent}>
              {/* {userInfo?.address.street}, {userInfo?.address.buildingName},{" "}
              {userInfo?.address.city}, {userInfo?.address.state},{" "}
              {userInfo?.address.country}, {userInfo?.address.pincode} */}
            </Text>
            <Text style={styles.sectionContent}>
              Số điện thoại: {userInfo?.mobileNumber}
            </Text>
            <Text style={styles.sectionContent}>Họ: {userInfo?.firstName}</Text>
            <Text style={styles.sectionContent}>Tên: {userInfo?.lastName}</Text>
            <Text style={styles.sectionContent}>Email: {userEmail}</Text>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={quantities} // Sử dụng quantities để hiển thị sản phẩm
            keyExtractor={(item) => item.productId.toString()} // Sử dụng productId làm key
            renderItem={({ item }) => {
              const itemTotalPrice = item.price * item.quantity; // Calculate total price for the item
              const imageUri = item.image
                ? GET_IMG("products/image", item.image)
                : "path/to/default/image.jpg"; // Fallback image

              return (
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>Your order:</Text>
                  <View style={styles.orderItem}>
                    <Image
                      source={{ uri: imageUri }} // Lấy hình ảnh từ API
                      style={styles.image}
                      onError={() =>
                        console.log(
                          `Error loading image for Product ID: ${item.productId}`
                        )
                      } // Xử lý lỗi tải hình
                    />
                    <View style={styles.productDetails}>
                      <Text>Product ID: {item.productId}</Text>
                      <Text>Product Name: {item.productName}</Text>{" "}
                      {/* Hiển thị tên sản phẩm */}
                      <Text>Quantity: {item.quantity}</Text>{" "}
                      {/* Hiển thị số lượng sản phẩm */}
                      <Text style={styles.totalPrice}>
                        Total Price: {itemTotalPrice.toFixed(2)}đ
                      </Text>{" "}
                      {/* Hiển thị tổng giá sản phẩm */}
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity>
            <Text style={styles.place} onPress={handleOrder}>Đặt hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.place} onPress={() => navigation.goBack()}>
            Quay lại
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4E1D2",
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  productImage: {
    width: 50, // Chiều rộng của hình ảnh
    height: 50, // Chiều cao của hình ảnh
    marginRight: 10, // Khoảng cách bên phải hình ảnh
  },
  productDetails: {
    flexDirection: "column", // Sắp xếp theo cột
    marginLeft: 10, // Khoảng cách bên trái hình ảnh
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
  place: {
    backgroundColor: '#230C02', // Green background color
    color: '#fff', // White text color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    textAlign: 'center', // Center the text
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
    marginTop: 20, // Space above the button
},
  backButton: {
    color: '#fff', // White text color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    textAlign: 'center', // Center the text
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
    marginTop: 20, // Space above the button
  },
});

export default OrderScreen;
