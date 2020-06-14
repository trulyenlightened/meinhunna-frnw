import React, { Component, useReducer } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import call from "react-native-phone-call";
import MyButton from "./MyButton";
import { onHelpLineMenu } from '../actions/auth';
import {CANCELICON} from "../assets"

let screenHeight = Dimensions.get('window').height;
class HelpModal extends Component {
  render() {
    
    return (
        <Modal
        visible={this.props.isHelpLineModal}
        animationType="slide"
        transparent={true}
       
        >
            <View style={{height:screenHeight+10,backgroundColor:'rgba(280,280,280,0.7)'}}>
            <TouchableOpacity
                onPress={()=>{
                    this.props.onHelpLineMenu(false);}}
                style={{
                    marginTop:20,
                    height:25,
                    width:25,
                    alignSelf:'flex-end',
                    marginRight:20,
                    justifyContent:'center',
                    alignItems:'center'
                }} 
              >
                  <Image style={{}} resizeMode='center' source={CANCELICON} />
              </TouchableOpacity>
          <View style={{justifyContent:'center',height:'80%',}}>
              
          <MyButton
            myButtonText="कॉल हेल्पलाइन"
            onPress ={()=>{
              const args = {
                number: '8795290744',
                prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
              };
              this.props.onHelpLineMenu(false)
              call(args).catch(console.error);
            }} 
           />
           </View>
           </View>
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
    height: 420,
    borderWidth: 5,
    borderColor: "#572179",
    borderRadius: 20,
    margin: 15,
    width: "80%",
    alignSelf: "center",
  },
  
});

const mapStateToProps = ({ auth }) => ({
    isHelpLineModal:auth.isHelpLineModal
});

export default connect(mapStateToProps, {
    onHelpLineMenu
})(HelpModal);
