import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';

const Home = props=>{

    const suggestions =(title,src)=>{
        return(
        <TouchableOpacity style={styles.suggestedViews} onPress={()=>{Alert.alert(title)}}>
            <Image
            style={styles.logo} 
            source={src}
            resizeMode='contain'
            />
            <Text style={styles.tertiaryFont}>{title}</Text>
        </TouchableOpacity>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <View style={styles.addNeed}>
                    <View style={{marginTop:30}}>
                        <Text style={styles.bigText}>What do you need ?</Text>
                        <Text style={styles.tertiaryText}>Create need and we will fulfill it</Text>
                    </View>
                    <TouchableOpacity style={styles.createNeed} onPress={()=>{props.navigation.navigate('Create')}}>
                        <Text style={{color:Constant.GREY_PLACEHOLDER}}>+ Help me pack for moving house ...</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollArea}>
                    <Text style={{fontWeight:'bold', fontSize:Constant.SECONDARY_FONT_SIZE, paddingLeft:25}}> Suggested </Text>
                   
                    <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-evenly'}}>
                        {suggestions('Cleaning', require("../../assets/images/cleaning.png"))}
                        {suggestions('Grocery', require("../../assets/images/grocery.png"))}
                        {suggestions('Laundry', require("../../assets/images/laundry.png"))}
                        {suggestions('Handyman', require("../../assets/images/handyman.png"))}
                        {suggestions('Cooking', require("../../assets/images/cook.png"))}
                        {suggestions('Elderly care', require("../../assets/images/elderly.png"))}
                    </View>

                </ScrollView>
            </View>
        <Header header={true} logo={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    mainArea:{
       // backgroundColor:'yellow',
        flex:1, 
        width:'100%', 
        paddingTop:94,
    },
    addNeed: {
        backgroundColor:Constant.PRIMARY_COLOR, 
        width:Constant.DEVICE_WIDTH, 
        //height:210,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        justifyContent:'space-between',
        //alignItems:'center',
        paddingHorizontal:25,
    },
    bigText:{
        color:'white',
        fontSize: 25,
        fontWeight:'bold'
    },
    tertiaryText:{
        color: '#B9E9FF',
        fontSize: Constant.TERTIARY_FONT_SIZE,
       
    },
    createNeed:{
        marginVertical:35,
        padding: Platform.OS === 'ios'? 13 : 10,
        backgroundColor:'white',
        borderRadius:10,
    },
    scrollArea:{
       // paddingHorizontal:25,
        paddingVertical:20
    },
    suggestedViews:{
        width: Constant.DEVICE_WIDTH*0.4,
        height: Constant.DEVICE_WIDTH*0.4*0.65,
        marginVertical:10,
        backgroundColor:'white',
        borderRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        shadowOpacity:0.05, 
        shadowRadius:5, 
        shadowOffset:{width:0, height:2},
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.12,
        //backgroundColor:'yellow',
        height:Constant.DEVICE_WIDTH*0.4*0.32,
        marginVertical:7,
    },
    tertiaryFont:{
        fontSize:12,
    }
});

export default Home;