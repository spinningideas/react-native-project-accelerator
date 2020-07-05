import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Formik } from 'formik';
import FormInput from 'src/components/Shared/FormInput';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center'
  },
  labelValue: {
    fontSize: 24,
    color: '#616161'
  }
});

const ContactCard = (props) => {
  const handleSubmit = (values) => {
    const contactInfo = {
      name: values.name,
      email: values.email,
      mesage: values.mesage
    };
    props.onSubmit(contactInfo);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().label(props.locData.email).email('Enter a valid email').required(props.locData.required),
    name: Yup.string()
      .label(props.locData.name)
      .required()
      .min(4, 'Name must have at least 4 characters '),
    message: Yup.string().label(props.locData.message).required().min(4, 'Message must have at least 4 characters ')
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, errors, isValid }) => (
        <Card style={styles.container}>
          <FormInput
            name="name"
            label={props.locData.name}
            value={values.name}
            placeholder={props.locData.name}
            autoCapitalize="none"
            onChangeText={handleChange('name')}
            errors={errors.name}
          />
          <FormInput
            name="email"
            label={props.locData.email}
            value={values.email}
            placeholder={props.locData.email}
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            iconName="mail-outline"
            errors={errors.email}
          />
          <FormInput
            name="message"
            label={props.locData.message}
            value={values.message}
            placeholder={props.locData.messagedescription}
            autoCapitalize="none"
            onChangeText={handleChange('message')}
            errors={errors.message}
            multiline={true}
            numberOfLines={3}
          />
          <Button title={props.locData.cancel} type="outline" />
          <Button title={props.locData.save} disabled={!isValid} onPress={handleSubmit} />
        </Card>
      )}
    </Formik>
  );
};

export default ContactCard;
