import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';

class BookNow extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        
      </View>
    );
  }
}

export default BookNow;
