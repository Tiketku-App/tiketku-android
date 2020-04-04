/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content, Form, Item, Input, Icon} from 'native-base';
import {connect} from 'react-redux';
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class OtpSession extends Component {
  state = {
    OTP: '',
  };
  cekOTP = () => {
    console.log('otp', this.props.user.OTP, this.state.OTP);
    if (this.state.OTP === this.props.user.OTP)
      this.props.navigation.navigate('UpdatePassword');
    else {
      alert('OTP Wrong');
    }
  };
  render() {
    return (
      <View style={styles.wrap}>
        <View>
          <Image
            style={{position: 'absolute'}}
            source={require('../../../img/icon/bg.png')}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Icon
              name="arrow-back"
              style={{marginLeft: 20, marginTop: 20, color: 'white'}}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: 171, flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: 'bold',
                  color: '#57DBE9',
                  marginRight: 10,
                }}>
                OTP
              </Text>
              <Text style={{color: 'white', fontSize: 21, fontWeight: 'bold'}}>
                Session
              </Text>
            </View>
          </View>
        </View>
        <Content style={{paddingHorizontal: 40, marginTop: 60}}>
          <Form>
            <Item>
              <Input
                placeholder="Verification Code"
                placeholderTextColor="#57DBE9"
                style={{color: '#989898'}}
                keyboardType={'numeric'}
                onChangeText={text => this.setState({OTP: parseInt(text)})}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={() => this.cekOTP()}
            style={{
              height: 44,
              backgroundColor: '#57DBE9',
              marginTop: 20,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Check</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{fontSize: 16, color: '#989898'}}>
              Didn't Get Code Verification ?
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 16, color: '#989898'}}>
                Click here to resent
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </View>
    );
  }
}

const no_hp = state => {
  return {
    user: state.users.users[0],
  };
};
export default connect(no_hp)(OtpSession);
