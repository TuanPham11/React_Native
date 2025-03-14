import React, { useState } from "react";
import { REGISTER, registerUser } from "../../api/apiService"; // Hàm API
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  // Sử dụng useState để quản lý các trường nhập liệu
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  // Thêm state để quản lý lỗi
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });

  // Hàm validate từng trường
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (value.length < 5 || value.length > 30) {
          setErrors(prev => ({ ...prev, firstName: 'Họ phải có độ dài từ 5 đến 30 ký tự' }));
        } else {
          setErrors(prev => ({ ...prev, firstName: '' }));
        }
        break;
      case 'lastName':
        if (value.length < 5 || value.length > 30) {
          setErrors(prev => ({ ...prev, lastName: 'Tên phải có độ dài từ 5 đến 30 ký tự' }));
        } else {
          setErrors(prev => ({ ...prev, lastName: '' }));
        }
        break;
      case 'mobileNumber':
        // Kiểm tra số điện thoại phải đúng 10 chữ số
        if (!/^\d{10}$/.test(value)) {
          setErrors(prev => ({ ...prev, mobileNumber: 'Số điện thoại phải có đúng 10 chữ số' }));
        } else {
          setErrors(prev => ({ ...prev, mobileNumber: '' }));
        }
        break;
    }
  };

  // Kiểm tra xem form có hợp lệ không
  const isFormValid = () => {
    return (
      firstName.length >= 5 &&
      firstName.length <= 30 &&
      lastName.length >= 5 &&
      lastName.length <= 30 &&
      /^\d{10}$/.test(mobileNumber) && // Thêm kiểm tra số điện thoại
      email &&
      password &&
      !Object.values(errors).some(error => error !== '')
    );
  };

  // Cập nhật các hàm onChange
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    validateField('firstName', value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    validateField('lastName', value);
  };

  // Thêm hàm xử lý thay đổi số điện thoại
  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value);
    validateField('mobileNumber', value);
  };

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    try {
      // Validate required fields
      if (!firstName || !lastName || !mobileNumber || !email || !password) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
        return;
      }

      // Validate firstName length
      if (firstName.length < 5 || firstName.length > 30) {
        Alert.alert("Lỗi", "Họ phải có độ dài từ 5 đến 30 ký tự");
        return;
      }

      // Validate lastName length
      if (lastName.length < 5 || lastName.length > 30) {
        Alert.alert("Lỗi", "Tên phải có độ dài từ 5 đến 30 ký tự");
        return;
      }

      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim().toLowerCase(),
        password,
        street: street?.trim() || '',
        city: city?.trim() || '',
        roleName: "USER",
        buildingName: "Default Building",
        state: "Default State",
        country: "Default Country",
        pincode: "000000"
      };

      console.log("Sending registration data:", userData);
      const response = await REGISTER(userData, navigation.navigate);
      
      // Kiểm tra nếu email đã tồn tại
      if (response.message?.includes("User already exists with emailId")) {
        Alert.alert(
          "Lỗi",
          "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập."
        );
        return;
      }

      // Thông báo thành công và chuyển trang
      Alert.alert(
        "Thành công",
        "Đăng ký tài khoản thành công!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignIn")  // Chuyển đến trang SignIn
          }
        ]
      );

    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message?.includes("User already exists with emailId")) {
        Alert.alert(
          "Lỗi",
          "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập."
        );
        return;
      }
      Alert.alert("Lỗi", "Không thể đăng ký. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.formContainer}>
        {/* Họ */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ</Text>
          <TextInput
            style={[styles.input, errors.firstName ? styles.inputError : null]}
            placeholder="Nhập họ"
            value={firstName}
            onChangeText={handleFirstNameChange}
          />
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
          <View style={styles.underline} />
        </View>

        {/* Tên */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={[styles.input, errors.lastName ? styles.inputError : null]}
            placeholder="Nhập tên"
            value={lastName}
            onChangeText={handleLastNameChange}
          />
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
          <View style={styles.underline} />
        </View>

        {/* Số điện thoại */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={[styles.input, errors.mobileNumber ? styles.inputError : null]}
            placeholder="Nhập số điện thoại"
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="phone-pad"
            maxLength={10} // Giới hạn độ dài input
          />
          {errors.mobileNumber ? (
            <Text style={styles.errorText}>{errors.mobileNumber}</Text>
          ) : null}
          <View style={styles.underline} />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.underline} />
        </View>

        {/* Mật khẩu */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.underline} />
        </View>
      </View>

      {/* Nút đăng ký */}
      <TouchableOpacity 
        style={[
          styles.signUpButton,
          !isFormValid() && styles.disabledButton
        ]} 
        onPress={handleRegister}
        disabled={!isFormValid()}
        activeOpacity={0.7}
      >
        <Text style={styles.signUpButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: 350,
    marginTop: 250,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: "#523821",
    fontWeight: "bold",
    marginBottom: 8,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%", // Chỉnh lại width
    height: "100%", // Chỉnh lại height
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#967259",
    fontSize: 20,
    color: "#967259",
    paddingBottom: 8,
  },
  underline: {
    height: 2,
    backgroundColor: "#967259",
    marginBottom: -8,
  },
  signUpButton: {
    width: 150,
    padding: 15,
    backgroundColor: "#230C02",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 30,
    elevation: 3, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 5,
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
});

export default SignUpScreen;
