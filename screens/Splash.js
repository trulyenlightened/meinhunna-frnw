import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MenuButton from "../components/MenuButton";
import { retrieveAuthToken } from "../actions/auth";
import NavigationService from "../navigation/NavigationService";

class Splash extends Component {
  componentDidMount(){
    this.props.retrieveAuthToken();
  }

  render() {


    return (
      <View style={styles.container}>
      <View style={styles.mainContainer}>
  <Text style={styles.bigText}>मैं हूँ ना</Text>
      </View>
        <View style={styles.mainContainer}>
        <Text style={{fontSize:18,textAlign: 'center',alignSelf:'center',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
        DIREXION IT एक स्वयं सेविक संसथान है जो इनफार्मेशन टेक्नोलॉजी और
कंप्यूटर से जुडी हुई गतिविधियों में कार्य करती हैI
मैं हूँ न एक पहल है जो आवश्यक सामान की डिलीवरी करती है लेकिन
उपभोक्ता की सुविधा और उनकी परेशानी को समझ कर कार्य करती है I
हम आधुनिक तकनीक का निरंतर उपयोग करते हैं अपने ऐप्प पर और हमारा
उद्देश्य है की हमारे कार्य से लोगों को सुविधा मिले और हम उनके सफल जीवन
में योगदान दे सकें I यह हमारा कर्तव्य है कि हम अपने उपभोक्ता/ग्राहकों का नियमित रूप से ख्याल रखें
स्वस्थ और सुरक्षित रहें
        </Text>

        </View>
        <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
        onPress={()=>{NavigationService.navigate('MobileNumber')}}
          >
            <Text style={styles.buttonText}>साइन अप करें</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
          onPress={()=>{NavigationService.navigate('Login')}}
            >
              <Text style={styles.buttonText}>लॉग इन करें</Text>
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
  bigText: {
    fontSize:60,
    color:"#006200",
    fontWeight:'bold'
  },

  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 20,
      backgroundColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop:10
  },

  headerText: {
    top: 2,
    fontSize: 35,
    color: "#BDB76B",
  },
  mainContainer: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    justifyContent:'center',
    alignItems:'center'
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
  listCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
    width: "60%",
    backgroundColor: "#fff",
  },
});



export default connect(
  null,
  {

    retrieveAuthToken
  }
)(Splash);
