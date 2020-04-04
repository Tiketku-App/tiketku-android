/* eslint-disable react-native/no-inline-styles */
import React, {Component, version} from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Footer, FooterTab, Button} from 'native-base';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

class User extends Component {
  logout = async () => {
    await AsyncStorage.clear();
    await this.props.navigation.navigate('Login');
  };
  render() {
    const Avatar = () => {
      if (this.props.user.gender === 'Man') {
        return (
          <Image
            style={{width: 80, height: 80, borderRadius: 40}}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png',
            }}
          />
        );
      } else {
        return (
          <Image
            style={{width: 80, height: 80, borderRadius: 40}}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png',
            }}
          />
        );
      }
    };
    return (
      <View style={styles.wrap}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{marginBottom: 15}}>
              <Icon
                name="arrow-back"
                style={{marginLeft: 20, marginTop: 20, color: '#75797C'}}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginLeft: -40,
              }}>
              <Text style={{fontSize: 20, color: '#75797C'}}>Profile</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View
            style={{height: 230, backgroundColor: 'white', borderRadius: 10}}>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <View
                style={{
                  width: 95,
                  height: 95,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: '#57DBE9',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Avatar />
              </View>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#515151',
                }}>
                {this.props.user.name_user}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditUser')}
                style={{
                  height: 50,
                  backgroundColor: '#57DBE9',
                  paddingHorizontal: 85,
                  marginTop: 10,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                height: 50,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 18}}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                height: 50,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 18}}>Term and condition</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                height: 50,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text onPress={this.logout} style={{fontSize: 18}}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Footer>
          <FooterTab
            style={{
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#f3f3f3',
            }}>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="home" style={{color: '#BDC0C6'}} />
              <Text style={{color: '#BDC0C6', fontSize: 10}}>HOME</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('BookingList')}>
              <Icon name="book" style={{color: '#BDC0C6'}} />
              <Text style={{color: '#BDC0C6', fontSize: 10}}>BOOK</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('ComingSoon')}>
              <Icon name="mail" style={{color: '#BDC0C6'}} />
              <Text style={{color: '#BDC0C6', fontSize: 10}}>INBOX</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('User')}>
              <Icon name="person" style={{color: '#57DBE9'}} />
              <Text style={{color: '#57DBE9', fontSize: 10}}>ACCOUNT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const user = (state) => {
  return {
    user: state.users.users[0],
  };
};
export default connect(user)(User);
