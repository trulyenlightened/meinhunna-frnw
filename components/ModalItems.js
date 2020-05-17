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
import { Dropdown } from "react-native-material-dropdown";
import {
  onSelectedItem,
  onChangeTextItemSelect,
  updateQTY,
} from "../actions/order";

class ModalItem extends Component {
  render() {
    const { selectedMurchant, isModalItem, finalItem, finalQty } = this.props;
    let data = [];
    let data1 = [];
    if (selectedMurchant) {
      selectedMurchant.items.map((d) => {
        data.push({ value: d.item_name, d });
        data1.push({ value: d.sub_items, d });
      });
    }
    return (
      <Modal
        visible={isModalItem}
        onRequestClose={() => {}}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Dropdown
              label="Items "
              data={data}
              onChangeText={(value, index) => {
                this.props.onChangeTextItemSelect(index);
              }}
            />
            <Dropdown style={{width:'100%'}} label="sub Items" data={data1} />

            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="grey"
              placeholder="Qty."
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              secureTextEntry={false}
              maxLength={10}
              fontSize={14}
              keyboardType={"phone-pad"}
              value={finalQty}
              onChangeText={(text) => {
                this.props.updateQTY(text);
              }}
            />
            <Text style={{fontSize:19,marginTop:10,marginBottom:10}}> Unit : {finalItem ? finalItem.item_unit : null}</Text>
            <TouchableOpacity
              style={styles.addButton}
              disabled={finalItem&&finalQty?false:true}
              onPress={() => {
                this.props.onSelectedItem();
              }}
            >
              <Text style={styles.buttonText}>+ Add item</Text>
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
    backgroundColor: "transparent",
    height: 44,
    width:'100%',
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    bottom: 2,
    right: 5,
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
  selectedMurchant: order.selectedMurchant,
  isModalItem: order.isModalItem,
  finalItem: order.finalItem,
  finalQty: order.finalQty,
});

export default connect(mapStateToProps, {
  onSelectedItem,
  onChangeTextItemSelect,
  updateQTY,
})(ModalItem);
