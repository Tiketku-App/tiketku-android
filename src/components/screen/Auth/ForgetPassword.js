/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content, Form, Item, Input, Icon} from 'native-base';
import {getUser} from '../../redux/action/user';
import {connect} from 'react-redux';
import axios from 'axios';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class ForgetPassword extends Component {
  state = {
    hp: '',
  };
  checkNumber = () => {
    const hp = {hp: this.state.hp};
    axios
      .post(`http://192.168.1.39:8282/v1/user/forgot`, hp)
      .then(res => {
        console.log(res);
        if (res.data.message === 'Phone number not Found') {
          return alert('Phone number not registered');
        } else {
          this.props.dispatch(getUser(parseInt(this.state.hp)));
          this.props.navigation.navigate('OtpSession');
        }
      })
      .catch(err => {
        console.log(err);
      });
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
                Forget
              </Text>
              <Text style={{color: 'white', fontSize: 21, fontWeight: 'bold'}}>
                Password
              </Text>
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
                onChangeText={text => this.setState({hp: text})}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={() => this.checkNumber()}
            style={{
              height: 44,
              backgroundColor: '#57DBE9',
              marginTop: 20,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Next Step</Text>
          </TouchableOpacity>
        </Content>
      </View>
    );
  }
}

export default connect()(ForgetPassword);
