import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import base64 from "react-native-base64";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuth, setAuth] = useState(false);

  function submit() {
    fetch("http://localhost:5000/login", {
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        username: username,
        password: password,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((e) => e.json())
      .then((data) => {
        if (data.success) {
          alert(`${username} you are sucessfully logged in !!`);

          setAuth(true);
        } else {
          setAuth(false);
        }
      });
    // console.log(password);
    // console.log(base64.decode(password));
  }
  // if (!isAuth) {
  return (
    <View style={styles.container}>
      <Text style={styles.login}>LOGIN</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(base64.encode(password))}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={submit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
// } else {
//   return (
//     <View>
//       <Text>{username} is logged in</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    width: "50%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "blue",
  },
});

export default App;
