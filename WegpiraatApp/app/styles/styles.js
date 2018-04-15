import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    //containers
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalContainer: {
      height:300, 
      backgroundColor:"white", 
      alignItems:"center"
    },
    scrollContainer: {
      flexGrow: 1, 
      flexDirection: "column",
      justifyContent:"space-between"
    },   
    rowContainer: {
      flexDirection:"row",
      alignItems:"center", 
      justifyContent:"space-between"
    },
    stretchContainer: {
      alignItems:"center", 
      alignSelf:"stretch",
      backgroundColor:"white"
    },
    centerRowContainer: {
      flex:1,
      flexDirection:"row",
      alignItems:"center", 
      justifyContent:"center"
    },
    flatContainer: {
      alignItems: "center",
      backgroundColor: "white",
      marginTop: 20,
      marginBottom: 20,
      padding:20,
    },
    commentContainer: {
      backgroundColor: "#F5F5F5",
      margin: 5,
      padding: 10,
      borderRadius: 5
    },
    card: {
      justifyContent:"space-between",
      backgroundColor: "white",
      flexDirection:"column",
      padding: 22,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },

    //pictures
    image: {
      height:200,
      width:300, 
    },
    icon: {
      width:30,
      height:30
    },

    //entries
    entry: {
      width:200,
      height:40,      
      fontWeight:"bold",
      textAlign:"center",      
    },
    multiline: {
      textAlignVertical: "top",
      textAlign:"left",
      backgroundColor:"white",
      padding:5,        
      height:60,
      borderColor: "rgba(0,0,0,0.4)",
      borderWidth: 1        
    },
    
    //headers
    commentHeader: {
      fontSize: 12,
      fontWeight: "bold"
    },
    h1:{
      fontSize:30, 
      fontWeight:"bold",
    },
    h2: {
      fontSize:20,
      fontWeight:"bold",
      color: "#212121"
    },
    entryHeader: {
      fontWeight:"bold",
      fontSize:16,
    },

    //texts
    commentBody: {
      fontSize: 10, 
      marginLeft: 30   
    },
    p: {
      width:200,
      fontSize: 11
    },
    a:{
      color:"steelblue", 
      textDecorationLine:"underline"
    },
    errorMessage: {
      color: "red",
      fontSize: 16,
      fontFamily: "Roboto",        
    },
    standardButtonText: {
      fontSize: 16,
    },

    //buttons
    commentButton: {
      flexDirection:"row",
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#CFD8DC',
      padding: 10,
      height:40,   
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    standardButton: {
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#CFD8DC',
      padding: 10,
      width:200,
      height:50,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },

    //modals
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0
    }, 

    //shadows 
    smallShadow: {
      shadowOffset:{  width: 10,  height: 20,  },
      shadowColor: 'black',
      shadowOpacity: 0.2,
    }
  
});