import React from 'react'
import {View, Text, Image} from 'react-native'
import styles from './style';

export function Title(){
    return(
        
         /* Essa View vai ser usada para motrar o titulo na tela de login */
    
     <View style={styles.boxTitle}>
         <Text style={styles.textoTitle}>CARTÃO DE VACINA</Text>
     </View>

    );
}

export function ImageLogo(){
    return(

        /*Essa view vai servir para mostrar a imagen/logo do app(calendario com a vacina)*/

        <View style={styles.imagenLogo}> 
           <Image source={require("../../assets/Logo.png")}/>
        </View>


    );
}