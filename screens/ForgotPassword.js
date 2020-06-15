import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import{

  updatePassword,
  updateConfirmPassword,
  forgotPasswordApi
} from "../actions/user";
import {signup} from "../actions/auth";
import MyButton from "../components/MyButton";
import {FORGOTIMAGE} from "../assets";
import { ScrollView } from 'react-native-gesture-handler';

let screenHeight = Dimensions.get('window').height;
class ForgotPassword extends Component {
  render(){
    const {
      password,
      confirmPassword,
      passwordChange
    } = this.props;
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bigText}>मैं हूँ ना</Text>
          <View style={{alignItems:'center',width:'100%',marginTop:0.18*screenHeight}}>
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="पासवर्ड*"
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
                    <Text style={{color:'red',marginTop:-9,marginLeft:38,alignSelf:'flex-start'}}>छह अक्षर अनिवार्य</Text>
                    :null
                  )
                  :null
                }
          <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="कन्फर्म पासवर्ड*"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={text => {
                     this.props.updateConfirmPassword(text);
                  }}
                />

            <MyButton
                style={{width:'65%'}}
                myButtonText='आगे बढ़ें'
                onPress={()=>{


                  if(password.toString() === confirmPassword.toString())
                  {
                    if(password.length >= 6){
                    this.props.forgotPasswordApi()
                    } else{
                      alert('पासवर्ड, छह अक्षर अनिवार्य')
                    }
                  }
                  else{
                    alert('Password Does not Match')
                  }
                }}
              />
              </View>
              <Image source={FORGOTIMAGE} resizeMode="center" style={{height:'45%'}} />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:screenHeight+3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: '#ffa500',
  },
  bigText: {
    fontSize:40,
    color:"#000",
    fontWeight:'bold'
  },

  inputStyle:{
    width: "83%",
    borderRadius: 10,
    height: 45,

    marginBottom: 0,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
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
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"grey",
    fontWeight:'bold'
  },
});

const mapStateToProps = ({user}) => ({
  password:user.password,
  confirmPassword:user.confirmPassword,
  passwordChange:user.passwordChange
});


export default connect(
  mapStateToProps,
  {
    updatePassword,
    updateConfirmPassword,
    forgotPasswordApi
  }
)(ForgotPassword);
