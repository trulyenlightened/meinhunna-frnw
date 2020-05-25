import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import OtpInputs from "react-native-otp-inputs";
import {onMatchOtp,onChangeOTP} from "../actions/user"

class Otp extends Component {
  render(){

    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
        </View>
           <Text style={styles.bigText}>मैं हूँ ना</Text>

          <View style={styles.cardContainer}>

              <OtpInputs
                handleChange={code => this.props.onChangeOTP(code)}
                numberOfInputs={4}
                inputStyles={styles.otpInputStyle}
                inputContainerStyles={{ backgroundColor: "white", }}
                />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={()=>{this.props.onMatchOtp(this.props.navigation.state.params.path)}}
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
    backgroundColor: '#ffa500',
  },
  buttonView:{
    position:'absolute',right:15,top:20

  },
  bigText: {
    fontSize:60,
    color:"#006200",
    fontWeight:'bold'
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
    shadowOpacity: 1.0,
    justifyContent:'space-between',
    height:200
  },
  buttonLogin:{
    backgroundColor: "#E5E5E5",
    height: 44,
    width: 256,
  borderRadius: 20,
    borderColor: "#000000",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop:15,
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
  otpInputStyle: {
    width:25,
    padding:5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    color: "black",
    borderColor: "#573985",
    fontSize: 19,
    marginLeft:25,
    backgroundColor: "#E5E5E5",
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
