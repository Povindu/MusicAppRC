import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.push("/homeScreen");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Text style={styles.subTitle}>Username</Text>
      <TextInput
        style={styles.inputName}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="white"
      />
      <Text style={styles.subTitle}>Password</Text>
      <View style={styles.pass}>
        <TextInput
          style={styles.inputPass}
          placeholder="Password"
          {...(showPassword
            ? { secureTextEntry: false }
            : { secureTextEntry: true })}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="white"
          onPress={toggleShowPassword}
        />
        <Pressable style={styles.pass} onPress={toggleShowPassword}>
          <Text style={styles.passText}>Show</Text>
        </Pressable>
      </View>

      <Text style={styles.subTitle2}>Forgot your password?</Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={styles.subTitle3}>or continue with</Text>
      <View style={styles.socialIcons}>
        <Pressable>
          <Image
            style={styles.fblogo}
            source={require("../assets/images/facebook.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={styles.googleLogo}
            source={require("../assets/images/search.png")}
          />
        </Pressable>
      </View>

      <Text style={styles.subTitle3}>
        By continuining, you agree to our Terms of Services, privacy policy
      </Text>
      <View style={styles.footer}>
        <Text style={styles.subTitle4}>Not have an account yet? </Text>
        <Text style={styles.subTitle5}> Join Us</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#111111",
    height: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#9ca3af",
  },
  inputName: {
    backgroundColor: "#3a3c3f",
    padding: 15,
    marginBottom: 30,
    fontSize: 18,
    color: "white",
  },
  inputPass: {
    backgroundColor: "#3a3c3f",
    padding: 15,
    marginBottom: 30,
    fontSize: 18,
    color: "white",
    width: "80%",
  },
  logo: {
    marginTop: 0,
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  fblogo: {
    marginTop: 0,
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 10,
  },
  googleLogo: {
    marginLeft: 10,
    marginTop: 0,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 2,
    textAlign: "left",
    color: "#9ca3af",
  },
  subTitle2: {
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 2,
    marginTop: -20,
    textAlign: "left",
    color: "#9ca3af",
  },
  pass: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passText: {
    fontSize: 18,
    color: "#FBBC05",
    padding: 15,
    backgroundColor: "#3a3c3f",
    marginBottom: 30,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#FBBC05",
    padding: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  subTitle3: {
    fontSize: 14,
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 2,
    textAlign: "center",
    color: "white",
  },
  subTitle4: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 2,
    textAlign: "center",
    color: "white",
  },
  subTitle5: {
    fontSize: 16,
    marginTop: 25,
    marginLeft: 2,
    textAlign: "center",
    color: "#FBBC05",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
