/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content, Form, Item, Input, Icon} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class UpdatePassword extends Component {
  state = {
    new_password: '',
  };
  createNewPass = () => {
    const data = {
      new_password: this.state.new_password,
      hp: this.props.user.phone_number,
    };
    axios
      .patch(`http://192.168.1.39:8282/v1/user/changepass`, data)
      .then(res => {
        alert('Success update password');
        this.props.navigation.navigate('Login');
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
                Create
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
                secureTextEntry={true}
                placeholder="New Password"
                placeholderTextColor="#57DBE9"
                style={{color: '#989898'}}
                onChangeText={text => this.setState({new_password: text})}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={this.createNewPass}
            style={{
              height: 44,
              backgroundColor: '#57DBE9',
              marginTop: 20,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Create</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}></View>
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
export default connect(no_hp)(UpdatePassword);
