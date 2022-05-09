import * as React from 'react';
import { Text, View, StyleSheet ,TextInput,Button,ActivityIndicator,FlatList,Alert } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Provider } from 'react-redux';
import axios from "axios"



// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
const Stack = createNativeStackNavigator();

const DATA = [
  {
    id: 1,
    title: 'First article ',
  },
  {
    id: 2,
    title: 'Second Item',
  },
  {
    id: 3,
    title: 'Third Item',
  },
];

const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [articleSearch, setArticleSearch] = React.useState('');
const [articleList,setArticleList] = React.useState(DATA);
const [loginDetails,setLoginDetails] = React.useState([{username:"username",password:"password"}]);
const [isButtonDisabled,setIsButtonDisabled] = React.useState(false)
const [isLoading,setIsLoading] = React.useState(false)
const [loadData,setLoadData] = React.useState(true)
const [isLogin,setIsLogin] = React.useState(false)
const [responseToken,setResponseToken] = React.useState('')
let config = {
  headers: {
    'Authorization': 'Bearer ' + responseToken
  }
}


React.useEffect(async ()=>{
  await  axios.get("http://34.245.213.76:3000/articles",config)
  .then(res=>{console.log(res.data)}).catch(err=>{})
},[responseToken,setResponseToken])


const validateEmail = (email)=>{
  const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if(reg.test(email)){
      console.log("email verified")
        return true;
    }
    console.log('Please enter valid email.');
    return false;
}

const articleSearchHandler =(e)=>{
setArticleSearch(e)




let newArticle = DATA.filter((list) => list.title === e)




setArticleList(
  newArticle
)
if (!articleSearch){
  setArticleList(DATA)
  setLoadData(true)
}



}


const usernameHandler =(e)=>{
  if(!e){
    console.log("enter something")
  }

  if(e){
    validateEmail(e)
  }
setUsername(e)
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const passwordHandler =(e)=>{
setPassword(e)
}

const loginFormHandler = ()=>{
  
}

const cancelSearchHandler = () =>{
}





const LoginComponent= ({ navigation })=>{

  return (
     <View style={styles.container}>
<TextInput style={styles.input} onChangeText={usernameHandler} value={username} 
placeholder="Username"
  />
<TextInput style={styles.input} onChangeText={passwordHandler} value={password} 
placeholder="Password"
/>
 <Button title="Login" onPress={async ()=>{
  await  axios.post("http://34.245.213.76:3000/auth/signin",{username:username,password:password})
    .then(res=>{
      setResponseToken(res.data.accessToken)
    }
      ).then((res)=>{
        setIsLogin(true)
        if(isLogin){
          navigation.navigate('Dashboard')
        }
       
      })
      .catch(err=>{console.log(err)
     }
      )
   
   
       

    
   


  //  else{
  //    console.log("Login Failed")
  //  }
 }} disabled={isButtonDisabled}  />
    <ActivityIndicator size="large" animating={isLoading} />
    </View>
  )
}

const DashboardComponent = ({navigation})=>{
      const renderItem = ({ item }) => <Item title={item.title} />;

  return <View>
  <TextInput style={styles.input} onChangeText={articleSearchHandler} value={articleSearch} 
placeholder="Search Article"

  />
<MaterialIcons name="cancel" size={24} color="black" onClick={cancelSearchHandler} />
        <FlatList data={articleList} renderItem={renderItem} keyExtractor={item => item.id} />

      <ActivityIndicator size="large" animating={false} />
  <Button title="Login Out" onPress={()=>{navigation.navigate('Login')}}/>
  </View>
}

  return (
          // <Provider>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Dashboard" component={DashboardComponent} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
