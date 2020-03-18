import React, {Component} from 'react';
import {Icon} from 'native-base';
import {View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './src/components/redux/store';
import HomeScreen from './src/components/screen/Home/Home';
import LoginScreen from './src/components/screen/Auth/Login';
import RegisterScreen from './src/components/screen/Auth/Register';
import ForgetPasswordScreen from './src/components/screen/Auth/ForgetPassword';
import OtpSessionScreen from './src/components/screen/Auth/OtpSession';
import UpdatePasswordScreen from './src/components/screen/Auth/UpdatePassword';
import HotelDetailScreen from './src/components/screen/Hotel/HotelDetail';
import BookingListScreen from './src/components/screen/Booking/Book';
import UserScreen from './src/components/screen/Account/User';
import BookNowScreen from './src/components/screen/Hotel/BookNow';
import MyHotelScreen from './src/components/screen/Hotel/MyHotel'

const homeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  OtpSession: {
    screen: OtpSessionScreen,
    navigationOptions: {
      header: null,
    },
  },
  UpdatePassword: {
    screen: UpdatePasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  HotelDetail: HotelDetailScreen,
  BookingList: BookingListScreen,
  User: {
    screen: UserScreen,
    navigationOptions: {
      header: null,
    },
  },
  BookNow: {
    screen: BookNowScreen,
    navigationOptions: {
      header: null,
    },
  },
  MyHotel: {
    screen: MyHotelScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
