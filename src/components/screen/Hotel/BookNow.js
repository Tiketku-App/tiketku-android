import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {postBook} from '../../redux/action/booking';
import axios from 'axios';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  DatePicker,
  Button,
  Left,
  Body,
} from 'native-base';
import Data from '../../Global';
import {URI} from 'react-native-dotenv';

class BookNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      nextdaymilsec: '',
      checkIn: '',
      checkOut: '',
      room: '1',
      visitor: '1',
      night: '1',
      hotelData: '',
      tPrice: 0,
      cover: this.props.navigation.getParam('cover'),
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  setDate = (e) => {
    this.setState({checkIn: e});
  };

  changeVisitor = (e) => {
    this.setState({visitor: e});
  };

  changeRoom = (e) => {
    this.setState({room: e});
  };

  changeNight = (e) => {
    this.setState({night: e});
  };

  checkout = () => {
    if (this.state.checkIn.length < 1) {
      Alert.alert('Check In', 'Please select date for check in');
    } else {
      const {name, hp, email} = this.props.user;
      var tPrice =
        parseInt(this.state.hotelData.hotel_price) *
        parseInt(this.state.night) *
        parseInt(this.state.room);
      var quantity = parseInt(this.state.night) * parseInt(this.state.room);
      const body = {
        payment_type: 'cstore',
        transaction_details: {
          gross_amount: parseInt(tPrice),
          order_id: `tiketku-${new Date().getTime()}`,
        },
        customer_details: {
          email: email,
          first_name: 'Tn/Ny',
          last_name: name,
          phone: hp,
        },
        item_details: [
          {
            id: `${this.state.hotelData.id_hotel}`,
            price: parseInt(this.state.hotelData.hotel_price),
            quantity: quantity,
            name: `${this.state.hotelData.hotel_name}`,
          },
        ],
        cstore: {
          store: 'Indomaret',
          message: 'Message to display',
        },
      };
      axios
        .post(`https://api.sandbox.midtrans.com/v2/charge`, body, {
          headers: {
            Accept: 'application/json',
            Authorization:
              'Basic U0ItTWlkLXNlcnZlci12bjlvSjFIS1hDbzN0MWlFV1lid0Jwalc6',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const data = {
            hotel: this.state.hotelData.hotel_name,
            address: this.state.hotelData.hotel_location,
            cover: this.state.hotelData.hotel_cover,
            visitor: this.state.visitor,
            room: this.state.room,
            night: this.state.night,
            checkIn: this.state.checkIn.toString().substr(4, 12),
            order_id: res.data.order_id,
            id_user: this.state.id_user,
            gross_amount: res.data.gross_amount,
            payment_code: res.data.payment_code,
            store: res.data.store,
          };
          this.props.dispatch(postBook(data));
          this.props.navigation.navigate('BookingList');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  cekAuth = async () => {
    const id = await AsyncStorage.getItem('id_user');
    this.setState({id_user: id});
    if (!id || id === null) {
      this.props.navigation.navigate('Login');
    }
  };
  componentDidMount() {
    this.setState({
      hotelData: this.props.navigation.getParam('data'),
    });
    this.cekAuth();
  }

  render() {
    const hotel = this.props.navigation.getParam('data');
    return (
      <Container>
        <Header style={{backgroundColor: '#57DBE9'}}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: '#fff', marginLeft: 15}} />
            </TouchableOpacity>
          </Left>
          <Body></Body>
        </Header>
        <StatusBar backgroundColor="#57DBE9" />
        <Content style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Image
            style={{width: '100%', height: 200, borderRadius: 10}}
            source={{uri: URI + this.state.cover}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {hotel.hotel_name}
          </Text>
          <Form>
            <Item picker style={{marginTop: 25}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Check In</Text>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Select date"
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <Item picker style={{marginTop: 15}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Visitor : </Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Visitor"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.visitor}
                onValueChange={this.changeVisitor}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </Item>
            <Item picker style={{marginTop: 15}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Room : </Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Visitor"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.room}
                onValueChange={this.changeRoom}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </Item>
            <Item picker style={{marginTop: 15}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Night : </Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Visitor"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.night}
                onValueChange={this.changeNight}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </Item>
          </Form>
          <Button
            rounded
            style={{
              justifyContent: 'center',
              marginTop: 20,
              backgroundColor: '#57DBE9',
            }}
            onPress={this.checkout}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                width: '100%',
                textAlign: 'center',
              }}>
              Checkout
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const user = (state) => {
  return {
    user: state.users.users[0],
  };
};
export default connect(user)(BookNow);
