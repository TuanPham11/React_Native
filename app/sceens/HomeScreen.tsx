
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feed from "./hometabs/Feed";
import Profile from "./hometabs/Profile";
import Favorite from "./hometabs/Favorite";
import Cart from "./hometabs/Cart";
import React, { useState, useEffect } from "react";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#834D1E", // Active tab color
        tabBarInactiveTintColor: "#230C02", // Inactive tab color
        tabBarShowLabel: false, // This hides the tab labels
        tabBarStyle: { backgroundColor: "#EEDCC6" }, // Background color of the tab bar
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
