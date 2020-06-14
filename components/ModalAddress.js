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
import MyButton from "../components/MyButton";


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
        <View style={{height:"100%",backgroundColor:'rgba(280,280,280,0.8)'}}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>


            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="#573985"
              placeholder="Address"
              placeholderTextColor="#573985"
              autoCapitalize="none"
              secureTextEntry={false}

              fontSize={14}
  
              value={orderAddress}
              onChangeText={(text) => {
                this.props.updateOrderAddress(text);
              }}
            />
            <Text style={{fontSize:19,marginTop:10,marginBottom:10,alignSelf:'center'}}> Or </Text>
            <Text style={{fontSize:16,marginTop:10,marginBottom:10,alignSelf:'center',color: "#573985",}}> विशिष्ट पता डाले या अपने रजिस्टर हुए पते पर डिलीवरी प्राप्त करे</Text>
           
            <MyButton
            myButtonText="संपूर्ण ऑर्डर करे"
            onPress={() => {
              this.props.onFinalizeOrder()
              }}
            />
          </View>
        </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: '30%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 390,
    borderWidth: 3,
    borderColor: "#573985",
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
