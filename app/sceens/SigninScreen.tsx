import React, { useState } from "react";
import { LOGIN, getUserInfo } from '../../api/apiService';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State cho thông báo lỗi

  const handleLogin = async () => {
    try {
      // Kiểm tra nếu username hoặc password trống
      if (!username || !password) {
        setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
        return;
      }

      const response = await LOGIN({
        email: username,  // Sử dụng email thay vì username
        password: password
      });

      if (response && response.data) {
        console.log('Login response:', response.data); // Log để kiểm tra response
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        // Gọi thêm API để lấy thông tin user
        try {
          const userResponse = await getUserInfo(); // Bạn cần tạo API này
          console.log('User info:', userResponse.data); // Log để kiểm tra response
          navigation.navigate("Home", { 
            username: userResponse.data.email || username
          });
        } catch (userError) {
          console.error('Error fetching user info:', userError);
          // Fallback to using email if user info fetch fails
          navigation.navigate("Home", { username: username });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage('Sai tài khoản hoặc mật khẩu');
            break;
          case 404:
            setErrorMessage('Tài khoản không tồn tại');
            break;
          default:
            setErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau');
        }
      } else {
        setErrorMessage('Không thể kết nối đến server');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.welcomeText}>Welcome{'\n'} Back!</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
          />
         
        </View>

        <View style={[styles.inputContainer, { paddingTop: 35 }]}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>} {/* Hiển thị thông báo lỗi */}
          <View style={styles.underline} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={handleLogin}
      >
        <Text style={styles.signinButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}
          onPress={() => navigation.navigate("SignUp")}>Create an account</Text>
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
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontSize: 35,
    color: "#230C02",
    fontWeight: "bold",
    marginTop: 250,
  },
  formContainer: {
    width: 350,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: "#523821",
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "#967259",
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#967259",
    paddingBottom: 8,
    textAlign: "center",
  },
  underline: {
    height: 2,
    backgroundColor: "#967259",
    marginBottom: -8,
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
  errorText: {
    color: 'red',  // Màu chữ thông báo lỗi
    fontSize: 14,
    marginTop: 5,  // Khoảng cách với trường nhp liệu
  },
});

export default SignInScreen;
