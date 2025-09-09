import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from '../components/Header';

interface Props {
  navigation: any;
}

interface MenuOption {
  id: number;
  label: string;
  icon: string;
  screen?: string;
}

const menuOptions: MenuOption[] = [
  { id: 1, label: 'Reservas', icon: 'calendar', screen: 'Reservas' },
  { id: 2, label: 'Câmeras', icon: 'video' }, // Placeholder
  { id: 3, label: 'Avisos', icon: 'bell' },   // Placeholder
  { id: 4, label: 'Denúncia', icon: 'alert-circle', screen: 'Denuncias' },
  { id: 5, label: 'Financeiro', icon: 'currency-usd', screen: 'Financeiro' },
  { id: 6, label: 'Regras', icon: 'book' },  // Placeholder
];

const cardWidth = 90;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMenu, setSelectedMenu] = useState(menuOptions[0].label);

  const renderMenuItem = ({ item }: { item: MenuOption }) => {
    const isSelected = item.label === selectedMenu;

    return (
      <TouchableOpacity
        style={[styles.menuCard, isSelected && styles.menuCardSelected]}
        onPress={() => {
          setSelectedMenu(item.label);
          if (item.screen) {
            navigation.navigate(item.screen);
          }
        }}
      >
        <Icon name={item.icon} size={28} color="#fff" />
        <Text style={styles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        {selectedMenu} ainda não implementado
      </Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <Header username="Usuário de Teste" navigation={navigation} />

      {/* Menu horizontal */}
      <FlatList
        data={menuOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingLeft: 16, paddingVertical: 10 }}
        renderItem={renderMenuItem}
      />

      {/* Conteúdo dinâmico */}
      <View style={styles.content}>
        {!['Câmeras', 'Avisos', 'Regras'].includes(selectedMenu) ? (
          <Text style={styles.placeholderText}>
            Selecione o menu para navegar para a tela correspondente
          </Text>
        ) : (
          renderPlaceholder()
        )}
      </View>
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
  menuCardSelected: { backgroundColor: '#2e59d9' },
  menuLabel: { color: '#fff', marginTop: 6, fontSize: 12, textAlign: 'center' },
  content: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  placeholderContainer: { padding: 16, backgroundColor: '#fff', borderRadius: 8 },
  placeholderText: { textAlign: 'center', fontSize: 16 },
});
