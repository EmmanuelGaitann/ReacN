import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("https://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Erreur a recuperer les données employées", error);
      }
    };
    fetchEmployeeData();
  }, []);
  console.log(employees);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            height: 40,
            borderRadius: 4,
          }}
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput placeholder="recherche " />
        </Pressable>
      </View>
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});
