import React, { Component, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Dropdown } from "react-native-material-dropdown";
import {
  onSelectedItem,
  onChangeTextItemSelect,
  updateQTY,
  onChangeSubItemSelect,
  updateDescription,
  onCloseOrderModal
} from "../actions/order";
import {CANCELICON,MODALIMAGEITEM} from "../assets";
import MyButton from "./MyButton";

let screenHeight = Dimensions.get('window').height;
class ModalItem extends Component {
  render() {
    const {
      selectedMurchant,
      isModalItem,
      finalItem,
      finalQty,
      sunCatagory,
      orderDescription,
      sub_Selectitems
    } = this.props;
    var data = [];
    var data1 = [];
    var data2 = [];
    var mI = 0;

    //console.error(sunCatagory);

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
        <ScrollView>
        <View style={{backgroundColor:'rgba(280,280,280,0.8)', height:screenHeight}}>
        <Text style={{
          zIndex:10,
          borderWidth:5,
          borderRadius:25, 
          alignSelf:'center',
          backgroundColor:'#fff',
          borderColor: "#572179",
          marginTop:45,
          width:150,
          position:'absolute',
          fontSize:15,
          color:'#572179',
          justifyContent:'center',
          textAlign:'center',
          paddingTop:10,
          paddingBottom:5
          }}>+ आईटम जोड़े</Text>
        <View style={styles.container}>
        <TouchableOpacity
        style={{height:25,width:25,alignSelf:'flex-end',right:15,top:10,justifyContent:'center',alignItems:'center'}}
        onPress={()=>{this.props.onCloseOrderModal()}}
        >
            <Image style={{height:12,width:12}} source={CANCELICON} />
          </TouchableOpacity>
          <View style={styles.mainContainer}>
            <Dropdown
            baseColor="#573985"
            textColor="#573985"
            id="item"
            key="items"
              label="आइटम"
              data={data}

              onChangeText={async (value, index) => {
                this.props.onChangeTextItemSelect(index);
                mI = index;
              }}
            />
            <Dropdown
            baseColor="#573985"
            textColor="#573985"
            id="subItem"
            key="subItems"
              style={{ width: "100%" }}
              label="उप आइटम"
              value={sub_Selectitems?sub_Selectitems:''}
              data={sunCatagory.length > 0?sunCatagory:[]}
              onChangeText={async (value, index) => {
                // console.error(index +"  "+ mI);

                this.props.onChangeSubItemSelect(index);
              }}
            />
            <View style={{width:'100%',flexDirection:'row'}}>
            <Dropdown
            baseColor="#573985"
            textColor="#573985"
            containerStyle={{flex:1}}
              label="आइटम तादाद"
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
            <Text style={{ fontSize: 16,marginTop:35,color:'#573985' }}>
              {" "} {finalItem ? finalItem.item_unit : null}
            </Text>
            </View>
            
            <TextInput
              underlineColorAndroid="#573985"
              style={styles.inputStyle}
              underlineColorAndroid="grey"
              placeholder="आइटम विवरण तथा तादाद"
              placeholderTextColor="#573985"
              autoCapitalize="none"
              secureTextEntry={false}
              maxLength={10}
              fontSize={14}
              value={orderDescription}
              onChangeText={(text) => {
                this.props.updateDescription(text);
              }}
            />
            {/* <Text style={{ fontSize: 10, marginTop: 5, marginBottom: 5 }}>
              {" "}
              Unit : {finalItem ? finalItem.item_unit : null}
            </Text> */}
            
            <MyButton
            style={{width:'75%',alignSelf:'center'}}
            myButtonText="+ आईटम जोड़े"
            onPress={() => {
              if(finalItem ==="" || finalQty === ""){
                  if(finalQty === ""){
                    alert("कृपया आइटम की तादाद सेलेक्ट करे |")  
                  } else{
                    alert("कृपया आइटम सेलेक्ट करे |")
                  }
                  
              } else {
                this.props.onSelectedItem();
              }
              
            }}
           />
          </View>
          <Image source={MODALIMAGEITEM}
                  
                  style={{
                      position:'absolute',
                      bottom:0,
                      width:'100%',
                      height:'35%'
                      }} resizeMode="stretch" />  
        </View>
        </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "18%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: '90%',
    borderWidth: 5,
    borderColor: "#572179",
    borderRadius: 20,
    margin: 15,
    width: "85%",
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
    paddingRight: 20,
    paddingLeft:20,
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
  sub_Selectitems:order.sub_Selectitems
});

export default connect(mapStateToProps, {
  onSelectedItem,
  onChangeTextItemSelect,
  updateQTY,
  onChangeSubItemSelect,
  updateDescription,
  onCloseOrderModal
})(ModalItem);
