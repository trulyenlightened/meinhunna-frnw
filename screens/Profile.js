import React, { Component } from "react";
import { StyleSheet, Text, View, Image,TextInput,ScrollView,Dimensions } from "react-native";
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
import MyButton from "../components/MyButton";
import {IMAGEREGISTER} from "../assets";

let screenHeight = Dimensions.get('window').height;
const openDrawer = () => NavigationService.navigate("DrawerOpen");

class Profile extends Component {

  static navigationOptions = {
    header: null,
  };
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
        <Text style={{position:'absolute',top:15,fontSize:22}}>प्रोफ़ाइल</Text>
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        <ScrollView style={styles.mainContainer}>
        <View style={{height:screenHeight*0.9,borderWidth:0}}>
        <TextInput
                  style={styles.inputStyle}
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
                  style={styles.inputStyle}
                  underlineColorAndroid="#573985"
                  placeholder="मोबाइल नंबर"
                  placeholderTextColor="#573985"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  maxLength={10}
                  editable={false}
                  keyboardType={"phone-pad"}
                  value={registerMobileno}

                />

          <TextInput
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

            <MyButton
            style={{width:'70%',alignSelf:'center'}}
            myButtonText="आगे बढ़ें"
            onPress={()=>{
              this.props.updateProfile()
            }}
             />
            <Image source={IMAGEREGISTER} resizeMode="center" style={{width:'100%',height:'73%'}} /> 
            </View>
            
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
    marginTop: 20,
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
    width: "80%",
    borderRadius: 10,
    color:"#573985",
    height: 38,
    alignSelf:'center',
    marginBottom: 5,
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

  fullName:user.fullName,
  fullAddress:user.fullAddress,

  registerMobileno:user.registerMobileno,
  email:user.email
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
