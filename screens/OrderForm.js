import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import MenuButton from '../components/MenuButton';
import ModalItem from "../components/ModalItems";
import {getNearby,selectedMurchant,onAddItems} from "../actions/user"
import NavigationService from '../navigation/NavigationService';
const openDrawer = () => NavigationService.navigate('DrawerOpen');


class OrderForm extends Component {
  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.props.getNearby(location);
  };
  render(){
    const {murchantList,orderItem,orderQty} = this.props;

    let data = [];
  
   murchantList.map((d)=>{
    //console.error(d.merchant.name);
    data.push({value:d.merchant.name,d})
   })
   

    return (
      <View style={styles.container}>
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        <Text style={styles.headerText}>Order</Text>
        <View style={styles.mainContainer}>
        <Dropdown
             label="Merchant "
             data={data}
             onChangeText={(value,index)=>{ this.props.selectedMurchant(index)
             }}
          />
          <TouchableOpacity
          style={styles.addButton}
          onPress={()=>{this.props.onAddItems()}}
          >
            <Text style={styles.buttonText}>
            + Add item
            </Text>
          </TouchableOpacity>
          {orderItem.map((d,i)=>{
            return (<View key={i} style={styles.listCard}>
              <Text style={{fontSize:18, right:10}}>Item : {d.item_name}</Text>
            <Text style={{fontSize:12,marginTop:5}}>Qty: {orderQty[i]} {" "+d.item_unit}</Text>
              <TouchableOpacity
              onPress={()=>{alert("sorry!!!!")
              }}
              >
              <Text style={{color:'red', fontSize:18}}>X</Text>
            </TouchableOpacity>
            </View>)
        })}
        
        </View>
        
        <ModalItem />
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
    
  },
  menubutton:{
    top:5,
    left:5
  },
  headerText:{
    top:2,
    fontSize:35,
  color:"#BDB76B"
  },
  mainContainer:{
    flex:1,
    marginTop:15,
    padding:10
  },
  addButton:{
    backgroundColor: "transparent",
    height: 44,
    width: 256,
    borderRadius: 10,
      backgroundColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText:{
    fontSize:18,
    color:"grey",
  fontWeight:'bold',
  },
  listCard:{
    
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    padding:5,
    width:'60%',
    backgroundColor:'#fff',
  }
});

const mapStateToProps = ({user}) => ({
  murchantList:user.murchantList,
  orderItem:user.orderItem,
  orderQty:user.orderQty
});


export default connect(
  mapStateToProps,
  {
    getNearby,
    selectedMurchant,
    onAddItems
  }
)(OrderForm);