import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Header } from '../components/Header';
import { ReservationCard } from '../components/ReservationCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuOptions = [
  { id: 1, label: 'Reservas', icon: 'calendar' },
  { id: 2, label: 'Câmeras', icon: 'video' },
  { id: 3, label: 'Avisos', icon: 'bell' },
  { id: 4, label: 'Denúncia', icon: 'alert-circle' },
  { id: 5, label: 'Financeiro', icon: 'currency-usd' },
  { id: 6, label: 'Regras', icon: 'book' },
];

const cardWidth = 90;

export const HomeScreen: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuOptions[0].label);

  const renderMenuItem = ({ item }: any) => {
    const isSelected = item.label === selectedMenu;

    return (
      <TouchableOpacity
        style={[styles.menuCard, isSelected && styles.menuCardSelected]}
        onPress={() => setSelectedMenu(item.label)}
      >
        <Icon name={item.icon} size={28} color="#fff" />
        <Text style={styles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <Header username="Usuário de Teste" />

      {/* Carrossel horizontal */}
      <FlatList
        data={menuOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingLeft: 16, paddingVertical: 10 }}
        renderItem={renderMenuItem}
      />

      {/* Conteúdo dinâmico */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {selectedMenu === 'Reservas' && (
          <ReservationCard
            name="Reserva 1"
            unavailableDates={['04/09/2025', '05/09/2025']}
            imgURL="https://tocas-ui.com/5.0/en-us/assets/images/16-9.png"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend augue sed justo mattis..."
          />
        )}

        {selectedMenu === 'Câmeras' && (
          <Text style={styles.placeholder}>Visualização das câmeras</Text>
        )}

        {selectedMenu === 'Avisos' && (
          <Text style={styles.placeholder}>Aqui vão os avisos do condomínio</Text>
        )}

        {selectedMenu === 'Denúncia' && (
          <Text style={styles.placeholder}>Formulário de denúncia</Text>
        )}

        {selectedMenu === 'Financeiro' && (
          <Text style={styles.placeholder}>Informações financeiras</Text>
        )}

        {selectedMenu === 'Regras' && (
          <Text style={styles.placeholder}>Regras do condomínio</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f6fa' },
  menuCard: {
    width: cardWidth,
    height: 80,
    backgroundColor: '#4e73df',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuCardSelected: {
    backgroundColor: '#2e59d9',
  },
  menuLabel: {
    color: '#fff',
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
  scrollContent: { padding: 16 },
  placeholder: {
    fontSize: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
});
