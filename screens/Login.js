import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import Card from 'react-navigation/src/views/CardStack/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {updateLoginMobileNo,updateLoginPassword,authenticate,retrieveAuthToken} from "../actions/auth";
import Navigation from "../navigation/NavigationService";
import NavigationService from "../navigation/NavigationService";
import MyButton from "../components/MyButton";


class Login extends Component {


  render(){
    const { loginMobileNo,loginPassword } = this.props;
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>मैंहूँन</Text>
      
      <View style={styles.cardContainer}>
        <TextInput
        style={styles.inputStyle}
        underlineColorAndroid="#9D9D9D"
        placeholder="उपयोगकरता नाम/नंबर"
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
        {/* <TouchableOpacity
        style={styles.buttonLogin}
        onPress={()=>{this.props.authenticate(true)}}
        >
          <Text style={styles.buttonText}>लॉग इन करें</Text>
        </TouchableOpacity> */}
        <MyButton
         myButtonText="लॉग इन करें"
         onPress={()=>{this.props.authenticate(true)}}
         />
        <TouchableOpacity
    style={styles.buttonSignUp}
      onPress={()=>{Navigation.navigate('MobileNumber',{path:''})}}
    >
      <Text style={styles.buttonSignUpText}>पासवर्ड भूल गये?</Text>
    </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text>रजिस्टर नहीं? </Text>
        <TouchableOpacity
        onPress={()=>{NavigationService.navigate('MobileNumber',{path:'register'})}}
        >
        <Text style={styles.signupButtonText}> अब  साइन उप करे</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bigText: {
    fontSize:60,
    color:"#000",
    //fontWeight:'bold'
  },
  buttonView:{
    position:'absolute',right:15,top:20

  },
  cardContainer:{
    width:'90%',
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "white",
    //borderColor:"#000000",
    // borderWidth:0.5,
    //   borderRadius: 20,
    // padding: 20,
    // shadowColor: "#000000",
    // shadowOffset: { width: 1, height: 3 },
    // shadowRadius: 5,
    // shadowOpacity: 1.0
  },
  inputStyle:{
    width: "93%",
    borderRadius: 5,
    height: 48,
    marginBottom: 10,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5,
    borderColor:'#573985',
    color:'#573985'
  },
  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 20,
      backgroundColor: '#FF905F',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonSignUp:{
  width:'60%',
  },
  buttonSignUpText:{
    fontSize:18,
    color:"#573985",
    //fontWeight:'bold'
  },
  signupButtonText:{
    color:'#573985',
    fontSize:18
  },

  buttonText:{
    fontSize:18,
    color:"#fff",
  fontWeight:'bold',
  },
  bottomContainer:{
    backgroundColor:'#E5E5E5',
    width:'90%',
    paddingBottom:20,
    alignItems:'center',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    flexDirection:'row',
    justifyContent:'center'
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
