import React from 'react';

import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface ButtonProps {
  placeHolder: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({placeHolder, onClick}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onClick()} style={styles.button}>
        <Text style={styles.button}>{placeHolder}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#034748',
    color: '#FFFFFF',
    height: 50,
    padding: 5,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Button;
