
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, Button } from 'react-native';
import { Icon } from 'native-base';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";

import { getAllHotell, searchHotel } from '../../redux/action/hotel';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        marginHorizontal: 17
    },
    header: {
        marginTop: 10
    },
    search: {
        backgroundColor: '#F5F5F5',
        width: 223,
        borderRadius: 10
    },
    comp1Wrap: {
        flexDirection: 'row'
    },
    headerIcon: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    comp2Wrap: {
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 15
    },

    content: {
        height: 145,
        marginTop: 15
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
        borderColor: '#477FDD',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14
    }
});

class Home extends Component {
    state = {
        name: '',
        city: '',
        isModalVisible: false
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };
    renderRow = ({ item }) => {
        return (
            <View>
                <View style={styles.content}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row' }} >
                            {item.images.map(image => (
                                <TouchableOpacity onPress={this.toggleModal}>
                                    <Image style={{ height: 133, width: 230, borderRadius: 15, marginRight: 5 }} source={{ uri: `${image.img}` }} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <Text style={{ color: '#75797C' }}></Text>
                <Text style={{ fontSize: 18 }}>{item.hotel_name}</Text>
                <Text style={{ color: '#75797C' }}>{item.hotel_location}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HotelDetail', { id_hotel: item.id_hotel })} style={styles.buttonHotel}><Text style={{ color: '#477FDD' }}>Detail Hotel</Text></TouchableOpacity>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={this.toggleModal} />
                        <TextInput placeholder="aaaa" />
                        <TextInput placeholder="aaaa" />
                        <TextInput placeholder="aaaa" />
                    </View>
                </Modal>
            </View>
        )
    }
    async getAllHotell() {
        await this.props.dispatch(getAllHotell());
    }
    componentDidMount() {
        this.getAllHotell();
    }
    sortHotelHadle(event) {
        this.setState({
            city: event
        })
        this.props.dispatch(searchHotel(this.state.name, this.state.city));
    }

    searchHotelHadle = async (event) => {
        await this.setState({
            name: event
        })
        console.log(this.props)
        this.props.dispatch(searchHotel(this.state.name, this.state.city));
    }
    convertToRupiah = (angka) => {
        var rupiah = ''
        var angkarev = angka.toString().split('').reverse().join('')
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return 'IDR. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    }

    render() {
        const { hotels } = this.props;
        console.disableYellowBox = true;
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.wrap}>
                    <View style={styles.header}>
                        <View style={styles.comp1}>
                            <View style={styles.comp1Wrap}>
                                <View style={styles.search}>
                                    <Icon style={{ marginTop: 10, color: '#BDC0C6', position: 'absolute', paddingLeft: 15 }} name="search"></Icon>
                                    <View style={{ borderRadius: 25 }}>
                                        <TextInput onChangeText={this.searchHotelHadle} style={{ placeholderTextColor: '#BDC0C6', paddingLeft: 40 }} placeholder="Hotel Indonesia" />
                                    </View>
                                </View>
                                <View style={styles.headerIcon}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Icon style={{ color: '#BDC0C6', marginLeft: 10 }} name="log-in"></Icon></TouchableOpacity>
                                    <TouchableOpacity><Icon style={{ color: '#BDC0C6', marginLeft: 10 }} name="heart"></Icon></TouchableOpacity>
                                    <TouchableOpacity><Icon style={{ color: '#BDC0C6', marginLeft: 10 }} name="mail"></Icon></TouchableOpacity>
                                </View>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.comp2Wrap}>
                                    {hotels.map(hotel => (
                                        <TouchableOpacity onPress={() => this.sortHotelHadle(`${hotel.city}`)} style={{ marginRight: 8, width: 96, backgroundColor: '#B5207E', justifyContent: 'center', height: 37, borderRadius: 8, paddingLeft: 8 }}>
                                            <Text style={{ color: 'white', fontSize: 15 }}>{hotel.city}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.comp2}></View>
                    </View>
                    <View style={{ height: 450 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={hotels}
                                renderItem={this.renderRow}
                                keyExtractor={(item) => item.id_hotel.toString()}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}><Icon name="home" style={{ fontSize: 30, color: '#57DBE9' }} /><Text style={{ fontSize: 10, marginTop: -5, color: '#57DBE9' }}>Home</Text></TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }} onPress={() => this.props.navigation.navigate('BookingList')}><Icon name="book" style={{ fontSize: 30, color: '#BDC0C6' }} /><Text style={{ fontSize: 10, marginTop: -5, color: '#BDC0C6' }}>Book</Text></TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }} onPress={() => this.props.navigation.navigate('User')}><Icon name="person" style={{ fontSize: 30, color: '#BDC0C6' }} /><Text style={{ fontSize: 10, marginTop: -5, color: '#BDC0C6' }}>Account</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        hotels: state.hotels.hotels
    }
}

export default connect(mapStateToProps)(Home);