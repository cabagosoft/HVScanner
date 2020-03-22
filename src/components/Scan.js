import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from 'react-native-firebase';
import { Text, StatusBar, Linking, View, StyleSheet, Button, ToastAndroid, Modal, TouchableHighlight, Alert} from 'react-native';
import { Input } from 'react-native-elements';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            modalVisible: false,
            machine:'',
            fixed_asset: ''
        };
    }

    ref = firebase.firestore().collection('Maquinas')

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
            console.log(this.state.result)
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }

    saveMachine = () => {
        this.ref.add({
        machine: this.state.result.data,
        name: this.state.name
        })
        .then(ToastAndroid.show('Máquina creada correctamente', ToastAndroid.LONG))
    }

    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Text style={styles.descText}>Escanea el código QR para crear ó consultar máquinas</Text>

                            <Button
                                style={styles.buttonScan}
                                title="Escanear QR"
                                onPress={this.activeQR}
                            />

                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>{result.data}</Text>
                             <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{marginTop: 22}}>
                                    <View>
                                        <Text style={styles.textTitle1}>{result.data}</Text>

                                        <Input
                                            name="fixed_asset"
                                            label="Activo Fijo"
                                            value={this.state.fixed_asset}
                                            onChangeText={(fixed_asset) => this.setState({fixed_asset})}
                                        />
                                        <Input
                                            name="name"
                                            label="Nombre"
                                            placeholder="Nombre"
                                            value={this.state.name}
                                            onChangeText={(name) => this.setState({name})}
                                        />
                                        
                                        <View style={styles.buttonCreate}>  
                                            <Button
                                                title="Guardar"
                                                onPress={() => {this.saveMachine(), this.setModalVisible(!this.state.modalVisible)}}
                                            />
                                        </View>

                                        <Button 
                                            title="Cerrar"
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}
                                        />
                                    </View>
                                </View>
                            </Modal>
    
                            <View style={styles.buttonCreate}>  
                                <Button 
                                    title="Crear Máquina"
                                    onPress={() => {
                                        this.setModalVisible(true);
                                    }}
                                />
                            </View>
                           
                            <View style={styles.buttonConsult}>
                                <Button
                                    title="Consultar Máquina"
                                    onPress={this.scanAgain}
                                />
                            </View>
                            <View style={styles.buttonScanNew}>
                                <Button
                                    title="Escanear de nuevo"
                                    onPress={this.scanAgain}
                                />
                            </View>
                           
                        </Fragment>
                    }


                    {scan &&
                    <>
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                        />
                        <Button
                            style={styles.buttonCancel}
                            onPress={() => this.setState({ scan: false })}
                            title="Cancelar"
                        />
                    </>
                    }
                </Fragment>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    cardView: {
        margin: 30
    },
    descText: {
        marginTop:30,
        fontSize: 25,
        marginBottom:80
    },
    textTitle1:{
        margin:20,
        fontSize:40,
        textAlign: 'center'
    },
    buttonScanNew: {
        marginLeft: 20,
        marginRight:20,
        marginBottom:20
    },
    buttonCreate: {
        marginLeft: 20,
        marginRight:20,
        marginBottom:20
    },
    buttonConsult: {
        marginLeft: 20,
        marginRight:20,
        marginBottom:20
    },
});


export default Scan;