import React, { Component, useReducer } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image,Modal, ScrollView,Dimensions } from "react-native";
import { connect } from "react-redux";
import call from "react-native-phone-call";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import MenuButton from "../components/MenuButton";
import ModalItem from "../components/ModalItems";
import ModalAddress from "../components/ModalAddress";
import MyButton from "../components/MyButton";
import {
  getNearby,
  onSelectedMurchant,
  onAddItems,
  onPlaceOrder,
  onSelectedItemRemove,

 } from "../actions/order";
import {getUserData} from "../actions/user";
import NavigationService from "../navigation/NavigationService";
import {HOMEICON,BOTTOMCON} from "../assets";

const openDrawer = () => NavigationService.navigate("DrawerOpen");

let screenHeight = Dimensions.get('window').height;

class OrderForm extends Component {
  async componentWillMount() {
    this._getLocationAsync();
    // this.props.getNearby({coords:{latitude:null,longitude:null}});

   await this.props.getUserData()
  }

  static navigationOptions = {
    header: null,
  };

  _getLocationAsync = async () => {
    var loc = {
      coords:{
      accuracy: 16.038999557495117,
      altitude: 0,
      heading: 0,
      latitude: null,
      longitude: null,
      speed: 0,
    },
    mocked: false,
    timestamp: 1589776337833,
   }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {

       this.props.getNearby(loc);
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
    }

    await Location.getCurrentPositionAsync({})
    .then((res)=>{
      this.props.getNearby(res);
    })
    .catch(()=>{
      this.props.getNearby(loc);
    })



  };
  render() {
    const { murchantList, orderItem, orderQty } = this.props;

    let data = [];
    if(murchantList.length){
      murchantList.map((d) => {
        //console.error(d.merchant.name);
        data.push({ value: d.merchant.name, d });
      });
    }


    return (
      <View>
      <View style={[styles.container,{opacity:this.props.isHelpLineModal?0.3:1}]}>
        <View style={{flexDirection:'row',borderWidth:0}}>
      {
        // <TouchableOpacity style={{alignSelf:'flex-start',width:35,marginTop:15}}>
        //   <Image source={HOMEICON} style={{height:30,width:30,alignSelf:'flex-start'}} />
        // </TouchableOpacity>
      }
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        </View>
        <View style={styles.mainContainer}>
        <Text style={{position:'absolute',top:-60,fontSize:20,color:'#572179',alignSelf:'center'}}>आदेश पत्र</Text>
          <Dropdown
            label="मरचंट"
            baseColor="#573985"
            textColor="#573985"
            data={data}
            onChangeText={(value, index) => {
              this.props.onSelectedMurchant(index);
            }}
            style={{ borderColor:'#572179', tintColor:'#572179' }}
          />

          < View style={{flex:0.8,justifyContent:orderItem.length?'flex-start':'center',alignItems:'center',borderRadius:20,padding:20,marginTop:20,marginBottom:20}} >
          {/* <TouchableOpacity
            style={styles.addButton}
            onPress={() => {

              if(murchantList.length > 0){

              this.props.onAddItems();
            } else {
              alert("No any Merchant Present!")
            }
            }}
          >
            <Text style={styles.buttonText}>+ आईटम जोड़े</Text>
          </TouchableOpacity> */}
          <MyButton
            myButtonText="+ आईटम जोड़े"
            onPress={() => {

              if(murchantList.length > 0){

              this.props.onAddItems();
            } else {
              alert("No any Merchant Present!")
            }
            }}
           />
            <ScrollView style={{marginBottom:5,width:'110%',flex:1}} >
          {!orderItem.length?
              <Text style={styles.buttonText}></Text>:
              orderItem.map((d, i) => {
                return (
                  <View key={i} style={styles.listCard}>
                    <Text numberOfLines={1} style={{ width:110,fontSize: 18, right: 10,color:'#572179' }}>
                     {d.item_name}
                    </Text>
                    <Text numberOfLines={1}  style={{ width:110,fontSize: 14, marginTop: 5,color:'#572179' }}>
                      मात्रा: {orderQty[i]}
                    </Text>
                    <TouchableOpacity
                    style={{width:35}}
                      onPress={() => {
                        this.props.onSelectedItemRemove(i)
                      }}
                    >
                    <Image style={{height:25,width:25, tintColor:'#572179'}} source={require('../assets/delete.png')} />
                    </TouchableOpacity>
                  </View>
                );
              })
          }
            </ScrollView>

        </View>
        {
          orderItem.length > 0?
          <MyButton
            style={{width:'65%',alignSelf:'center'}}
            myButtonText="ऑर्डर करे"
            onPress={() => {

              console.log(murchantList);
              var time = new Date().getHours();
              var minute = new Date().getMinutes()

              if(time>=10 && time<=19){
                  if(time === 19){
                      if(minute <=30){
                        this.props.onPlaceOrder()
                      } else {
                        alert("आप केवल सुबह 10 बजे से शाम 7 बजे के बीच ऑर्डर कर सकते हैं")
                      }
                  } else {

                    this.props.onPlaceOrder()
                  }

              }else {

                alert("आप केवल सुबह 10 बजे से शाम 7 बजे के बीच ऑर्डर कर सकते हैं")
              }

            }}
           />
          :null
        }
       </View>

        <ModalItem />
        <ModalAddress />
        <View style ={styles.bottomContainer}>
         <Image source={BOTTOMCON} resizeMode='stretch'
         style={{width:'100%',height:'100%',position:'absolute',marginTop:20}} />
            <View style={{width:250,height:100,backgroundColor:'#572179', marginTop:40,borderRadius:10,padding:7}}>
             <Text style={{color:'white',fontSize:16,textAlign:'center'}}>पहले 150 कस्टमर्स को पहली पेशकश पर 1 किग्रा नमक मुफ्त |</Text>
             <Text style={{color:'white',fontSize:16,textAlign:'center'}}>मिनिमम 750 रुपये की पहली पेशकश पर 1 किग्रा चावल मुफ्त |</Text>
            </View>
        </View>
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height:screenHeight+3,

  },

  headerText: {
    top: 2,
    fontSize: 35,
    color: "#572179",
  },
  mainContainer: {
    flex: 1,
    marginTop: 15,
    paddingRight: 40,
    paddingLeft:40,
    width: '100%',
  },
  bottomContainer:{
    //backgroundColor:'#FF905F',
    width:'90%',
    height:'28%',
    bottom:0,
    alignSelf:'center',
    alignItems:'center',
    borderTopLeftRadius:25,
    borderTopRightRadius:25
    },
  addButton: {
    backgroundColor: "#FF905F",
    height: 44,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    //fontWeight: "bold",
  },
  listCard: {
    flexDirection: "row",
    marginLeft: 5,
    paddingLeft: 5,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent:'space-between',
    marginTop:10

  },
});

const mapStateToProps = ({ order,auth }) => ({
  murchantList: order.murchantList,
  orderItem: order.orderItem,
  orderQty: order.orderQty,
  isHelpLineModal:auth.isHelpLineModal,
  loadingOrder:order.loadingOrder 
});

export default connect(mapStateToProps, {
  getNearby,
  onSelectedMurchant,
  onAddItems,
  onPlaceOrder,
  onSelectedItemRemove,
  getUserData
})(OrderForm);
