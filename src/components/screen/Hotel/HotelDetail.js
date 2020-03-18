/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {hotelDetail} from '../../redux/action/hotel';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageWrapCov: {
    height: 316,
  },
  content: {
    marginHorizontal: 18,
  },
  content1: {
    height: 108,
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#CFCECE',
  },
  footer: {
    backgroundColor: '#F6F6F6',
    height: 60,
  },
});

class HotelDetail extends Component {
  static navigationOptions = {
    title: 'Favehotel Padjajaran Bogor',
    headerStyle: {
      backgroundColor: '#57DBE9',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 18,
    },
  };
  componentDidMount() {
    const id = this.props.navigation.getParam('id_hotel');
    console.log('sini', id);
    console.log(id);
    this.props.dispatch(hotelDetail(id));
  }
  convertToRupiah = angka => {
    var rupiah = '';
    var angkarev = angka
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
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
    console.log(this.props.hotel.hotel_cover);
    const hotels = this.props.hotel;
    const DetailView = () => {
      if (hotels.images) {
        return (
          <>
            <ScrollView>
              <View style={styles.imageWrapCov}>
                <Image
                  style={{width: '100%', height: 246}}
                  source={{uri: `${hotels.hotel_cover}`}}
                />
                <View style={styles.images}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{marginTop: 1, flexDirection: 'row'}}>
                      {hotels.images.map(image => (
                        <TouchableOpacity>
                          <Image
                            style={{height: 70, width: 91, marginRight: 5}}
                            source={{uri: `${image.img}`}}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View style={styles.content}>
                <View style={styles.content1}>
                  <Text style={{color: '#565656', marginBottom: 8}}>
                    {this.convertToRupiah(hotels.hotel_price)}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginBottom: 5,
                      color: '#5A5A5A',
                    }}>
                    {hotels.hotel_name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      style={{color: '#BDC0C6', fontSize: 20, marginRight: 10}}
                      name="compass"
                    />
                    <Text style={{color: '#565656'}}>
                      {hotels.hotel_location}
                    </Text>
                  </View>
                </View>
                <View style={styles.content1}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#5A5A5A',
                      marginBottom: 15,
                    }}>
                    Check In/Check Out Time
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 8,
                    }}>
                    <Text>Check In Time</Text>
                    <Text>13.00</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Check Out Time</Text>
                    <Text>12.00</Text>
                  </View>
                </View>
                <View style={{marginBottom: 30, marginTop: 15}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#5A5A5A',
                      marginBottom: 15,
                    }}>
                    Description
                  </Text>
                  <Text style={{color: '#5A5A5A'}}>
                    {hotels.hotel_description}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <View style={{justifyContent: 'center', flex: 1}}>
                <View
                  style={{
                    marginHorizontal: 18,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 19,
                        color: '#57DBE9',
                        fontWeight: 'bold',
                      }}>
                      {this.convertToRupiah(hotels.hotel_price)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('BookNow')}
                    style={{
                      height: 36,
                      width: 114,
                      backgroundColor: '#57DBE9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        );
      } else {
        return <View></View>;
      }
    };
    return (
      <View style={styles.wrap}>
        <DetailView />
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    hotel: state.hotels.hotel,
  };
};

export default connect(mapStateToProps)(HotelDetail);
