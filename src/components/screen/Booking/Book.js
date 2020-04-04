/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Button, Footer, FooterTab} from 'native-base';
import {connect} from 'react-redux';
// import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrap: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 13,
    flexDirection: 'row',
    padding: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class BookList extends Component {
  static navigationOptions = {
    title: 'Booking',
    headerTintColor: '#57DBE9',
    headerTitleStyle: {
      fontSize: 18,
    },
  };
  etiket = (e) => {
    this.props.navigation.navigate('ETicket', {
      data: e,
    });
  };
  render() {
    const BookView = () => {
      if (this.props.book) {
        return (
          <>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f3f3" />
            {this.props.book.map((data) => (
              <View style={styles.card}>
                <View>
                  <Text style={{marginTop: 15, fontSize: 17}}>
                    {' '}
                    {data.hotel}
                  </Text>
                  <Text style={{marginTop: 10, fontSize: 13, color: '#565656'}}>
                    {' '}
                    IDR {data.gross_amount}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon
                      style={{color: '#BDC0C6', fontSize: 20, marginRight: 10}}
                      name="locate"
                    />
                    <Text style={{color: '#565656', forntSize: 15}}>
                      {data.address}
                    </Text>
                  </View>
                  <Text>Payment Code: {data.payment_code}</Text>
                  <Text style={{fontWeight: 'bold'}}>
                    Payment Method: {data.store}
                  </Text>
                  <Button
                    onPress={() => this.etiket(data)}
                    rounded
                    small
                    bordered
                    info
                    style={{
                      justifyContent: 'center',
                      marginRight: 100,
                      marginLeft: 75,
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center',
                      }}>
                      E-Ticket
                    </Text>
                  </Button>
                </View>
              </View>
            ))}
          </>
        );
      }
    };
    return (
      <View style={styles.wrap}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <BookView />
          </ScrollView>
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
              <Icon name="book" style={{color: '#57DBE9'}} />
              <Text style={{color: '#57DBE9', fontSize: 10}}>BOOK</Text>
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
      </View>
    );
  }
}

const book = (state) => {
  return {
    book: state.booking.booking,
  };
};
export default connect(book)(BookList);
