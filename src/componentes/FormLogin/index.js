
import { TextInput, View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

export default function Form() {
    return (
      <View style={styles.forms}>
       <TextInput style={styles.input}
          placeholder="cpf"
          keyboardType={'numeric'}
        />
        <TextInput style={styles.input}
          placeholder="senha"
          keyboardType={'email'}
        />
          <TouchableOpacity style={styles.botaoLogin} >
            <Text style={styles.textBotaoLogin}>login</Text>
          </TouchableOpacity >

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
