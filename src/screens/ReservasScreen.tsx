import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { fetchAPI } from "../services/api";

interface Reserva {
  id: number;
  area: string;
  data_reserva: string;
  horario_inicio: string;
  horario_fim: string;
  status: string;
}

export default function ReservasScreen() {
  const [area, setArea] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const loadReservas = async () => {
    try {
      const data = await fetchAPI("/reservas");
      setReservas(data);
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  const handleCriar = async () => {
    if (!area || !dataReserva || !horarioInicio || !horarioFim)
      return Alert.alert("Erro", "Preencha todos os campos");
    try {
      await fetchAPI("/reservas", "POST", { area, data_reserva: dataReserva, horario_inicio: horarioInicio, horario_fim: horarioFim });
      setArea(""); setDataReserva(""); setHorarioInicio(""); setHorarioFim("");
      loadReservas();
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  useEffect(() => { loadReservas(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <TextInput placeholder="Área" value={area} onChangeText={setArea} style={styles.input} />
      <TextInput placeholder="Data (YYYY-MM-DD)" value={dataReserva} onChangeText={setDataReserva} style={styles.input} />
      <TextInput placeholder="Início (HH:MM)" value={horarioInicio} onChangeText={setHorarioInicio} style={styles.input} />
      <TextInput placeholder="Fim (HH:MM)" value={horarioFim} onChangeText={setHorarioFim} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text style={styles.buttonText}>Criar Reserva</Text>
      </TouchableOpacity>

      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Reserva }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.area}</Text>
            <Text>Data: {item.data_reserva}</Text>
            <Text>Horário: {item.horario_inicio} - {item.horario_fim}</Text>
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
