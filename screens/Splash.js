import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image,ImageBackground  } from "react-native";
import { connect } from "react-redux";
import MenuButton from "../components/MenuButton";
import { retrieveAuthToken } from "../actions/auth";
import NavigationService from "../navigation/NavigationService";
import {IMAGEBOY,IMAGEUSER,SPLACHBACK} from "../assets"

class Splash extends Component {
  componentDidMount(){
    this.props.retrieveAuthToken();
  }

  render() {


    return (
      <View style={styles.container}>
        
      <View style={styles.mainContainer}>
      <Image source={SPLACHBACK} resizeMode='center' style={styles.backImage} />
        <Text style={styles.bigText}>मैंहूँन</Text>
        <Image source={IMAGEBOY} resizeMode='contain' style={styles.imagestyle}/>
        <Text style={styles.smallText}>तेज़ डीलीवरी</Text>
      </View>
        <View style={styles.mainContainer1}>
        
          <Image source={IMAGEUSER} style={styles.imageUser} />
          <TouchableOpacity
            style={styles.buttonLogin}
          onPress={()=>{NavigationService.navigate('Login')}}
            >
              <Text style={styles.buttonText}>लॉग इन करें</Text>
            </TouchableOpacity>

            <TouchableOpacity
          style={styles.buttonSignup}
        onPress={()=>{NavigationService.navigate('MobileNumber',{path:'register'})}}
          >
            <Text style={styles.buttonSignupText}>साइन अप करें</Text>
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
    //backgroundColor: '#ffa500',
  },
  bigText: {
    fontSize:50,
    color:"#fff",
    //fontWeight:'bold',
    
  },
  smallText:{
    fontSize:18,
    color:"#fff",
    margin:10
  },
  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 20,
     // backgroundColor: '#E5E5E5',
    borderWidth: 2,
    borderColor:'#572179',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop:10
  },
backImage:{
  flex:1,
  top:0,
  height:'100%',
  position:'absolute',
  padding:20,
},
  buttonSignup:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 20,
    backgroundColor: '#572179',
    borderWidth: 2,
    //borderColor:'#573985',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop:10
  },
  imagestyle:{
    width:'80%',
    height:'50%'
  },
  imageUser:{
    width:50,
    height:57,
    //tintColor:'#573985'
  },
  headerText: {
    top: 2,
    fontSize: 35,
    color: "#BDB76B",
  },
  mainContainer: {
    flex: 1,
    
    justifyContent:'space-between',
    alignItems:'center',
    //backgroundColor:'#FF905F',
    width:'100%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  mainContainer1:{
    flex: 1,
    marginTop: 15,
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:'#FFE666'
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
    color: "#572179",
    //fontWeight: "bold",

  },
  buttonSignupText:{
    fontSize: 18,
    color: "#fff",
    //fontWeight: "bold",
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
