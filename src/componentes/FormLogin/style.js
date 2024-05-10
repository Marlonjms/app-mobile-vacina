import { StyleSheet } from "react-native";
const styles = StyleSheet.create({


// vai estilizar a caixa, onde estão os inputs
    forms:{
        paddingTop:23,
        alignItems: 'center',
          flex: 1,
    },


// vai estilizar os inputs

input:{
    width: "75%",
    backgroundColor: "#FFFFFF",
    height: 40,
    margin: 12,
    paddingLeft: 20,
    borderColor: "#000000",
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius:17,
    
},

// vai estilizar o botão de login
botaoLogin:{
    borderRadius:18,
    alignItems:"center",
    justifyContent:"center",
    width:"60%",
    backgroundColor:"#2E9371",
    paddingTop:10,
    paddingBottom:10,
    marginLeft:12,
    marginTop:40,

    // vai estilizar o texto do botão
},
textBotaoLogin:{
    color:"#FFFFFF",
    
   // vai estilizar o texto de cadastrar o botão
},
textoCadastrar:{
    marginTop:40,
    fonteSize:8,
}



});

export default styles