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
  onChangeSubItemSelect,
  updateDescription,
} from "../actions/order";

class ModalItem extends Component {
  render() {
    const {
      selectedMurchant,
      isModalItem,
      finalItem,
      finalQty,
      sunCatagory,
      orderDescription,
    } = this.props;
    var data = [];
    var data1 = [];
    var data2 = [];
    var mI = 0;


    if (selectedMurchant) {
      selectedMurchant.items.map((d) => {
        data.push({ value: d.item_name, d });
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
              label="आइटम"
              data={data}
              onChangeText={async (value, index) => {
                this.props.onChangeTextItemSelect(index);
                mI = index;
                // data1 = [...selectedMurchant.items[index].sub_items];

                // data1.map((d)=>{

                //     data2.push({value:d.item_name})
                // })
                // console.error(data2);
              }}
            />
            <Dropdown
              style={{ width: "100%" }}
              label="उप आइटम"
              data={sunCatagory}
              onChangeText={async (value, index) => {
                // console.error(index +"  "+ mI);

                this.props.onChangeSubItemSelect(index);
              }}
            />

            <Dropdown
              style={{ width: "100%" }}
              label="Qty"
              data={
                finalItem
                  ? finalItem.item_unit === "gram"
                    ? [
                        { value: "20" },
                        { value: "25" },
                        { value: "50" },
                        { value: "100" },
                        { value: "200" },
                        { value: "250" },
                        { value: "500" },
                        { value: "1000" },
                        { value: "1500" },
                        { value: "2000" },
                        { value: "5000" },
                      ]
                    : finalItem.item_unit === "ml"
                    ? [
                        { value: 100 },
                        { value: 200 },
                        { value: 300 },
                        { value: 500 },
                        { value: 1000 },
                        { value: 1500 },
                        { value: 2000 },
                        { value: 2500 },
                      ]
                    : []
                  : []
              }
              disabled={false}
              onChangeText={async (value, index) => {
                // console.error(index +"  "+ mI);
                if (finalItem) {
                  if (finalItem.item_unit == "gram") {
                    var arr = [
                      "20",
                      "25",
                      "50",
                      "100",
                      "200",
                      "250",
                      "500",
                      "1000",
                      "1500",
                      "2000",
                      "5000",
                    ];
                    this.props.updateQTY(arr[index]);
                  } else if (finalItem.item_unit == "ml") {
                    var arr = [
                      "100",
                      "200",
                      "300",
                      "500",
                      "1000",
                      "1500",
                      "2000",
                      "2500",
                    ];

                    this.props.updateQTY(arr[index]);

                  }
                }
              }}
            />

            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="grey"
              placeholder="आइटम विवरण."
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              secureTextEntry={false}
              maxLength={10}
              fontSize={14}
              value={orderDescription}
              onChangeText={(text) => {
                this.props.updateDescription(text);
              }}
            />
            <Text style={{ fontSize: 19, marginTop: 10, marginBottom: 10 }}>
              {" "}
              Unit : {finalItem ? finalItem.item_unit : null}
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              disabled={ false }
              onPress={() => {

                this.props.onSelectedItem();
              }}
            >
              <Text style={styles.buttonText}>+ आईटम जोड़े</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 390,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    margin: 15,
    width: "80%",
    alignSelf: "center",
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
    padding: 20,
    width: "100%",
  },
  inputStyle: {
    borderRadius: 10,
    height: 44,
    width: "100%",
    fontSize: 19,
    paddingLeft: 3,
    paddingRight: 5,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "transparent",
    height: 44,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
  sunCatagory: order.sunCatagory,
  orderDescription: order.orderDescription,
});

export default connect(mapStateToProps, {
  onSelectedItem,
  onChangeTextItemSelect,
  updateQTY,
  onChangeSubItemSelect,
  updateDescription,
})(ModalItem);
