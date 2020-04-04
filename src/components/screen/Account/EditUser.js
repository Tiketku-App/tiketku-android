/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Content,
  Form,
  Item,
  Input,
  Icon,
  ListItem,
  CheckBox,
  Body,
  Picker,
} from 'native-base';
import {connect} from 'react-redux';
import {patchProduct} from '../../redux/action/user';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class EditUser extends Component {
  state = {
    name_user: '',
    email: '',
    address: '',
    gender: '',
    phone_number: '',
  };

  onValueChange = (value) => {
    this.setState({
      gender: value,
    });
  };

  onSubmitEdit = async (id) => {
    var formData = new FormData();
    formData.append('name_user', this.state.name_user);
    formData.append('email', this.state.email);
    formData.append('gender', this.state.gender);
    formData.append('phone_number', parseInt(this.state.phone_number));
    await this.props.dispatch(patchProduct(formData, id));
    this.props.navigation.navigate('User');
  };

  render() {
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor="#57DBE9" />
        <View>
          <Image
            style={{position: 'absolute', width: '100%', height: 700}}
            source={require('../../../img/icon/bg2.png')}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Icon
              name="arrow-back"
              style={{color: 'white', marginLeft: 20, marginTop: 20}}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('User')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 21,
                    marginLeft: 20,
                    fontWeight: 'bold',
                  }}>
                  Edit User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Content style={{paddingHorizontal: 40, marginTop: 45}}>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                placeholderTextColor="#414141"
                style={{color: '#414141'}}
                onChangeText={(text) => this.setState({name_user: text})}
                value={this.state.name_user}
              />
            </Item>
            <Item>
              <Input
                placeholder="Email"
                placeholderTextColor="#414141"
                style={{color: '#414141'}}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
              />
            </Item>
            <Item>
              <Input
                placeholder="Address"
                placeholderTextColor="#414141"
                style={{color: '#414141'}}
                onChangeText={(text) => this.setState({address: text})}
                value={this.state.address}
              />
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                iosHeader="Your Gender"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                onValueChange={this.onValueChange}>
                <Picker.Item label="Man" value="Man" />
                <Picker.Item label="Woman" value="Woman" />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="Phone Number"
                placeholderTextColor="#414141"
                style={{color: '#414141'}}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({phone_number: text})}
                value={this.state.phone_number}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={() => this.onSubmitEdit(this.state.id)}
            style={{
              height: 44,
              backgroundColor: '#57DBE9',
              marginTop: 20,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Simpan</Text>
          </TouchableOpacity>
        </Content>
      </View>
    );
  }
}

const user = (state) => {
  return {
    user: state.users.users[0],
  };
};
export default connect(user)(EditUser);
