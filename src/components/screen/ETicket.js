/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Icon, Button, Card, CardItem, Body} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';
// import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

class ETicket extends Component {
  state = {
    data: '',
    status: '',
    payment_code: '',
    store: '',
  };
  componentDidMount() {
    this.setState({data: this.props.navigation.getParam('data')});
    const data = this.props.navigation.getParam('data');
    console.log('taik', this.props.navigation.getParam('data'));
    const order_id = data.order_id;
    axios
      .get(`https://api.sandbox.midtrans.com/v2/${order_id}/status`, {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci12bjlvSjFIS1hDbzN0MWlFV1lid0Jwalc6',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        this.setState({
          status: res.data.transaction_status,
          payment_code: res.data.payment_code,
          store: res.data.store,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const ViewTicket = () => {
      if (this.state.status !== 'pending') {
        return (
          <View style={{padding: 20}}>
            <Card>
              <CardItem>
                <Body>
                  <Text style={{fontWeight: 'bold'}}>
                    Order ID: {this.state.data.order_id}
                  </Text>
                  <Text>Hotel: {this.state.data.hotel}</Text>
                  <Text>Check in: {this.state.data.checkIn}</Text>
                  <Text>Night: {this.state.data.night}</Text>
                  <Text>Visitor: {this.state.data.visitor}</Text>
                  <Text>Room: {this.state.data.room}</Text>
                </Body>
              </CardItem>
            </Card>
          </View>
        );
      }
      if (this.state.status === 'pending') {
        return (
          <>
            <View style={{padding: 20}}>
              <Text>Pay Now !</Text>
              <Text>Payment Method: {this.state.store}</Text>
              <Text>Payment Status: {this.state.status}</Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>
                Payment Code: {this.state.payment_code}
              </Text>
            </View>
          </>
        );
      }
    };
    return <ViewTicket />;
  }
}

export default connect()(ETicket);
