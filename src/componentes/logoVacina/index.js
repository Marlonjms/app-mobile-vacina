import { TextInput, View, Text, Image} from 'react-native';
import styles from './style';

export default function Login() {
    return (
      <View style={styles.imagen}>
           <Image source={require("../../assets/Logo.png")}/>
     </View>
      
    );
  }

  