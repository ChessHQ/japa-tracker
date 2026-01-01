import { getUserData, createUserAccount, userLogin } from "@/api/db_queries";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@react-navigation/elements";
import { ThemeProvider, useRoutePath } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  enum formState {
    LOGIN,
    SIGNUP,
  }

  // Current page - either login or create new account
  const [page, setPage] = useState<formState>(formState.LOGIN);
  // Current user
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  // for testing purposes
  const [userData, setUserData] = useState<string>();
  // Username and pwd
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  // For messages to user
  const [showLoginError, setShowLoginError] = useState<boolean>();
  const [showLoginConfirmation, setShowLoginConfirmation] = useState<boolean>();

  const useUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  const handleSubmitNewAccount = async () => {
    if (username && password) {
      createUserAccount(username, password);
      setUserName("");
      setPassword("");
      setShowLoginError(false);
      setShowLoginConfirmation(true);
    } else {
      setShowLoginError(true);
    }
  };

  const handleUserLogin = async () => {
    if (username && password) {
      userLogin(username, password);
      setUserName("");
      setPassword("");
      console.log("current user should be set to: ", username);
      setCurrentUser(username);
      setShowLoginConfirmation(true);
    }
  };

  const handleCreateAccountPage = () => {
    setPage(formState.SIGNUP);
  };

  const handleLoginPage = () => {
    setPage(formState.LOGIN);
  };

  useEffect(() => {
    useUserData();
  }, [getUserData]);

  const userProfile = () => {
    const profileButton = currentUser ? (
      <button>{currentUser}</button>
    ) : (
      <button onClick={handleLoginPage}>Login</button>
    );
    return profileButton;
  };

  return page === formState.LOGIN ? (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0a8031ff", dark: "#0a8031ff" }}
      headerImage={<Image></Image>}
    >
      {userProfile()}
      <ThemedText type="title">Login</ThemedText>
      <View style={styles.flexContainer}>
        <input
          style={styles.inputField}
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        ></input>
        <input
          style={styles.inputField}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </View>
      <button onClick={handleUserLogin} style={styles.button}>
        Login
      </button>
      <button onClick={handleCreateAccountPage} style={styles.button}>
        I don't have an account
      </button>
    </ParallaxScrollView>
  ) : (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0a8031ff", dark: "#0a8031ff" }}
      headerImage={<Image></Image>}
    >
      {userProfile()}
      <ThemedText type="title">Create Account</ThemedText>
      <View style={styles.flexContainer}>
        <input
          style={styles.inputField}
          placeholder="enter new username"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        ></input>
        <input
          style={styles.inputField}
          placeholder="enter new password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        {showLoginError && (
          <text style={styles.loginMessage}>
            User must provide both username and password
          </text>
        )}
        {showLoginConfirmation && (
          <text style={styles.loginMessage}>Account created!</text>
        )}
        <button onClick={handleSubmitNewAccount} style={styles.button}>
          Submit
        </button>
      </View>
      <button onClick={handleLoginPage} style={styles.button}>
        Login
      </button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
  },
  inputField: {
    width: 200,
    fontSize: 18,
  },
  flexContainer: {
    flex: 1,
  },
  loginMessage: {
    color: "white",
  },
});
