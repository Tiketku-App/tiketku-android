/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Icon, Button, Card, CardItem, Body} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';
import Barcode from 'react-native-barcode-builder';
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
      if (this.state.status === 'pending') {
        return (
          <>
            <View
              style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 3,
              }}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>
                Pay Now !
              </Text>
              <Text>Payment Method: {this.state.store}</Text>
              <Text>Payment Status: {this.state.status}</Text>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
                Payment Code: {this.state.payment_code}
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </>
        );
      } else if (this.state.status !== 'pending') {
        return (
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  backgroundColor: 'white',
                  height: 150,
                  justifyContent: 'center',
                }}>
                <View style={{marginBottom: 20}}>
                  <Text style={{fontSize: 18, color: '#BBBBBB'}}>Hotel</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#7A7A7A',
                    }}>
                    {this.state.data.hotel}
                  </Text>
                </View>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 30}}>
                      <Text style={{fontSize: 18, color: '#BBBBBB'}}>
                        Night
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#7A7A7A',
                        }}>
                        {this.state.data.night}
                      </Text>
                    </View>
                    <View style={{marginRight: 30}}>
                      <Text style={{fontSize: 18, color: '#BBBBBB'}}>
                        Visitor
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#7A7A7A',
                        }}>
                        {this.state.data.visitor}
                      </Text>
                    </View>
                    <View style={{marginRight: 25}}>
                      <Text style={{fontSize: 18, color: '#BBBBBB'}}>Room</Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#7A7A7A',
                        }}>
                        {this.state.data.room}
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 15, color: '#BBBBBB'}}>
                        Check in
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#7A7A7A',
                        }}>
                        {this.state.data.checkIn}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: -9,
                    width: 280,
                    backgroundColor: 'white',
                    height: 135,
                  }}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View
                      style={{
                        backgroundColor: '#F2F2F2',
                        height: 15,
                        width: 15,
                        borderRadius: 15 / 2,
                        marginLeft: -5,
                      }}></View>
                    <View style={{flex: 1}}></View>
                    <View
                      style={{
                        backgroundColor: '#F2F2F2',
                        height: 15,
                        width: 15,
                        borderRadius: 15 / 2,
                        marginRight: -7,
                      }}></View>
                  </View>
                  <View style={{}}>
                    <Barcode
                      value={this.state.data.order_id}
                      format="CODE128"
                      width={1}
                      height={65}
                    />
                    <View style={{alignItems: 'center'}}>
                      <Text>{this.state.data.order_id}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }
    };
    return <ViewTicket />;
  }
}

export default connect()(ETicket);
