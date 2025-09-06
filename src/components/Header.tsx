import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface HeaderProps {
  username: string;
  navigation: any;
}

export const Header: React.FC<HeaderProps> = ({ username: username, navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.greet}>{`Olá, ${username}`}</Text>
        <Image source={require('../../assets/imgs/Icon.png')} style={styles.iconBell} />
        <TouchableOpacity onPress={() => { navigation.navigate('Profile')}}>
          <Text style={styles.profileRedirect}>{`Ver meu perfil >`}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
//100% of width with transparent background, Greet User(text)-LEFT aligned, notfication icon-RIGHT aligned
//see profile text with > left aligned, bellow the greet
    container:
    {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8
    },
    greet:
    {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
    marginLeft: 16,
    },
    iconBell:
    {
    width: 26,
    height: 30,
    position: 'absolute',
    right: 16,
    top: 16,
    resizeMode: 'contain',
    },
    profileRedirect:
    {
        fontSize: 14,
        fontWeight: '600',
        color: '#00457E',
        textAlign: 'left',
        marginLeft: 16,
        marginTop: 4
    }

});
