/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import {Icon, Footer, FooterTab, Button, Text} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import {getAllHotell} from '../../redux/action/hotel';
import {getUser} from '../../redux/action/user';
import {connect} from 'react-redux';
import {URI} from 'react-native-dotenv';
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 17,
    paddingBottom: 15,
  },
  header: {
    marginTop: 10,
  },
  search: {
    backgroundColor: '#F5F5F5',
    width: '89%',
    borderRadius: 10,
  },
  comp1Wrap: {
    flexDirection: 'row',
  },
  headerIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comp2Wrap: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 15,
  },

  content: {
    height: 145,
    marginTop: 15,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHotel: {
    height: 34,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#57DBE9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
});

class Home extends Component {
  state = {
    name: '',
    city: '',
    isModalVisible: false,
    id_user: '',
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  renderRow = ({item}) => {
    return (
      <View style={{marginBottom: 10}}>
        <View style={styles.content}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              {item.images.map((image) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('HotelDetail', {
                      id_hotel: item.id_hotel,
                    })
                  }>
                  <Image
                    style={{
                      height: 133,
                      width: 230,
                      borderRadius: 15,
                      marginRight: 5,
                    }}
                    source={{uri: URI + `${image.img}`}}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('HotelDetail', {
              id_hotel: item.id_hotel,
            })
          }>
          <Text style={{fontSize: 18}}>{item.hotel_name}</Text>
        </TouchableOpacity>
        <Text style={{color: '#75797C'}}>{item.hotel_location}</Text>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1}}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={this.toggleModal} />
            <TextInput placeholder="aaaa" />
            <TextInput placeholder="aaaa" />
            <TextInput placeholder="aaaa" />
          </View>
        </Modal>
      </View>
    );
  };
  state = {
    token: '',
  };
  async getAllHotell() {
    await this.props.dispatch(getAllHotell({}));
  }
  async getUser() {
    await this.props.dispatch(getUser(this.state.id_user));
  }
  componentDidMount() {
    this.cekAuth();
    if (this.props.hotels.length < 1) {
      this.getAllHotell();
    }
    this.getUser();
  }
  logout = async () => {
    await AsyncStorage.removeItem('token');
    await this.props.navigation.navigate('Login');
  };
  cekAuth = async () => {
    const id = await AsyncStorage.getItem('id_user');
    this.setState({id_user: id});
    if (!id || id === null) {
      this.props.navigation.navigate('Login');
    }
  };
  sortHotelHadle(event) {
    this.setState({
      city: event,
    });
    const data = {
      city: event,
    };
    this.props.dispatch(getAllHotell(data));
  }

  searchHotelHadle = (event) => {
    this.setState({
      name: event,
    });
    const data = {
      name: event,
    };
    this.props.dispatch(getAllHotell(data));
  };
  convertToRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
    return (
      'IDR. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('') +
      ',-'
    );
  };

  render() {
    const {hotels} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f3f3f3" />
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <View style={styles.comp1}>
                <View style={styles.comp1Wrap}>
                  <View style={styles.search}>
                    <Icon
                      style={{
                        marginTop: 10,
                        color: '#BDC0C6',
                        position: 'absolute',
                        paddingLeft: 15,
                      }}
                      name="search"
                    />
                    <View style={{borderRadius: 25}}>
                      <TextInput
                        onChangeText={this.searchHotelHadle}
                        style={{
                          placeholderTextColor: '#BDC0C6',
                          paddingLeft: 40,
                        }}
                        placeholder="Hotel Indonesia"
                      />
                    </View>
                  </View>
                  <View style={styles.headerIcon}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ComingSoon')
                      }>
                      <Icon
                        style={{color: '#BDC0C6', marginLeft: 10}}
                        name="heart"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.comp2Wrap}>
                    <TouchableOpacity
                      onPress={() => this.sortHotelHadle(``)}
                      style={{
                        marginRight: 8,
                        width: 96,
                        backgroundColor: '#57DBE9',
                        justifyContent: 'center',
                        height: 37,
                        borderRadius: 8,
                        paddingLeft: 8,
                      }}>
                      <Text style={{color: 'white', fontSize: 15}}>All</Text>
                    </TouchableOpacity>
                    {hotels.map((hotel) => (
                      <TouchableOpacity
                        onPress={() => this.sortHotelHadle(`${hotel.city}`)}
                        style={{
                          marginRight: 8,
                          width: 96,
                          backgroundColor: '#57DBE9',
                          justifyContent: 'center',
                          height: 37,
                          borderRadius: 8,
                          paddingLeft: 8,
                        }}>
                        <Text style={{color: 'white', fontSize: 15}}>
                          {hotel.city}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.comp2}></View>
            </View>
            <View style={{flex: 1}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={hotels}
                  renderItem={this.renderRow}
                  keyExtractor={(item) => item.id_hotel.toString()}
                />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
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
              <Icon name="home" style={{color: '#57DBE9'}} />
              <Text style={{color: '#57DBE9', fontSize: 10}}>HOME</Text>
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
              <Icon name="person" style={{color: '#BDC0C6'}} />
              <Text style={{color: '#BDC0C6', fontSize: 10}}>ACCOUNT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hotels: state.hotels.hotels,
  };
};

export default connect(mapStateToProps)(Home);
