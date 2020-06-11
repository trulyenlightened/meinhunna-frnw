import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import OtpInputs from "react-native-otp-inputs";
import {onMatchOtp,onChangeOTP} from "../actions/user";
import {IMAGEOTP} from "../assets";
import MyButton from "../components/MyButton";

class Otp extends Component {
  render(){

    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>मैंहूँन</Text>
        <View style={styles.buttonView}>
        </View>
           

          <View style={styles.cardContainer}>

              <OtpInputs
                handleChange={code => this.props.onChangeOTP(code)}
                numberOfInputs={4}
                inputStyles={styles.otpInputStyle}
                inputContainerStyles={{ backgroundColor: "white", }}
                />
            <MyButton
                myButtonText='आगे बढ़ें'
                onPress={()=>{this.props.onMatchOtp(this.props.navigation.state.params.path)}}
              />
            <TouchableOpacity>
              <Text style={styles.buttonResendText}>फिर से भेजे OTP</Text>
            </TouchableOpacity>
            
          </View>
          <Image source={IMAGEOTP} resizeMode='center' style={{height:'40%',bottom:0,width:'100%'}} />
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
    height: '100%',
  },
  buttonView:{
    position:'absolute',right:15,top:20

  },
  bigText: {
    fontSize:60,
    color:"#000",
    top:10,
    position:'absolute'
    //fontWeight:'bold'
  },
  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    borderColor:"#000000",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent:'space-between',
    height:200
  },
  buttonLogin:{
    backgroundColor: "#FF905F",
    height: 44,
    width: 256,
  borderRadius: 20,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginTop:15,
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"#fff",
    //fontWeight:'bold'
  },
  buttonResendText:{
    color:"#573985",
    fontSize:18
  },
  buttonSignUp:{
  width:100,
  },
  buttonSignUpText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },
  otpInputStyle: {
    width:45,
    height:55,
    padding:1,
    backgroundColor: "white",
    borderWidth: 2,
    color: "black",
    borderColor: "#573985",
    fontSize: 19,
    marginLeft:25,
    //backgroundColor: "#E5E5E5",
  }
});

const mapStateToProps = ({auth}) => ({

});


export default connect(
  mapStateToProps,
  {
    onMatchOtp,
    onChangeOTP
  }
)(Otp);
