import React,{Component, useReducer} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from "react-native-material-dropdown";
import {onSelectedItem,onChangeTextItemSelect,updateQTY} from "../actions/user"


class ModalItem extends Component {
  
  render(){
    const {selectedMurchant,isModalItem,finalItem,finalQty} = this.props;
    let data = [];
    let data1 = [];
    if(selectedMurchant){
    selectedMurchant.items.map((d)=>{
    
    data.push({value:d.item_name,d})
    data1.push({value:d.sub_items,d})
   })
    }
    return (
      <Modal
            visible={isModalItem}
            onRequestClose={() => {}}
            animationType="slide"
            transparent={true}
          >
      <View style={styles.container}>
        <Text style={styles.headerText}>Items</Text>
        <View style={styles.mainContainer}>
        <Dropdown
            label="Items "
            data={data}
            onChangeText={(value,index)=>{ this.props.onChangeTextItemSelect(index)}}
            />
        <Dropdown
            label="sub Items"
            data={data1}
            />

        <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="#000000"
                placeholder="Qty."
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                secureTextEntry={false}
                maxLength={10}
                keyboardType={"phone-pad"}
                value={finalQty}
                onChangeText={text => {
                   this.props.updateQTY(text);
                }}
              />
              <Text>
              {finalItem?finalItem.item_unit:null}</Text>
          <TouchableOpacity
          style={styles.addButton}
          onPress={()=>{this.props.onSelectedItem()}}
          >
            <Text style={styles.buttonText}>
            + Add item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:390,
    borderWidth:1,
    borderColor:'#000',
    borderRadius:5,
    margin:15
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
  inputStyle:{
    borderRadius: 10,
    height: 48,

    marginBottom: 20,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  addButton:{
    marginTop:10,
    backgroundColor: "transparent",
    height: 44,
    width: 156,
    borderRadius: 10,
      backgroundColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom:2,
    right:5
  },
  buttonText:{
    fontSize:18,
    color:"grey",
  fontWeight:'bold',
  },
  unitText:{
    marginTop:-50,
    right:25
  }
});

const mapStateToProps = ({user}) => ({
  selectedMurchant:user.selectedMurchant,
  isModalItem:user.isModalItem,
  finalItem:user.finalItem,
  finalQty:user.finalQty
});


export default connect(
  mapStateToProps,
  {
    onSelectedItem,
    onChangeTextItemSelect,
    updateQTY
  }
)(ModalItem);