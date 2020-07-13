import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ReceiptDataJson, GenericData } from "../interfaces/receipt_data";

const styles = StyleSheet.create({
  btnBack: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007EA3",
  },
});

interface ReceiptDataProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<Record<string, object>, string>;
}

interface RowProps {
  name: string;
  value: string;
}

export const ReceiptData = (props: ReceiptDataProps): JSX.Element => {
  const { dataResponse } = props.route.params as {
    dataResponse: ReceiptDataJson;
  };

  const generateArray = (): GenericData[] => {
    let array: GenericData[] = [];

    array.push(dataResponse.fields.MerchantName);
    array.push(dataResponse.fields.MerchantPhoneNumber);
    array.push(dataResponse.fields.MerchantAddress);

    dataResponse.fields.Items.value.map((item) => {
      array.push(item.value.Name);
      array.push(item.value.Quantity);
      array.push(item.value.TotalPrice);
    });

    array.push(dataResponse.fields.Subtotal);
    array.push(dataResponse.fields.Tax);
    array.push(dataResponse.fields.Tip);
    array.push(dataResponse.fields.Total);

    return array;
  };

  const RenderRow = ({ name, value }: RowProps) => {
    console.log("NAME-VALUE", name + value);
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "#000",
          flexDirection: "row",
          marginHorizontal: 20,
          marginVertical: 20,
          padding: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            backgroundColor: "#eee",
            padding: 5,
          }}
        >
          <Text>{name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            backgroundColor: "#eee",
            padding: 5,
          }}
        >
          <Text>{value}</Text>
        </View>
        {/* <View style={{ flex: 1, alignSelf: "stretch" }}>
          {value.TotalPrice}
        </View> */}
        {/* <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} /> */}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
      <View>
        {generateArray().map((item) => {
          console.log("Item", item);
          return <RenderRow name={item.name} value={item.value} />;
        })}

        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text>{"Back"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
