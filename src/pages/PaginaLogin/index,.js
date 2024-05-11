import React from 'react';
import { View} from 'react-native';
import { ImageLogo } from '../../componentes/Titulos_e_Logos/index';
import { Title } from '../../componentes/Titulos_e_Logos/index';
import FormPaginaLogin from '../../componentes/FormLogin/index';






export default function Login() {
  return (
    <View>
      
      {/* eu criei os componentes em pastas diferentes, e importei aqui, o title é o titulo do app, imageLogo vai ser aquela
       imagem logo abaixo do titulo que tem um calendario com uma vacina 
        e o Form é a parte que tem os inputs, botão, e a opção de se cadastrar. tbm tem toda a lógica para funcionar. ou seja, crie a pagina de login 
        dividia po partes e juntei as partes dela aqui.*/}

        <Title/> 
        <ImageLogo/>
        <FormPaginaLogin/>


   </View>
    
  );
}