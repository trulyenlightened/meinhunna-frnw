import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,Image,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import{
  updateFullName,
  updateEmail,
  updateAddress,
  updatePassword,
  updateConfirmPassword
} from "../actions/user";
import {signup} from "../actions/auth";
import {IMAGEREGISTER} from "../assets";
import MyButton from "../components/MyButton";

let screenHeight = Dimensions.get('window').height;

class Register extends Component {
  render(){
    const {
      fullName,
      registerMobileno,
      email,
      fullAddress,
      password,
      confirmPassword,
      passwordChange,
      passwordConfirmChange
    } = this.props;

    return (
      <ScrollView style={{height:screenHeight}}>
      <View style={styles.container}>
        <Text style={styles.bigText}>मैंहूँन</Text>
        <TextInput
                  style={[styles.inputStyle,{}]}
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
                  placeholder="पासवर्ड, छह अक्षर अनिवार्य"
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
                  placeholder="कन्फर्म पासवर्ड, छह अक्षर अनिवार्य"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={text => {
                     this.props.updateConfirmPassword(text);
                  }}
                />
            <MyButton
             myButtonText='आगे बढ़ें'
             onPress={()=>{
              if(password&&confirmPassword&&fullAddress&&fullName)
              {


              if(password.toString() === confirmPassword.toString())
              {
                if(password.length >= 6){
                  this.props.signup()
                } else{
                  alert('पासवर्ड, छह अक्षर अनिवार्य')
                }

              }
              else{
                alert('Password Does not Match')
              }
            }else{
              alert('आवश्यक विवरण भरें')
            }

            }}
             />
            <Image source={IMAGEREGISTER} resizeMode='center' style={{height:'50%'}} />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:screenHeight,
    padding:20
  },
  bigText: {
    fontSize:60,
    color:"#000",
    marginTop:50
    //position:'absolute',
    //top:30,
    //marginBottom:15
    //fontWeight:'bold'
  },

  inputStyle:{
    width: "93%",
    borderRadius: 10,
    height: 48,

    marginBottom: 5,
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
    //borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"#fff",
    //fontWeight:'bold'
  },
});

const mapStateToProps = ({user}) => ({
  fullName:user.fullName,
  registerMobileno:user.registerMobileno,
  email:user.email,
  fullAddress:user.fullAddress,
  password:user.password,
  confirmPassword:user.confirmPassword,
  passwordChange:user.passwordChange,
  passwordConfirmChange:user.passwordConfirmChange
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
