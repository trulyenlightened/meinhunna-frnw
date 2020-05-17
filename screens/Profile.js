import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import MenuButton from "../components/MenuButton";
import ModalItem from "../components/ModalItems";
import { getNearby, selectedMurchant, onAddItems } from "../actions/order";
import NavigationService from "../navigation/NavigationService";
const openDrawer = () => NavigationService.navigate("DrawerOpen");

class Profile extends Component {

  render() {
 

    return (
      <View style={styles.container}>
        <Text style={{position:'absolute',top:15,fontSize:22}}>Profile</Text>
        <MenuButton style={styles.menubutton} onPress={openDrawer} />
        <View style={styles.mainContainer}>
         
        </View>
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
    padding: 10,
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

const mapStateToProps = ({ order }) => ({
  murchantList: order.murchantList,
  orderItem: order.orderItem,
  orderQty: order.orderQty,
});

export default connect(mapStateToProps, {
  getNearby,
  selectedMurchant,
  onAddItems,
})(Profile);
