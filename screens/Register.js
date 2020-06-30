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
      passwordConfirmChange,
      loadingRegister
    } = this.props;

    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bigText}>मैं हूँ ना</Text>
        <View style={{width:'100%',alignItems:'center', marginTop:0.14*screenHeight}}>
        <TextInput
                  style={[styles.inputStyle,{}]}
                  fontSize={16}
                  underlineColorAndroid="#573985"
                  placeholder="पूरा नाम"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={fullName}
                  onChangeText={text => {
                     this.props.updateFullName(text);
                  }}
                />



          <TextInput
                  fontSize={16}
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="ई-मेल"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={email}
                  onChangeText={text => {
                     this.props.updateEmail(text);
                  }}
                />

          <TextInput
          fontSize={16}
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="पता"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  value={fullAddress}
                  onChangeText={text => {
                     this.props.updateAddress(text);
                  }}
                />
          <TextInput
          fontSize={16}
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="पासवर्ड, छह अक्षर अनिवार्य"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => {
                     this.props.updatePassword(text);

                  }}
                />

              {
                  passwordChange?(
                    password.length <6?
                    <Text style={{color:'red',marginTop:-9,marginLeft:40,alignSelf:'flex-start',marginBottom:5}}>छह अक्षर अनिवार्य</Text>
                    :null
                  )
                  :null
                }
          <TextInput
          fontSize={16}
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="कन्फर्म पासवर्ड, छह अक्षर अनिवार्य"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={text => {
                     this.props.updateConfirmPassword(text);
                  }}
                />
              {
                  passwordConfirmChange?(
                    password !== confirmPassword ?
                    <Text style={{color:'red',marginTop:-9,marginLeft:40,alignSelf:'flex-start',marginBottom:5}}> पासवर्ड मैच नहीं हो रहा | </Text>
                    :null
                  )
                  :null
                }
            <MyButton
             style={{width:'60%',opacity:loadingRegister?0.5:1}}
             myButtonText={loadingRegister?'लोड हो रहा है':'आगे बढ़ें'}
             disabled={loadingRegister}
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
             </View>
            <Image source={IMAGEREGISTER} resizeMode='center' style={{height:'50%'}} />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:screenHeight+3,

  },
  bigText: {
    fontSize:40,
    color:"#000",
    //position:'absolute',
    //top:30,
    //marginBottom:15
    fontWeight:'bold'
  },

  inputStyle:{
    width: "80%",
    borderRadius: 10,
    height: 37,

    marginBottom: 0,
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

const mapStateToProps = ({user,auth}) => ({
  fullName:user.fullName,
  registerMobileno:user.registerMobileno,
  email:user.email,
  fullAddress:user.fullAddress,
  password:user.password,
  confirmPassword:user.confirmPassword,
  passwordChange:user.passwordChange,
  passwordConfirmChange:user.passwordConfirmChange,
  loadingRegister:auth.loadingRegister
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
