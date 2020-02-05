import React from 'react';
import {StyleSheet} from 'react-native';
import Navigator from './navigation/Navigator';
import ContextProvider from './Context/context';

const App = () => {
  return (
    <ContextProvider>
      <Navigator />
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
