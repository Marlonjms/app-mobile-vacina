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

        /*Essa view vai servir para mostrar a imagen/logo do app(calendario com a vacina azul)*/

        <View style={styles.imagenLogo}> 
           <Image source={require("../../../assets/Logo.png")}/>
        </View>


    );

} 
export function MargemSuperioHome(){
    return(

        /*Essa view vai servir para mostrar a imagen/logo do app(calendario com a vacina azul)*/

        <View style={styles.MargemSuperior}> 
      
        </View>


    );

} 





export function TitleHOme(){
    return(
        
         /* Essa View vai ser usada para motrar o texto lá na tela home */
    
     <View style={styles.boxTexto}>
        <Text style={styles.CaixaTextoNomeHOme} >
             <Text style={styles.TextoNomeHOme}>olá beltrano!{'\n'}</Text>
             <Text style={styles.textoHome}>No nosso app, você pode{'\n'}consultar todas as informações{'\n'}relacionadas as suas vacinas{'\n'}cadastrada.  </Text>
        </Text>
     </View>

    );
}


export function ImageLogoPacienteHome(){
    return(
        /* essa imagem é um de uma criança tomando a vacina  */
        <View style={styles.caixaimagenHome}>
            <Image style={styles.imagenHome} source={require("../../../assets/imgpaciente.png")} resizeMode="contain"/>
        </View>


    );
}



export function MargeminferioroHome(){
    return(

        /*Essa view vai servir para mostrar a imagen/logo do app(calendario com a vacina azul)*/

        <View style={styles.Margeminferior}> 
        
        </View>


    );

} 
