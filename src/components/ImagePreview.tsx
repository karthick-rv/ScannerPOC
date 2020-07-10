import React from 'react';
import {RouteProp} from '@react-navigation/native';

import {Image, TouchableOpacity, View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

interface PreviewProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<Record<string, object>, string>;
}

const receiptUrl =
  'https://docs.microsoft.com/azure/cognitive-services/form-recognizer/media/contoso-allinone.jpg';

export default class ImagePreview extends React.Component<PreviewProps, {}> {
  async analyzeReceipt(imagUri: String) {
    const image = {
      uri: imagUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    };

    const data = new FormData();
    data.append('receiptImage', image);
    data.append('receiptUrl', receiptUrl);

    const settings = {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const fetchResponse = await fetch(
        `http://192.168.43.18:8626/api/receipt`,
        settings,
      );
      console.log('DATA', fetchResponse);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      console.log('ERROR', e);
      return e;
    }
  }

  private onPressBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {imagUri} = this.props.route.params as {imagUri: string};

    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
        {imagUri && <Image source={{uri: imagUri}} style={{flex: 1}}></Image>}
        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#30CCD7',
          }}
          onPress={() => this.analyzeReceipt(imagUri)}>
          <Text>{'Analyze'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#007EA3',
          }}
          onPress={this.onPressBack}>
          <Text>{'Back'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
