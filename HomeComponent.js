import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


var apiKey = "XDqg3JNxoDQqaz0kh6WQGR9TVM6HamsBlsD0WkU3";

export default class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            astroidId: "",
        }
    }

    onAstroidIdEnter = (text) => {

        if (text.trim() != "") {
            this.setState({ astroidId: text });
        }
    }
    onSubmitClick = () => {
        this.getAsteroidDetailById(this.state.astroidId);
    }
    onRandomAsteroidClick = () => {
        this.getRandomAsteroidId();
    }

    getAsteroidDetailById(astroidId) {
        fetch("https://api.nasa.gov/neo/rest/v1/neo/" + astroidId + "?api_key=" + apiKey)
            .then(res => res.json())
            .then((response) => {
                this.props.navigation.navigate("Detail", { detail: response });

            }).catch(error => {
                Alert.alert("", "Incorrect Asteroid Id Entered");
            })
    }


    getRandomAsteroidId = () => {
        fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey)
            .then(res => res.json())
            .then((response) => {
                var randomIndex = Math.floor(Math.random() * Math.floor(response.page.size - 1));
                this.getAsteroidDetailById(response.near_earth_objects[randomIndex].id);

            }).catch((error) => {
                Alert.alert("", "Something went wrong");

            })
    }
    render() {
        return (
            <View style={{ padding: 20 }}>

                <TextInput placeholder="Enter Asteroid ID"
                    onChangeText={(text) => this.onAstroidIdEnter(text)}>
                </TextInput>

                <TouchableOpacity style={styles.btnStyle}
                    disabled={this.state.astroidId === "" ? true : false}
                    onPress={this.onSubmitClick}>
                    <Text style={styles.btnTextStyle}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle}
                    onPress={this.onRandomAsteroidClick}>
                    <Text style={styles.btnTextStyle}>Random Asteroid</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: "green",
        marginTop: 20,
        padding: 10
    },
    btnTextStyle: {
        textAlign: 'center',
        color: 'white'
    }

})