//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import firebase from 'react-native-firebase';


// create a component
class CreateMachine extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text>CreateMachine</Text>
            <TextInput
              name="titulo"
              style={styles.textInput}
              value={this.state.title} 
              placeholder='Título'
              
            />
         </View>
      );
   }
}

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
   },
});

//make this component available to the app
export default CreateMachine;
