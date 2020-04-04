import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
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
  Header,
  Left,
} from 'native-base';
import axios from 'axios';
import {URI} from 'react-native-dotenv';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class Register extends Component {
  state = {
    name_user: '',
    email: '',
    address: '',
    gender: '',
    phone_number: '',
    password: '',
  };

  genderChange = (value) => {
    this.setState({
      gender: value,
    });
  };

  onRegister = (data) => {
    axios.post(`${URI}/v1/user/register/`, data).then((res) => {
      console.log(res);
      Alert.alert('success', 'Your have been registered');
      this.props.navigation.navigate('Login');
    });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#57DBE9" />
        <View style={styles.wrap}>
          <Image
            style={{position: 'absolute', width: '100%', height: 700}}
            source={require('../../../img/icon/bg2.png')}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Icon
              name="arrow-back"
              style={{color: 'white', marginLeft: 30, marginTop: 10}}
            />
          </TouchableOpacity>
          <View style={{marginTop: 120}}>
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 21,
                      marginLeft: 20,
                      fontWeight: 'bold',
                    }}>
                    Sign Up
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
                />
              </Item>
              <Item>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#414141"
                  style={{color: '#414141'}}
                  onChangeText={(text) => this.setState({email: text})}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Address"
                  placeholderTextColor="#414141"
                  style={{color: '#414141'}}
                  onChangeText={(text) => this.setState({address: text})}
                />
              </Item>
              <Item>
                <Picker
                  mode="dropdown"
                  iosHeader="Your Gender"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  selectedValue={this.state.gender}
                  onValueChange={this.genderChange}>
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
                />
              </Item>
              <Item>
                <Input
                  secureTextEntry
                  placeholder="Password"
                  placeholderTextColor="#414141"
                  onChangeText={(text) => this.setState({password: text})}
                />
              </Item>
            </Form>
            <TouchableOpacity
              onPress={() => this.onRegister(this.state)}
              style={{
                height: 44,
                backgroundColor: '#57DBE9',
                marginTop: 20,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 20}}>Sign up</Text>
            </TouchableOpacity>
          </Content>
        </View>
      </>
    );
  }
}

export default Register;
