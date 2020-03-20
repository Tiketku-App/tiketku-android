import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
} from 'native-base';

class BookNow extends Component {
  state = {
    isModalVisible: false,
    nextdaymilsec: '',
    checkIn: '',
    checkOut: '',
    room: '1',
    visitor: '1',
    night: '1',
    hotelData: '',
    tPrice: 0,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  setDate = e => {
    this.setState({checkIn: e});
  };

  changeVisitor = e => {
    this.setState({visitor: e});
  };

  changeRoom = e => {
    this.setState({room: e});
  };

  changeNight = e => {
    this.setState({night: e});
  };

  checkout = () => {
    var name = this.props.user.name_user;
    var hp = this.props.user.phone_number;
    var email = this.props.user.email;
    console.log(name, hp, email, 'hsdvfsfdakdv');
    var tPrice =
      parseInt(this.state.hotelData.hotel_price) *
      parseInt(this.state.night) *
      parseInt(this.state.room);
    var quantity = parseInt(this.state.night) * parseInt(this.state.room);
    console.log(tPrice);
    const body = {
      payment_type: 'cstore',
      transaction_details: {
        gross_amount: parseInt(tPrice),
        order_id: `tiketku-${new Date().getTime()}`,
      },
      customer_details: {
        email: 'noreply@example.com',
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
    // alert('Thank U');
    axios
      .post(`https://api.sandbox.midtrans.com/v2/charge`, body, {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci12bjlvSjFIS1hDbzN0MWlFV1lid0Jwalc6',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        res.data.hotel = this.state.hotelData.hotel_name;
        res.data.address = this.state.hotelData.hotel_location;
        res.data.cover = this.state.hotelData.hotel_cover;
        res.data.visitor = this.state.visitor;
        res.data.room = this.state.room;
        res.data.night = this.state.night;
        res.data.checkIn = this.state.checkIn.toString().substr(4, 12);
        this.props.dispatch(postBook(res.data));
        this.props.navigation.navigate('BookingList');
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.setState({
      hotelData: this.props.navigation.getParam('data'),
    });
  }

  render() {
    const hotel = this.props.navigation.getParam('data');
    return (
      <Content>
        <Content style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Text style={{fontWeight: 'bold'}}>{hotel.hotel_name}</Text>
          <Form>
            <Item picker>
              <Text>Check In</Text>
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
            <Item picker>
              <Text>Visitor : </Text>
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
            <Item picker>
              <Text>Room : </Text>
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
            <Item picker>
              <Text>Night : </Text>
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
            style={{justifyContent: 'center', marginTop: 10}}
            onPress={this.checkout}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Checkout</Text>
          </Button>
        </Content>
      </Content>
    );
  }
}

const user = state => {
  return {
    user: state.users.users[0],
  };
};
export default connect(user)(BookNow);
