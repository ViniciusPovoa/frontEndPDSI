import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { fetchAPI } from "../services/api";

interface Pagamento {
  id: number;
  descricao: string;
  valor: number;
  status: string;
  vencimento: string;
}

export default function FinanceiroScreen() {
  const [financeiro, setFinanceiro] = useState<Pagamento[]>([]);

  const loadFinanceiro = async () => {
    try {
      const data = await fetchAPI("/financeiro");
      setFinanceiro(data);
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  useEffect(() => { loadFinanceiro(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pagamentos</Text>
      <FlatList
        data={financeiro}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Pagamento }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.descricao}</Text>
            <Text>Valor: R$ {item.valor}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Vencimento: {item.vencimento}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  itemTitle: { fontWeight: "bold" },
});
