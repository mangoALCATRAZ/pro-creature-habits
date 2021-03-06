import React from 'react';
import {Text, View, Button, StyleSheet} from "react-native";
import * as Google from 'expo-google-app-auth';

export default function GoogleSignUpScreen({navigation}){

    async function signInWithGoogleAsync() {
      try {
        const {type, accessToken, user}= await Google.logInAsync({
          androidClientId: "489655790104-u3khmnkeu41a64q17ljo8eq690tssn9k.apps.googleusercontent.com",
          iosClientId: "489655790104-u87055rljdeslrcfktqvjp18c622g2ma.apps.googleusercontent.com",
        });

        if (type === 'success') {
          console.log("success")
          console.log(user, accessToken);

        } else {
          return { cancelled: true };
        }
      } catch (e) {
        console.log("error")
        return { error: true };
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    const SignInWithGoogle = () => {
        signInWithGoogleAsync()
    }

    return (
      <View style={styles.container}>
        <Button onPress={() => SignInWithGoogle()} title="Sign in with Google" />
      </View>
    )
  }
