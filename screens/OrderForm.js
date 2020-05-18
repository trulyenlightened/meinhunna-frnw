import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import MenuButton from "../components/MenuButton";
import ModalItem from "../components/ModalItems";
import ModalAddress from "../components/ModalAddress";
import { getNearby, onSelectedMurchant, onAddItems,onPlaceOrder,onSelectedItemRemove } from "../actions/order";
import NavigationService from "../navigation/NavigationService";
const openDrawer = () => NavigationService.navigate("DrawerOpen");

class OrderForm extends Component {
  componentWillMount() {
    this._getLocationAsync();
    // this.props.getNearby({coords:{latitude:null,longitude:null}});
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
      <View style={styles.container}>
        <Text style={{position:'absolute',top:15,fontSize:22}}>Order</Text>
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        <View style={styles.mainContainer}>
          <Dropdown
            label="Merchant "
            data={data}
            onChangeText={(value, index) => {
              this.props.onSelectedMurchant(index);
            }}
          />

          < View style={{flex:0.8,justifyContent:orderItem.length?'flex-start':'center',alignItems:'center',borderColor:'grey',borderWidth:1,borderRadius:20,padding:20,marginTop:20,marginBottom:20}} >
            <ScrollView style={{marginBottom:20,width:'100%'}}>
          {!orderItem.length?
              <Text style={styles.buttonText}>No items added yet</Text>:
              orderItem.map((d, i) => {
                return (
                  <View key={i} style={styles.listCard}>
                    <Text style={{ fontSize: 22, right: 10 }}>
                     {d.item_name}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                      Qty: {orderQty[i]} {" " + d.item_unit}
                    </Text>
                    <TouchableOpacity
                    style={{width:35}}
                      onPress={() => {
                        alert("sorry!!!!");
                        this.props.onSelectedItemRemove(i)
                      }}
                    >
                    <Image style={{height:30,width:30}} source={require('../assets/delete.png')} />
                    </TouchableOpacity>
                  </View>
                );
              })
          }
            </ScrollView>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              console.log(murchantList);
              
              if(murchantList.length > 0){
              this.props.onAddItems();
            } else {
              alert("No any Merchant Present!")
            }
            }}
          >
            <Text style={styles.buttonText}>+ Add item</Text>
          </TouchableOpacity>
        </View>
        {
          orderItem.length > 0?
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              
              this.props.onPlaceOrder()
              
            }}
          >
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
          :null
        }
        



        </View>

        <ModalItem />
        <ModalAddress />
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
    marginTop: 15,
    paddingRight: 40,
    paddingLeft:40,
    width: '100%',
  },
  addButton: {
    backgroundColor: "transparent",
    height: 44,
    width: '100%',
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

    margin: 5,
    padding: 5,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent:'space-between'

  },
});

const mapStateToProps = ({ order }) => ({
  murchantList: order.murchantList,
  orderItem: order.orderItem,
  orderQty: order.orderQty,
});

export default connect(mapStateToProps, {
  getNearby,
  onSelectedMurchant,
  onAddItems,
  onPlaceOrder,
  onSelectedItemRemove
})(OrderForm);
