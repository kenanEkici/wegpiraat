import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    //containers
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding:40
    },
    centerContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding:40    
    },
    modalContainer: {
      padding:35,
      height:440, 
      backgroundColor:"white", 
      alignItems:"center",
      justifyContent:"center",
      borderRadius:5,
    },
    optionsContainer: {
      padding:35,
      height:270, 
      backgroundColor:"white", 
      alignItems:"center",
      justifyContent:"center",
      borderRadius:5,
    },
    scrollContainer: {
      flexGrow: 1, 
      flexDirection: "column",
      justifyContent:"space-between",
    }, 
    scrollContainerCenter: {
      paddingTop:40,
      flexGrow: 1, 
      flexDirection: "column",
      alignItems:"center",
    }, 
    scrollContainerPadding: {
      padding:40,
      flexGrow: 1, 
      flexDirection: "column",
      justifyContent:"space-between",
    },     
    rowContainer: {
      flexDirection:"row",
      alignItems:"center", 
      justifyContent:"space-between",
    },    
    iconRowContainer: {
      flexDirection:"row",
      alignItems:"center", 
      justifyContent:"space-between",
      width: 250
    },
    stretchContainer: {
      alignItems:"center", 
      alignSelf:"stretch",
      backgroundColor:"white",
      padding: 20
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
      borderRadius: 5,
    },
    card: {
      justifyContent:"space-between",
      backgroundColor: "white",
      flexDirection:"column",
      padding: 22,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    profileCard: {
      backgroundColor: "white",
      flexDirection:"row",
      justifyContent: "space-between",
      padding: 10,
      marginBottom: 20,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
      width: 300
    },
    buttonContainer: {
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      padding: 10
    },

    //pictures
    image: {
      height:200,
      width:300,
      marginBottom: 20,
      marginTop: 20
    },
    icon: {
      width:30,
      height:30
    },
    profile: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:100,
      height:100,
      borderRadius:100,      
      marginBottom: 20,
    },

    //entries
    entry: {
      width:250,
      height:40,      
      fontWeight:"bold",
      textAlign:"center",
      marginBottom: 20 
    },
    multiline: {
      textAlignVertical: "top",
      textAlign:"left",
      backgroundColor:"white",
      padding:5,        
      height:60,
      borderColor: "rgba(0,0,0,0.4)",
      borderWidth: 1,
      marginBottom: 5,
      width:250,    
    },
    searchEntry: {
      width:300,
      height: 60,
      fontWeight: "bold",
      fontSize: 30, 
      textAlign:"center"
    },
    
    //headers
    commentHeader: {
      fontSize: 12,
      fontWeight: "bold"
    },
    h1:{
      fontSize:30, 
      fontWeight:"bold",
      marginBottom: 10,   
    },
    h2: {
      fontSize:20,
      fontWeight:"bold",
      color: "#212121",
      marginBottom: 20,  
      textAlign: "center" 
    },
    h3: {
      fontSize:16,
      fontWeight:"bold",
      color: "#212121",
      marginBottom: 20,   
    },
    entryHeader: {
      fontWeight:"bold",
      fontSize:16,
      marginBottom: 20,
    },

    //texts
    commentBody: {
      fontSize: 10, 
      marginLeft: 30   
    },
    standardText: {
      fontSize: 12,
      marginBottom:20
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
      marginBottom: 20,
      marginTop: 20  
    },
    standardButtonText: {
      fontSize: 16,
      color: "#1f1f1f",
      marginLeft: 20
    },
    profileButtonText: {
      fontSize: 10,
      marginBottom: 10,
      color: "#1f1f1f"
    },
    deleteButtonText: {
      color: "#ff2410"
    },
    plateText: {
      color: "#766b6b"
    },

    //buttons
    commentButton: {
      flexDirection:"row",
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#235604',
      padding: 10,
      height:40,
      width:250,
      borderColor: "rgba(0, 0, 0, 0.1)",
      marginBottom: 20, 
    },
    standardButton: {
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#CFD8DC',
      padding: 10,
      width:250,
      height:50,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
      marginBottom: 20,   
    },
    uploadButton: {
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#89bf71',
      padding: 10,
      width:250,
      height:40,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
      marginBottom: 20,
    },
    iconButton: {
      alignItems:"center"
    },
    optionsButton: {
      alignItems:"center",
      width:250,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "black",
      margin: 10,
      padding: 10
    },
    profileButton: {
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#89bf71',
      width: 70,
      padding: 10,
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
      margin: 10
    },
    deleteButton: {
      borderColor: "#ff2c14"
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
    },

    //header

    header: {
      backgroundColor: "#dedede"
    }
  
});