import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import Scan from './src/components/Scan';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Scan/>
    </>
  );
};

export default App;
