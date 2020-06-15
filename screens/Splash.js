import React, { Component } from "react";
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView,Dimensions  } from "react-native";
import { connect } from "react-redux";
import MenuButton from "../components/MenuButton";
import { retrieveAuthToken } from "../actions/auth";
import NavigationService from "../navigation/NavigationService";
import {IMAGEBOY,IMAGEUSER,SPLACHBACK,MODALIMAGEITEM,IMAGEREGISTER,SLIDE2} from "../assets"

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

class Splash extends Component {
  componentDidMount(){
    this.props.retrieveAuthToken();
  }

  _renderItem = ({item, index}) => {
    return (
        <View style={{width:'100%',height:'100%'}}>
          {
            item.text?<Text style={styles.smallText1}>{item.text}</Text>:
            <Image source={item.image} resizeMode='center' style={styles.imagestyle}/>
          }
          {
            item.text?null:<Text style={styles.smallText}>तेज़ डीलीवरी</Text>
          }


        </View>
    );
}
  render() {


    return (
      <ScrollView>
      <View style={styles.container}>

      <View style={styles.mainContainer}>
      <Image source={SPLACHBACK} resizeMode='contain' style={styles.backImage} />
        <Text style={styles.bigText}>मैं हूँ ना</Text>
        <Carousel
          data={[
            {image:IMAGEBOY},
            {image:SLIDE2},
            {image:IMAGEREGISTER,text:'ऐप्प में आपका स्वागत है DIREXION IT एक स्वयं सेविक संसथान है जो इनफार्मेशन टेक्नोलॉजी और कंप्यूटर से जुडी हुई गतिविधियों में कार्य करती हैI मैं हूँ न एक पहल है जो आवश्यक सामान की डिलीवरी करती है लेकिन उपभोक्ता की सुविधा और उनकी परेशानी को समझ कर कार्य करती है I हम आधुनिक तकनीक का निरंतर उपयोग करते हैं अपने ऐप्प पर और हमारा उद्देश्य है की हमारे कार्य से लोगों को सुविधा मिले और हम उनके सफल जीवन में योगदान दे सकें I यह हमारा कर्तव्य है कि हम अपने उपभोक्ता/ग्राहकों का नियमित रूप से ख्याल रखें स्वस्थ और सुरक्षित रहें '}]}
          renderItem={this._renderItem}
          sliderWidth={screenWidth*0.75}
          itemWidth={screenWidth*0.75}
         />
        {/* <Image source={IMAGEBOY} resizeMode='contain' style={styles.imagestyle}/> */}

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
    height:screenHeight
    //backgroundColor: '#ffa500',
  },
  bigText: {
    fontSize:35,
    color:"#fff",
    //fontWeight:'bold',

  },
  smallText:{
    fontSize:18,
    color:"#fff",
    margin:10,
    alignSelf:'center'
  },
  smallText1:{
    fontSize:16,
    color:"#fff",
    margin:10,
    alignSelf:'center',
    textAlign:'center'
  },
  buttonLogin:{
    backgroundColor: "transparent",
    height: 44,
    width: 230,
    borderRadius: 20,
     // backgroundColor: '#E5E5E5',
    borderWidth: 2,
    borderColor:'#572179',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop:5
  },
backImage:{
  top:0,
  height:'100%',
  position:'absolute',
  padding:20,
},
  buttonSignup:{
    backgroundColor: "transparent",
    height: 44,
    width: 230,
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
    width:'99%',
    height:'85%'
  },
  imageUser:{
    width:37,
    height:43,
    //tintColor:'#573985'
  },
  headerText: {
    top: 2,
    fontSize: 35,
    color: "#BDB76B",
  },
  mainContainer: {
    top:0,
    justifyContent:'space-between',
    alignItems:'center',
    //backgroundColor:'#FF905F',
    width:'100%',
    height:screenHeight*0.55,
  },
  mainContainer1:{
    height:screenHeight*0.45,
    marginTop: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop:25
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
    marginBottom: 5,
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
