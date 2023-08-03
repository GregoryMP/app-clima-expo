import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import Clima from "./src/components/Clima";
import Formulario from "./src/components/Formulario";
import ImageFond from "./src/components/ImageFond";
import ImageGif from "./src/components/ImageGif";
//Contraseña:04169386492
//Usuario:daniel0028

export default function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgColor] = useState(null);
  const [fond, cambiasFond] = useState(ImageFond.DEFAULT);
  const [emoji, cambiarEmoji] = useState(null);
  const [estadoEmoji, setEstadoEmoji] = useState("");
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appID = API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          console.log(pais);

          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;
          if (actual < 12) {
            guardarBgColor("rgba(135,206,250,0.7)");
            cambiarEmoji(ImageGif.Frio);
            setEstadoEmoji("Hace mucho frio");

            //cambiasFond('https://images.unsplash.com/photo-1415804941191-bc0c3bbac10d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80')
          } else if (actual >= 12 && actual < 25) {
            //guardarBgColor('rgb(71,149,212)')
            //cambiarEmoji("Esta nublado 😒")
            guardarBgColor("rgba(255,255,255,0.7)");
            cambiarEmoji(ImageGif.Alegre);
            setEstadoEmoji("Hace un buen clima");
          } else {
            //guardarBgColor('rgb(178,28,61)')
            guardarBgColor("rgba(247,94,37,0.7)");
            cambiarEmoji(ImageGif.Calor);
            setEstadoEmoji("Hace mucho calor");
          }

          if (pais === "PE") {
            cambiasFond(ImageFond.PE);
          } else if (pais === "US") {
            cambiasFond(ImageFond.US);
          } else if (pais === "AR") {
            cambiasFond(ImageFond.AR);
          } else if (pais === "CO") {
            cambiasFond(ImageFond.CO);
          } else if (pais === "ES") {
            cambiasFond(ImageFond.ES);
          }

          console.log("cambio");
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert("Error", "No hay resultados, intenta con otra ciudad o pais", [
      { text: "OK" },
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  //const bgColorApp = { backgroundColor: bgcolor }

  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <ImageBackground
          source={{ uri: fond }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "rgba(255,255,255,0.6)",
              width: "80%",
              alignSelf: "center",
              marginTop: 15,
              padding: 8,
              borderRadius: 10,
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: "bold",
              paddingBottom: 5,
            }}
          >
            Aplicacion del Clima
          </Text>
          <View style={styles.app}>
            <View style={styles.contenido}>
              <Clima
                resultado={resultado}
                //style={styles.climatico}
              />
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: bgcolor,
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    fontSize: 18,
                    color: "black",
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    paddingTop: 3,
                  }}
                >
                  {" "}
                  {estadoEmoji}
                </Text>
                <Image
                  source={{ uri: emoji }}
                  style={{ width: 35, height: 35 }}
                />
              </View>
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
