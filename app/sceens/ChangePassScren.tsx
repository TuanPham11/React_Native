import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { changePassword, getUserInfo } from '../../api/apiService'; // Import the necessary functions
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed

const ChangePassScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserId(userInfo.userId); // Set userId from userInfo
            } catch (error) {
                console.error("Error fetching user info:", error);
                Alert.alert("Error", error.message);
            }
        };

        fetchUserInfo();
    }, []);

    const handleChangePassword = async () => {
        setLoading(true);
        setErrorMessage(""); // Clear previous error message
        try {
            if (userId) {
                // Fetch user info to get the current password hash
                const userInfo = await getUserInfo();
                const currentPasswordHash = userInfo.password; // This should be the hashed password

                // Compare the old password
                const isOldPasswordValid = await bcrypt.compare(oldPassword, currentPasswordHash);
                if (!isOldPasswordValid) {
                    setErrorMessage("Old password is incorrect"); // Set error message
                    return;
                }

                // Proceed to change the password
                await changePassword(userId, newPassword);
                Alert.alert("Success", "Password changed successfully");
                navigation.navigate("Profile"); // Navigate back to Profile or another screen
            } else {
                Alert.alert("Error", "User ID not found");
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text> // Display error message
            ) : null}
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={handleChangePassword} style={styles.changePasswordButton} disabled={loading}>
                <Text style={styles.changePasswordText}>{loading ? "Changing..." : "Change Password"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    changePasswordButton: {
        backgroundColor: "#230C02",
        borderRadius: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10, // Add some space below the button
    },
    changePasswordText: {
        fontSize: 18,
        color: "#fff",
    },
    backButton: {
        backgroundColor: "#230C02",
        borderRadius: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 18,
        color: "#fff",
    },
    errorText: {
        color: 'red', // Set the text color to red
        marginBottom: 15,
        fontSize: 14, // Optional: Adjust font size for visibility
    },
});

export default ChangePassScreen;
