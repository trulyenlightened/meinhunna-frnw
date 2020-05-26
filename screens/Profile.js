import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,TextInput,ScrollView } from "react-native";
import { connect } from "react-redux";
import MenuButton from "../components/MenuButton";
import { getNearby, onAddItems } from "../actions/order";
import {
  updateFullName,
  updateEmail,
  updateAddress,
  updatePassword,
  updateConfirmPassword,
  updateProfile
      } from "../actions/user";
import NavigationService from "../navigation/NavigationService";
const openDrawer = () => NavigationService.navigate("DrawerOpen");

class Profile extends Component {
  render() {
    const {
      fullName,
      registerMobileno,
      email,
      fullAddress,
      password,
      confirmPassword
    } = this.props
    return (
      <View style={styles.container}>
        <Text style={{position:'absolute',top:15,fontSize:22}}>Profile</Text>
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        <ScrollView style={styles.mainContainer}>
        <TextInput
                  style={styles.inputStyle}
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
                  placeholder="मोबाइल नंबर"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  maxLength={10}
                  editable={false}
                  keyboardType={"phone-pad"}
                  value={registerMobileno}
                  
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
                  placeholder="पासवर्ड"
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
                  placeholder="कन्फर्म पासवर्ड"
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
                this.props.updateProfile()
              }
              else{
                alert('Password Does not Match')
              }
              
            }}
            >
              <Text style={styles.buttonText}>आगे बढ़ें</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    top: 2,
    fontSize: 35,
    color: "#BDB76B",
  },
  mainContainer: {
    flex: 1,
    marginTop: -10,
    width:'100%',
  },
  addButton: {
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
  },
  buttonLogin:{
    backgroundColor: "#E5E5E5",
    height: 44,
    width: 256,
  borderRadius: 20,
    borderColor: "#000000",
    borderWidth: 1,
    alignSelf:'center',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  inputStyle:{
    width: "90%",
    borderRadius: 10,
    height: 48,
    alignSelf:'center',
    marginBottom: 20,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  listCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
    width: "60%",
    backgroundColor: "#fff",
  },
});

const mapStateToProps = ({ order,user }) => ({
  murchantList: order.murchantList,
  orderItem: order.orderItem,
  orderQty: order.orderQty,
  password:user.password,
  fullName:user.fullName,
  fullAddress:user.fullAddress,
  confirmPassword:user.confirmPassword,
  registerMobileno:user.registerMobileno
});

export default connect(mapStateToProps, {
  getNearby,
    onAddItems,
    updateFullName,
    updateEmail,
    updateAddress,
    updatePassword,
    updateConfirmPassword,
    updateProfile
})(Profile);
