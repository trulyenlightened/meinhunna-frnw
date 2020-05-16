import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import{
  updateFullName,
  updateEmail,
  updateAddress,
  updatePassword,
  updateConfirmPassword
} from "../actions/user";
import {signup} from "../actions/auth"

class Register extends Component {
  render(){
    const {
      fullName,
      registerMobileno,
      email,
      fullAddress,
      password,
      confirmPassword,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>मैं हूँ ना</Text>
        <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="पूरा नाम"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={fullName}
                  onChangeText={text => {
                     this.props.updateFullName(text);
                  }}
                />
  
         <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="मोबाइल नंबर"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  maxLength={10}
                  editable={false}
                  keyboardType={"phone-pad"}
                  value={registerMobileno}
                  
                />
  
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="ई-मेल"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={email}
                  onChangeText={text => {
                     this.props.updateEmail(text);
                  }}
                />
  
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="पता"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={fullAddress}
                  onChangeText={text => {
                     this.props.updateAddress(text);
                  }}
                />
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="पासवर्ड"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => {
                     this.props.updatePassword(text);
                  }}
                />
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#000000"
                  placeholder="कन्फर्म पासवर्ड"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={text => {
                     this.props.updateConfirmPassword(text);
                  }}
                />
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={()=>{
              if(password.toString() === confirmPassword.toString())
              {
                this.props.signup()
              }
              else{
                alert('Password Does not Match')
              }
              
            }}
            >
              <Text style={styles.buttonText}>आगे बढ़ें</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  bigText: {
    fontSize:45,
  color:"#BDB76B"
  },
  inputStyle:{
    width: "93%",
    borderRadius: 10,
    height: 48,

    marginBottom: 20,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  buttonLogin:{
    backgroundColor: "#E5E5E5",
    height: 44,
    width: 256,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },
});

const mapStateToProps = ({user}) => ({
  fullName:user.fullName,
  registerMobileno:user.registerMobileno,
  email:user.email,
  fullAddress:user.fullAddress,
  password:user.password,
  confirmPassword:user.confirmPassword
});


export default connect(
  mapStateToProps,
  {
    updateFullName,
    updateEmail,
    updateAddress,
    updatePassword,
    updateConfirmPassword,
    signup
  }
)(Register);

