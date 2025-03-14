import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { getUserInfo, logout } from '../../../api/apiService';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleLogout = async () => {
    try {

      await logout();
        navigation.navigate("SignIn");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => {
    // Navigate to Change Password screen
    navigation.navigate("ChangePass");
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: userInfo?.profileImage || "../../../assets/images/sp2.jpg" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userInfo?.firstName} {userInfo?.lastName}</Text>
          <TouchableOpacity>
            <FontAwesome name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Information Section */}
      <View style={styles.userInfoSection}>
       
        <Text style={styles.userInfoText}>
          Số điện thoại: {userInfo?.mobileNumber}
        </Text>
        <Text style={styles.userInfoText}>
          Họ: {userInfo?.firstName}
        </Text>
        <Text style={styles.userInfoText}>
          Tên: {userInfo?.lastName}
        </Text>
        <Text style={styles.userInfoText}>
          Email: {userInfo?.email}
        </Text>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity onPress={handleChangePassword} style={styles.changePasswordButton}>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
        <MaterialCommunityIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEDCC6",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  userInfoSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#230C02",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  changePasswordButton: {
    backgroundColor: "#230C02",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  changePasswordText: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
});

export default ProfileScreen;
