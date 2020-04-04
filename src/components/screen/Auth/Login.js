/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  AppRegistry,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content, Form, Item, Input, Icon} from 'native-base';
import axios from 'axios';
import {getUser} from '../../redux/action/user';
import {connect} from 'react-redux';
import {URI} from 'react-native-dotenv';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class Login extends Component {
  state = {
    password: '',
    hp: '',
  };
  setStorage = async (id) => {
    const id_user = await AsyncStorage.setItem('id_user', id.toString());
  };
  onLogin = (data) => {
    this.props.dispatch(getUser(parseInt(data.hp)));
    axios
      .post(`${URI}/v1/user/login/`, data)
      .then((res) => {
        this.setStorage(res.data.result.id_user);
        if (res.data.message === 'Wrong Email') {
          return alert('Wrong Phone Number');
        }
        if (res.data.message === 'Login error!') {
          return alert('Wrong Password');
        }
        this.props.navigation.navigate('Loading');
      })
      .catch((err) => {
        alert('Wrong Phone Number/Password');
      });
  };
  render() {
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor="#57DBE9" />
        <Image
          style={{position: 'absolute', width: '100%', height: 700, top: -130}}
          source={require('../../../img/icon/bg.png')}
        />
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: 232, flexDirection: 'row'}}>
              <TouchableOpacity>
                <Text
                  style={{color: '#57DBE9', fontSize: 21, fontWeight: 'bold'}}>
                  Sign In
                </Text>
              </TouchableOpacity>
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
        <Content style={{paddingHorizontal: 40, marginTop: 60}}>
          <Form>
            <Item>
              <Input
                placeholder="Phone Number"
                placeholderTextColor="#57DBE9"
                style={{color: '#989898'}}
                keyboardType={'numeric'}
                onChangeText={(text) => this.setState({hp: text})}
              />
            </Item>
            <Item>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#57DBE9"
                style={{color: '#989898'}}
                onChangeText={(text) => this.setState({password: text})}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={() => this.onLogin(this.state)}
            style={{
              height: 44,
              backgroundColor: '#57DBE9',
              marginTop: 20,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Sign in</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text style={{fontSize: 16, color: '#989898'}}>
                Forget Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </View>
    );
  }
}

export default connect()(Login);
AppRegistry.registerComponent('Login', () => Login);
