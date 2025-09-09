import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  console.log("Tentando login com:", { email, password });

  if (!email || !password) {
    console.log("Campos vazios");
    Alert.alert("Erro", "Preencha todos os campos");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("Resposta recebida:", res);

    let data;
    try {
      data = await res.json();
      console.log("Body da resposta:", data);
    } catch (jsonErr) {
      console.log("Erro ao parsear JSON:", jsonErr);
      Alert.alert("Erro", "Resposta inválida do servidor");
      return;
    }

    if (res.ok) {
      console.log("Login OK");
      Alert.alert("Sucesso", `Bem-vindo ${data.email}`);
      navigation.navigate("Home");
    } else {
      console.log("Erro da API:", data);
      Alert.alert("Erro", data.message || "Erro ao fazer login");
    }
  } catch (err) {
    console.log("Erro no fetch:", err);
    Alert.alert("Erro", "Não foi possível conectar ao servidor");
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Entre com sua conta</Text>

          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>Não tem conta? Registre-se</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50 },
  button: {
    backgroundColor: '#2980b9',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerLink: {
    marginTop: 15,
    alignSelf: 'center',
  },
  registerText: {
    color: '#2980b9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
