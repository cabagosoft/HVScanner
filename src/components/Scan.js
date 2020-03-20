import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View,
    StyleSheet,
    Button
} from 'react-native';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
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
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Text style={styles.descText}>Escanea el QR para crear ó consultar máquinas</Text>

                            <Button
                                title="Escanear QR"
                                onPress={this.activeQR}
                            />

                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result !</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                
                            
                            </View>
                            <Button
                                title="Escanear de nuevo"
                                onPress={this.scanAgain}
                            />
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
     backgroundColor: 'black',
     flex: 1,
     borderRadius: 5,
     padding: 10,
     marginRight: 10,
     marginTop: 17
   },
   buttonCancel: {
       flex: 1,
       marginTop:10,
       width: '90'
   }
});


export default Scan;