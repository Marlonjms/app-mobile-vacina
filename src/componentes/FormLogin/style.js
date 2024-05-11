import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  forms: {
    paddingTop: 23,
    alignItems: "center",
    flex: 1,
  },
  input: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    height: 40,
    margin: 12,
    paddingLeft: 20,
    borderColor: "#000000",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 17,
  },
  botaoLogin: {
    
    width: "50%",
    alignItems:"center",
    backgroundColor: "#2E9371",
    height: 44,
    margin: 45,
    borderColor: "#000000",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 17,
   

  },
  textBotaoLogin: {
     color:"#FFFFFF", // Alterado para azul conforme especificado
   },

   buttonCadastro:{
    width: "50%",
    alignItems:"center",
    backgroundColor: "",
    height: 44,
    marginBottom: 20,
    borderColor: "#000000",
    justifyContent: "center",
  
   

},

textCadastro: {
    fontSize: 12, 
    
    },



  textCadastroDestacado: {
    color: "#2E9371"
  },
  
});

export default styles;
