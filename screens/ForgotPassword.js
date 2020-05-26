import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import{

  updatePassword,
  updateConfirmPassword,
  forgotPasswordApi
} from "../actions/user";
import {signup} from "../actions/auth"

class ForgotPassword extends Component {
  render(){
    const {
      password,
      confirmPassword,
      passwordChange
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>मैं हूँ ना</Text>

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
            {
                  passwordChange?(
                    password.length <6?
                    <Text style={{color:'red',marginTop:-18,marginLeft:18,alignSelf:'flex-start'}}>छह अक्षर अनिवार्य</Text>
                    :null
                  )
                  :null
                }
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
          <TouchableOpacity
            style={styles.buttonLogin}
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
            }
            }
            >
              <Text style={styles.buttonText}>आगे बढ़ें</Text>
            </TouchableOpacity>
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
    padding:20
  },
  bigText: {
    fontSize:60,
    color:"#006200",
    fontWeight:'bold'
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
