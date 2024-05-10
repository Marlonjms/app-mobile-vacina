import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './style';

export default function Form() {

  const [cpf, setCpf] = useState(null)
  const [senha, setSenha] = useState(null)
  const [textButton, setTextButton] = useState("Login")

  const createAlert = () => Alert.alert(
    "Oops!",
    "Verifique se o campo Cpf e senha estão preenchidos."
  
);

const homeImproviso = () => Alert.alert(
  "Deu certo"
);

function limpaCampos() {
  if (!cpf || !senha) {
    createAlert();
} else {
    // aqui é para chamar a tela home...
    homeImproviso();

    }
}




    return (
      <View style={styles.forms}>
       <TextInput
          style={styles.input}
          placeholder="cpf"
          keyboardType={'numeric'}
          onChangeText={setCpf}
          value={cpf}
        />
        <TextInput
          style={styles.input}
          placeholder="senha"
          keyboardType={'default'}
          onChangeText={setSenha}
         value={senha}

        />
          <TouchableOpacity
           style={styles.botaoLogin} 
           
           onPress={() => limpaCampos()}>
        

            <Text style={styles.textBotaoLogin}>{textButton}</Text>
          </TouchableOpacity >
        {/* falra só teriminar aqui */}
         <Text style={styles.textoCadastrar}>não possuí conta? Registre-se</Text> 
      </View>


      
    );
  }

  












































// import React, { useState } from 'react';
// import { TextInput, View, Text, TouchableOpacity } from 'react-native';
// import ResultImc from './Resultimc/index';
// import styles from './style';

// export default function Form() {
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
//   const [imc, setImc] = useState(null);
//   const [textButton, setTextButton] = useState("Calcular");

//   function imcCalculator() {
//     if (weight !== '' && height !== '') {
//       const calculatedImc = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))).toFixed(2);
//       setImc(calculatedImc);
//       return calculatedImc;
//     }
//     return null;
//   }

//   function validationImc() {
//     const calculatedImc = imcCalculator();
//     if (calculatedImc !== null) {
//       setHeight('');
//       setWeight('');
//       setMessageImc("Seu IMC é igual:");
//       setTextButton("Calcular novamente");
//     } else {
//       setMessageImc("Preencha o peso e altura");
//       setTextButton("Calcular");
//     }
//   }

//   return (
//     <View style={styles.formContext}>
//       <View style={styles.form}>
//         <Text style={styles.formLabel}>Altura</Text>
//         <TextInput style={styles.input}
//           onChangeText={(text) => setHeight(text)}
//           value={height}
//           placeholder='Ex. 1.75'
//           keyboardType={'numeric'}
//         />

//         <Text style={styles.formLabel}>Peso</Text>
//         <TextInput style={styles.input}
//           onChangeText={(text) => setWeight(text)}
//           value={weight}
//           placeholder="EX. 75.36"
//           keyboardType={'numeric'}
//         />
    
//         <TouchableOpacity 
//          style={styles.buttonCalculator}
//           onPress={() =>{
//             validationImc()
//             }}
//             >
//             <Text style={styles.textButtonCalculator}>{textButton}</Text>
//           </TouchableOpacity >
//       </View>

//       <ResultImc messageResultImc={messageImc} resultImc={imc} />
//     </View>
//   );
// }
