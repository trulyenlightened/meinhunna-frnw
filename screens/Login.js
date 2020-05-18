import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import Card from 'react-navigation/src/views/CardStack/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {updateLoginMobileNo,updateLoginPassword,authenticate,retrieveAuthToken} from "../actions/auth";
import Navigation from "../navigation/NavigationService";


class Login extends Component {


  render(){
    const { loginMobileNo,loginPassword } = this.props;
  return (
    <View style={styles.container}>
    <View style={styles.buttonView}>
    <TouchableOpacity
    style={styles.buttonSignUp}
      onPress={()=>{Navigation.navigate('MobileNumber')}}
    >
      <Text style={styles.buttonSignUpText}>साइन अप करें</Text>
    </TouchableOpacity>
    </View>
      <Text style={styles.bigText}>मैं हूँ ना</Text>
      <View style={styles.cardContainer}>
        <TextInput
        style={styles.inputStyle}
        underlineColorAndroid="#9D9D9D"
        placeholder="मोबाइल नंबर"
        placeholderTextColor="#9D9D9D"
        autoCapitalize="none"
        maxLength={10}
        keyboardType={"phone-pad"}
        secureTextEntry={false}
              value={loginMobileNo}
              onChangeText={text => {
                 this.props.updateLoginMobileNo(text);
              }}
            />
            <TextInput
            style={styles.inputStyle}
            underlineColorAndroid="#9D9D9D"
            placeholder="पासवर्ड"
            placeholderTextColor="#9D9D9D"
            autoCapitalize="none"
            secureTextEntry={true}
              value={loginPassword}
              onChangeText={text => {
                this.props.updateLoginPassword(text);
              }}
            />
        <TouchableOpacity
        style={styles.buttonLogin}
        onPress={()=>{this.props.authenticate(true)}}
        >
          <Text style={styles.buttonText}>लॉग इन करें</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa500',
  },
  bigText: {
    fontSize:60,
    color:"#006200",
    fontWeight:'bold'
  },
  buttonView:{
    position:'absolute',right:15,top:20

  },
  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    borderColor:"#000000",
    borderWidth:0.5,
      borderRadius: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  inputStyle:{
    width: "93%",
    borderRadius: 5,
    height: 48,

    marginBottom: 20,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 20,
      backgroundColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonSignUp:{
  width:100,
  },
  buttonSignUpText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },


  buttonText:{
    fontSize:18,
    color:"grey",
  fontWeight:'bold',
  }
});
const mapStateToProps = ({auth}) => ({
  loginMobileNo:auth.loginMobileNo,
  loginPassword:auth.loginPassword,
});


export default connect(
  mapStateToProps,
  {
    updateLoginMobileNo,
    updateLoginPassword,
    authenticate,
    retrieveAuthToken
  }
)(Login);
