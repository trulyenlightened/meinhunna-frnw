import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import MenuButton from '../components/MenuButton';
import {getNearby} from "../actions/user"
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
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Order</Text>
        <View style={styles.mainContainer}>
          <TouchableOpacity
          style={styles.addButton}
          >
            <Text style={styles.buttonText}>
            + Add item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:200
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
  }
});

const mapStateToProps = ({auth}) => ({
  
});


export default connect(
  mapStateToProps,
  {
    getNearby
  }
)(OrderForm);