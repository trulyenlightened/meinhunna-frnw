import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import {updateRegisterMobileNo,onSendOtp} from "../actions/user";

class MobileNumber extends Component  {
  render(){
    const {registerMobileno} = this.props;
    return (
      <View style={styles.container}>
      <View style={styles.buttonView}>
      </View>
         <Text style={styles.bigText}>मैं हूँ ना</Text>
        <View style={styles.cardContainer}>
          <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="#000000"
                placeholder="मोबाइल नंबर"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                secureTextEntry={false}
                maxLength={10}
                keyboardType={"phone-pad"}
                value={registerMobileno}
                onChangeText={text => {
                   this.props.updateRegisterMobileNo(text);
                }}
              />

          <TouchableOpacity
          style={styles.buttonLogin}
          onPress={()=>{
            var hh = registerMobileno.length
            if(hh === 10){
            this.props.onSendOtp(true)
            } else {
              alert('Enter correct Mmobile number')
            }
          }}
          >
            <Text style={styles.buttonText}>आगे बढ़ें</Text>
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
    backgroundColor: '#E5E5E5',
  },
  bigText: {
    fontSize:45,
  color:"#BDB76B"
  },
  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    borderColor:"#000000",
    borderWidth:1,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  buttonView:{
    position:'absolute',right:15,top:20

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
  buttonSignUp:{
  width:100,
  },
  buttonSignUpText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },
});

const mapStateToProps = ({user}) => ({
  registerMobileno:user.registerMobileno,
});


export default connect(
  mapStateToProps,
  {
    updateRegisterMobileNo,
    onSendOtp
  }
)(MobileNumber);
