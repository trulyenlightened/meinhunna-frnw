import React, { Component, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import {updateOrderAddress,onFinalizeOrder} from "../actions/order"
import { or } from "react-native-reanimated";


class ModalAddress extends Component {
  render() {
   const {orderAddress,isModalAddres} = this.props;
    return (
      <Modal
        visible={isModalAddres}
        onRequestClose={() => {}}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
         

            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="grey"
              placeholder="Address"
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              secureTextEntry={false}
              maxLength={10}
              fontSize={14}
              keyboardType={"phone-pad"}
              value={orderAddress}
              onChangeText={(text) => {
                this.props.updateOrderAddress(text);
              }}
            />
            <Text style={{fontSize:19,marginTop:10,marginBottom:10,alignSelf:'center'}}> Or </Text>
            <Text style={{fontSize:16,marginTop:10,marginBottom:10,alignSelf:'center',color: "grey",}}> Leave it we are place your order in your Register Address </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                  this.props.onFinalizeOrder()
              }}
            >
              <Text style={styles.buttonText}>Finalize Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 390,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    margin: 15,
    width:'80%',
    alignSelf:'center'
  },
  menubutton: {
    top: 5,
    left: 5,
  },
  headerText: {
    top: 2,
    fontSize: 35,
    color: "#BDB76B",
  },
  mainContainer: {
    flex: 1,
    marginTop: 15,
    padding: 30,
    width:'100%'
  },
  inputStyle: {
    borderRadius: 10,
    height: 44,
  width:'100%',
    fontSize: 19,
    paddingLeft: 3,
    paddingRight: 5,
    marginTop:10,
  },
  addButton: {
    position:'absolute',
    backgroundColor: "transparent",
    height: 44,
    width:'100%',
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    bottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
  },
  unitText: {
    marginTop: -50,
    right: 25,
  },
});

const mapStateToProps = ({ order }) => ({
    orderAddress:order.orderAddress,
    isModalAddres:order.isModalAddres
});

export default connect(mapStateToProps, {
    updateOrderAddress,
    onFinalizeOrder
})(ModalAddress);
