import React from "react";
import { RNCamera } from "react-native-camera";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  shutterBorder: {
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  shutter: {
    height: 72 - 12,
    width: 72 - 12,
    borderRadius: (72 - 12) / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  icon: {
    height: 20,
    width: 20,
  },
});

interface CameraState {
  imagUri: string;
}

interface CameraProps {}
interface NavigationProps {
  navigation: StackNavigationProp<any>;
}

export default class Camera extends React.Component<
  CameraProps & NavigationProps,
  CameraState
> {
  static navigationOptions = {
    header: null,
  };

  camera: RNCamera = null;

  constructor(props: CameraProps & NavigationProps) {
    super(props);
    this.state = {
      imagUri: null,
    };
  }

  async onCapture() {
    const { navigation } = this.props;
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      await this.camera
        .takePictureAsync(options)
        .then((data) => {
          this.setState({ imagUri: data.uri });
          console.log("data uri:" + this.state.imagUri);
          navigation.navigate("Preview", { imagUri: data.uri });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } finally {
    }
  }

  private renderCamera = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={"off"}
          captureAudio={false}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        ></RNCamera>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => this.onCapture()}>
            <LinearGradient
              colors={["#30CCD7", "#007EA3"]}
              style={styles.shutterBorder}
            >
              <View style={[styles.shutter]}></View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}>
        {this.renderCamera()}
      </View>
    );
  }
}
