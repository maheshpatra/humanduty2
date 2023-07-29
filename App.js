import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Route from './screens/navigation/Route/Index'

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#3b86ff'} style="light" />
      <Route />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
