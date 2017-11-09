import React, { Component } from 'react';
import { View, Platform, Image } from 'react-native';
import Expo from 'expo';
import KeysButtons from '../Components/KeysButtons';
import icon from '../assets/icons/pure-icon.png';
import { STATUS_BAR_HEIGHT } from '../constants';


const chacheImages = images => images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Expo.Asset.fromModule(image).downloadAsync();
  });

class MainScreen extends Component {
    static navigationOptions = () => ({
        title: 'Capo Keys',
        headerStyle: {
          height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
          backgroundColor: '#2196F3'
        },
        headerTitleStyle: {
          marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
          color: 'white'
        },
        headerLeft: ( 
          <Image
            source={icon}
            style={style.imageStyle}
          />
        )
    });

    state = {
      appIsReady: false
    }

    ComponentWillMount() {
      this._loadAssetsAsync();
    }
    async _loadAssetsAsync() {
      const imageAssets = chacheImages([images])
      await Promise.all([...imageAssets]);
      this.setState({ appIsReady: true });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ddd' }}>
             <KeysButtons/>
            </View>
          );
    }
}

const style = {
  imageStyle: {
    marginTop: 20,
    marginLeft: 10,
    width: 40,
    height: 40
  }
};

export default MainScreen;
