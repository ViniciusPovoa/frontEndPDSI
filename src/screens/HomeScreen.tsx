import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { ReservationCard } from '../components/ReservationCard';
//import { ReservationCard } from '../components/ReservationCard';
export const HomeScreen: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.root}>
      <Header username="Usuário de Teste" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <ReservationCard
          name="Reserva 1"
          unavailableDates={['04/09/2025', '05/09/2025']}
          imgURL="https://tocas-ui.com/5.0/en-us/assets/images/16-9.png"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend augue sed justo mattis, et "
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f6fa' },
  scrollContent: { padding: 16 },
  mt: { marginTop: 8 },
});
