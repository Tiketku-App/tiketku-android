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
import MyHotelScreen from './src/components/screen/Hotel/MyHotel';
import EditUserScreen from './src/components/screen/Account/EditUser';
import ETicket from './src/components/screen/ETicket';
import LoadingScreen from './src/components/screen/Loading';
import ComingSoonScreen from './src/components/screen/ComingSoon/ComingSoon';
import HistoryScreen from './src/components/screen/History/History';

const homeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HotelDetail: HotelDetailScreen,
  BookingList: BookingListScreen,
  User: {
    screen: UserScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditUser: {
    screen: EditUserScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  BookNow: {
    screen: BookNowScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  MyHotel: {
    screen: MyHotelScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ComingSoon: {
    screen: ComingSoonScreen,
    navigationOptions: {},
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {},
  },
  ETicket: {
    screen: ETicket,
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  OtpSession: {
    screen: OtpSessionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  UpdatePassword: {
    screen: UpdatePasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: homeNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
