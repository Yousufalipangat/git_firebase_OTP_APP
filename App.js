import  firebase  from "@react-native-firebase/auth";
import React, { useEffect, useRef, useState } from "react";

import {
View,
Text,
StyleSheet,
TextInput,
Button,


} from 'react-native';


export default App = ()=>{

  const [confirmation,setconfirmation] = useState();
  const [code,setcode] = useState({1:"",2:"",3:"",4:"",5:"",6:""});
  const [ph,setph] = useState();
  const [user,setuser] = useState();
  const firstOTP = useRef();
  const secondOTP = useRef();
  const thirdOTP = useRef();
  const forthOTP = useRef();
  const fifthOTP = useRef();
  const sixthOTP = useRef();

  useEffect(()=>{

    firebase().onAuthStateChanged((user)=>{
        setuser(user)
    })

   

  },[])
  const phSignIn = async ()=>{

    const confirmation = await firebase().signInWithPhoneNumber(ph)
    setconfirmation(confirmation)

  }

  const confirmCode = async ()=>{
    try{
     // console.log(confirmation)
      const combinedCode = code[1] + code[2]+code[3]+code[4]+code[5]+code[6];
      await confirmation.confirm(combinedCode)

    if(user){
      console.log(user)
    }

    }catch(error){
      console.log('Invalid code'+JSON.stringify(error.message))
    }
  }

  return(
  <View style={{width:"100%",height:'100%',justifyContent:'center',alignItems:'center'}}>

    <View style={{width:'80%'}}>
      <TextInput keyboardType="phone-pad" style={{borderColor:'black',borderWidth:1,width:'100%',borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{setph(text)}}
      placeholder="Phone Number"

      />
    <Button  title="Send OTP" color={'teal'} onPress={()=>{
      console.log('clicked')
      phSignIn();
    }} />
      
    </View>
{ confirmation &&

    <View style={{width:'80%'}}>
      <View style={{flexDirection:'row'}}>
      <TextInput ref={firstOTP} maxLength={1} keyboardType="phone-pad" style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && secondOTP.current.focus();

        setcode(prev => ({...prev,1:text}))}}
      />
      <TextInput ref={secondOTP} maxLength={1} keyboardType="phone-pad"style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && thirdOTP.current.focus();
        setcode(prev => ({...prev,2:text}))}}
      />
      <TextInput ref={thirdOTP} maxLength={1} keyboardType="phone-pad"style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && forthOTP.current.focus();
        setcode(prev => ({...prev,3:text}))}}
      />
      <TextInput ref={forthOTP} maxLength={1} keyboardType="phone-pad"style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && fifthOTP.current.focus();
        setcode(prev => ({...prev,4:text}))}}
      />
      <TextInput ref={fifthOTP} maxLength={1} keyboardType="phone-pad"style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && sixthOTP.current.focus();
        setcode(prev => ({...prev,5:text}))}}
      />
      <TextInput ref={sixthOTP} maxLength={1} keyboardType="phone-pad"style={{borderColor:'black',borderWidth:1,flex:1,borderRadius:5,marginVertical:20,paddingLeft:15,marginHorizontal:5}}
      onChangeText={(text)=>{
        text && firstOTP.current.focus();
        setcode(prev => ({...prev,6:text}))}}
      />
      </View>
      <Button title="verify" onPress={()=>{
        console.log('verify clicked')
        confirmCode()}} color='teal'/>
    </View>
    
}

{ user &&
<View style={{width:'80%'}}>
  <Text style={{color:'black',fontSize:15,marginVertical:10}}>User successfully signed in !!. Details below:</Text>
  <Text>{JSON.stringify(user)}</Text>
     
    <Button  title="Logout" color={'teal'} onPress={()=>{
      console.log('logout')
      firebase().signOut();
    }} />
    </View>
}
  </View>

  
  )
}