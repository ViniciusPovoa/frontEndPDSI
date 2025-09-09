import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { fetchAPI } from "../services/api";

interface Ocorrencia {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
}

export default function OcorrenciasScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  const loadOcorrencias = async () => {
    try { const data = await fetchAPI("/ocorrencias"); setOcorrencias(data); }
    catch (err: any) { Alert.alert("Erro", err.message); }
  };

  const handleCriar = async () => {
    if (!titulo) return Alert.alert("Erro", "Título obrigatório");
    try { await fetchAPI("/ocorrencias", "POST", { titulo, descricao }); setTitulo(""); setDescricao(""); loadOcorrencias(); }
    catch (err: any) { Alert.alert("Erro", err.message); }
  };

  useEffect(() => { loadOcorrencias(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Ocorrências</Text>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleCriar}><Text style={styles.buttonText}>Criar Ocorrência</Text></TouchableOpacity>

      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Ocorrencia }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "#2980b9", padding: 15, borderRadius: 5, marginBottom: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  itemTitle: { fontWeight: "bold" },
});
