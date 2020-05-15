import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import Card from 'react-navigation/src/views/CardStack/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {updateLoginMobileNo,updateLoginPassword,authenticate} from "../actions/auth";
import Navigation from "../navigation/NavigationService";


class Login extends Component {
  render(){
    const { loginMobileNo,loginPassword } = this.props;
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Main Hu Na</Text>
      <View style={styles.cardContainer}>
        <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Mobile No..."
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              secureTextEntry={false}
              value={loginMobileNo}
              onChangeText={text => {
                 this.props.updateLoginMobileNo(text);
              }}
            />
            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Password"
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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{Navigation.navigate('MobileNumber')}}
        >
          <Text style={styles.buttonText}>Register Here</Text>
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
  },
  bigText: {
    fontSize:45,
    color:"#573985"
  },
  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    borderColor:"#573985",
    borderWidth:1,
    borderRadius: 5,
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
    borderColor: "#573985",
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 156,
    borderRadius: 5,
    borderColor: "#573985",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText:{
    fontSize:18
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
    authenticate
  }
)(Login);