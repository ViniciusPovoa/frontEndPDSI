import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
//import { ReservationCard } from '../components/ReservationCard';
export const HomeScreen: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.root}>
      <Header username="Usuário de Teste" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="Welcome">
          <Text>This is a simple example screen structure.</Text>
          <Text style={styles.mt}>
            You can place reusable UI pieces in the components folder and page-level
            layouts in the screens folder.
          </Text>
        </Card>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 16,
  },
  mt: {
    marginTop: 8,
  },
  bullet: {
    marginTop: 4,
  }
});
