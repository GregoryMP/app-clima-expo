import React,{useState} from 'react';
import { Animated,Text, StyleSheet, View, TextInput,TouchableWithoutFeedback, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';


const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

  const {pais,ciudad}=busqueda;

  const [animacionBoton]=useState(new Animated.Value(1))

  const consultarClima=() => {
    if (pais.trim()=== '' || ciudad.trim()=== '') {
      mostrarAlerta();
      return;
    }
    //consultar la API
    guardarConsultar(true)
  }

  const mostrarAlerta=() => {
    Alert.alert('Error','Agrega una ciudad y pais para la busqueda',[{text: 'Entiendo'}])
  }

  const animacionEntrada=()=>{
    Animated.spring(animacionBoton,{
      toValue:.8,
      useNativeDriver:true
    }).start();
  //console.log('entrada...')
  }

  const animacionSalida=()=>{
    Animated.spring(animacionBoton,{
      toValue:1,
      friction:4,
      tension:30,
      useNativeDriver:true
    }).start();
  //console.log('salida...')
  }

  const estiloAnimaciion={
    transform:[{scale:animacionBoton}]
  }

  
  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
          value={ciudad}
          style={styles.input}
          placeholder='Ciudad'
          placeholderTextColor='#666'
          onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
          
          />
        </View>

        <View>
          <Picker 
          style={styles.paises}
          selectedValue={pais}
          onValueChange={pais => guardarBusqueda({...busqueda, pais})}
          >
            <Picker.Item label="Seleccione un pais" value=""/>
            <Picker.Item label="Estados Unidos" value="US"/>
            <Picker.Item label="Peru" value="PE"/>
            <Picker.Item label="Argentina" value="AR"/>
            <Picker.Item label="Colombia" value="CO"/>
            <Picker.Item label="España" value="ES"/>
          </Picker>
        </View>

        <TouchableWithoutFeedback
        delayPressIn
        onPressIn={()=> animacionEntrada()}
        onPressOut={()=> animacionSalida()}
        onPress={()=> consultarClima()}
        
        >
          <Animated.View style={[styles.btnbuscar,estiloAnimaciion]}>
            <Text style={styles.textobuscar}> Buscar el clima </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formulario:{
    marginTop:100,
  },
  input:{
    padding:10,
    height:45,
    backgroundColor:"#FFF",
    fontSize:20,
    marginBottom:20,
    textAlign:"center"
  },
  paises:{
    height:45,
    backgroundColor:"#FFF",
    textAlign:"center"
  },
  btnbuscar:{
    height:45,
    marginTop:50,
    backgroundColor:"#000",
    padding:10,
    justifyContent:"center",
    textAlign:"center",
    marginHorizontal:90,
    borderRadius:15
  },
  textobuscar:{
    color:"#FFF",
    fontWeight:"bold",
    textTransform:"uppercase",
    textAlign:"center",
    fontSize:18
  }
});

export default Formulario;
