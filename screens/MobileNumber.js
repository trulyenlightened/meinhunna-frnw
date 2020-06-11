import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {IMAGEMOBILE} from "../assets"
import {updateRegisterMobileNo,onSendOtp,onSendForgotOtp} from "../actions/user";
import MyButton from "../components/MyButton";

class MobileNumber extends Component  {
  render(){

    const {registerMobileno} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>मैंहूँन</Text>
      <View style={styles.buttonView}>
      </View>
         
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

          <MyButton
           myButtonText='आगे बढ़ें'
           onPress={()=>{
              var hh = registerMobileno.length
              if(hh === 10){
            
              this.props.navigation.state.params.path==='register'?
              this.props.onSendOtp(true):this.props.onSendForgotOtp(true)
              } else {
                alert('सही फोन नंबर डाले')
              }
            }}
           />
          
        </View>
        <Image source={IMAGEMOBILE} resizeMode='center' style={styles.imageStyle} />
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
    backgroundColor: '#fff',
  },
  bigText: {
    top:5,
    position:'absolute',
    fontSize:60,
    color:"#000",
    //fontWeight:'bold'
  },

  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    borderColor:"#000000",
    //borderWidth:1,
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
    backgroundColor: "#FF905F",
    height: 44,
    width: 256,
  borderRadius: 20,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"#fff",
    //fontWeight:'bold'
  },
  buttonSignUp:{
  width:100,
  },
  buttonSignUpText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },
  imageStyle:{
    height:'45%'
  }
});

const mapStateToProps = ({user}) => ({
  registerMobileno:user.registerMobileno,
});


export default connect(
  mapStateToProps,
  {
    updateRegisterMobileNo,
    onSendOtp,
    onSendForgotOtp
  }
)(MobileNumber);
