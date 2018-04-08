import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      centerItems:{
        alignItems:"center"
      },
      h1:{
        marginBottom:40,
        fontSize:30, 
        fontWeight:"bold",
        marginTop:20
      },
      h2: {
        marginBottom:25,
        fontSize:20,
        fontWeight:"bold"
      },
      margebolarge: {
        marginBottom: 50,
        width:200
      },
      margebomedium: {
        marginBottom: 20,
        width:200,        
      },
      exotic:{
        backgroundColor: "#81C784"
      },
      button: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#BBDEFB',
        padding: 10,
        width:120,
        height:50,
        borderRadius: 4,       
        borderColor: "rgba(0, 0, 0, 0.1)"
      },      
      content: {
        justifyContent:"space-between",
        backgroundColor: "white",
        flexDirection:"column",
        padding: 22,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
      },
      entry: {
        width:200,
        height:40,
        marginBottom:20,
        fontWeight:"bold",
        textAlign:"center"
      },
      bottomModal: {
        justifyContent: "flex-end",
        margin: 0
      },
      textBomb: {        
        color: "#424242",
        fontSize:20,
        fontWeight:"bold",
        fontFamily: "Roboto"
      },
      smallTextBomb: {        
        color: "#424242",
        fontSize:18,
        fontWeight:"bold",
        fontFamily: "Roboto"
      },
      miniTextBomb: {        
        color: "black",
        fontSize:16,
        fontFamily: "Roboto"
      },
    });