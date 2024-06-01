import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React from "react";

const adddetails = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Ajouter nouvel employé
        </Text>

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          placeholder="India"
          placeholderTextColor={"black"}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Nom Complet (Nom & Prenom)
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Entrer votre nom"
            placeholderTextColor={"black"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default adddetails;

const styles = StyleSheet.create({});
