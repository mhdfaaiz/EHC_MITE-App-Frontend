import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#181818',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
        opacity : 0.8,
        marginBottom: 20
    },
    loadingtext: {
        color: 'white'
    },
    subTextdown: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginBottom: 30
    },
    SignalDisplay:{
        
    },
    first: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settings: {
        marginBottom: 20
    },
    intro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 70
    },
    serialbox: {
        width: 200,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#888',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
    },
    serialno: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: '#16b800',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    statusText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    statusContainer: {
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 15,
        width: '100%',
        padding: 10,
    },
    editbutton: {
        backgroundColor: '#7da9ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    reverseButton: {
        backgroundColor: '#7da9ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    clearbutton: {
        position: 'absolute',
        right: 0
    },
    cleartext: {
        backgroundColor: '#222',
        width: 70,
        height: 35,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    indicatorContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorRow: {
        flexDirection: 'row',
    },
    indicatornameRow: {
        flexDirection: 'row',
        marginBottom: 20
    },
    indicatorWrapper: {
        marginHorizontal: '3%',
        alignItems: 'center', 
        width: 70, 
    },
    label: {
        marginTop: 5,
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        width: '100%', 
        textAlign: 'center',
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 14,
        width: 50,
        color: '#000',
    },
    switchbuttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%'
    },
    logs: {
        backgroundColor: 'gray',
        width: 80,
        height: 40,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        fontWeight: 'bold'
    },
    box: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#353535',
        borderRadius: 10,

    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#282828',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        width: '98%'
    },
    tablebox: {
        width: '98%',
        backgroundColor: '#282828',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5
    },
    body: {
        marginTop: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 5,
        color: 'ffff'

    },
    heading: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },
    statusHead: {
        flex: 2,
    },
    dateHead: {
        flex: 5,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: 'white',
    },
    si: {
        width: '15%',
        textAlign: 'left',
        color: 'white',
    },
    dt: {
        width: '15%',
        textAlign: 'left',
        marginRight : '10%',
        color: 'white',
    },
    al: {
        width: '25%',
        textAlign: 'left',
        color: 'white',
    },
    st: {
        width: '30%',
        textAlign: 'left',
        color: 'white',
        marginRight : '10%'
    },
    cell: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        marginRight: 10
    },
    celll: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
    },
    col1: {
        width: '15%'
    },
    col2: {
        width: '30%'
    },
    col3: {
        width: '20%'
    },
    col4: {
        marginLeft : '5%',
        width: '30%'
    },
    dateCell: {
        flex: 3,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: 'white',
        marginLeft : 10
    },
    dataCell: {
        flex: 2,
    },
    statusCell: {
        flex: 1,
    },
    outerBezel: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#666',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    reflection: {
        position: 'absolute',
        top: 4,
        left: 5,
        width: 42,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    outerRing: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
    },
    innerGlow: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.5,
    },
    indicator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        elevation: 3,
    },
});

export default styles;