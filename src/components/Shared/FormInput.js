import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15
  },
  input: {
    color: '#616161'
  },
  labelStyle: {
    color: '#424242'
  },
  iconStyle: {
    marginRight: 10
  },
  errorContainer: {
    margin: 0,
    marginLeft: 25
  },
  errorText: {
    color: '#d32f2f'
  }
});

const FormInput = ({
  name,
  value,
  label,
  placeholder,
  required,
  errors,
  errorMessage,
  iconName,
  iconColor,
  ...rest
}) => {
  const input = React.createRef();

  const FormIcon = () => {
    if (iconName) {
      return <Icon name={iconName} size={28} color={iconColor ? iconColor : '#616161'} />;
    }
    return <></>;
  };

  const ErrorMessage = ({ errorValue }) => {
    if (errorValue) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorValue}</Text>
        </View>
      );
    }
    return <></>;
  };

  return (
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        ref={input}
        leftIcon={<FormIcon />}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor="#999999"
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        labelStyle={styles.labelStyle}
        style={styles.input}
        inputStyle={styles.input}
        errorStyle={{ color: '#d32f2f' }}
        errorMessage={required ? 'Required' : ''}
        selectionColor={'#616161'}
      />
      <ErrorMessage errorValue={errors} />
    </View>
  );
};

export default FormInput;
