import React from "react";
import { RouteProp } from "@react-navigation/native";

import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import RNFetchBlob from "rn-fetch-blob";
import Spinner from "react-native-loading-spinner-overlay";
import { ReceiptDataJson } from "../interfaces/receipt_data";

const styles = StyleSheet.create({
  btnAnalyze: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#30CCD7",
  },
  btnBack: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007EA3",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

interface Previewtate {
  isLoading: boolean;
}

interface PreviewProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<Record<string, object>, string>;
}

const receiptUrl =
  "https://docs.microsoft.com/azure/cognitive-services/form-recognizer/media/contoso-allinone.jpg";

export default class ImagePreview extends React.Component<
  PreviewProps,
  Previewtate
> {
  constructor(props: PreviewProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  async analyzeReceipt(imagUri: string) {
    const url = "http://192.168.43.18:8626/api/receipt";

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const body: any[] = [
      {
        name: "receiptImage",
        filename: "photo.jpg",
        type: "image/png",
        data: RNFetchBlob.wrap(imagUri),
      },
      {
        name: "receiptUrl",
        data: receiptUrl,
      },
    ];
    const promise = new Promise<string>((resolve, reject) => {
      RNFetchBlob.fetch("POST", url, headers, body)
        .then((resp) => {
          console.log(resp.text());
          resolve(resp.text());
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return promise;
  }

  public getReceiptData(imagUri: string) {
    this.setState({ isLoading: true });
    this.analyzeReceipt(imagUri)
      .then((response: string) => {
        this.setState({ isLoading: false });
        const responseObj: ReceiptDataJson = JSON.parse(response);
        this.props.navigation.navigate("ReceiptData", {
          dataResponse: responseObj,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log("Error", error);
      });
  }

  private onPressBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { imagUri } = this.props.route.params as { imagUri: string };

    return (
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        {imagUri && (
          <Image source={{ uri: imagUri }} style={{ flex: 1 }}></Image>
        )}
        <TouchableOpacity
          style={styles.btnAnalyze}
          onPress={() => this.getReceiptData(imagUri)}
        >
          <Text>{"Analyze"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBack} onPress={this.onPressBack}>
          <Text>{"Back"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
