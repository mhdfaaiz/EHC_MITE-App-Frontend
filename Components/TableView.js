import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';

const TableView = ({ currentView, tableData, logData, renderRow, renderItem }) => {
    const flatListRef = useRef(null);

    return (
        <View style={[styles.box, { height: currentView === 'logs' ? '40%' : '43%', marginTop: currentView === 'logs' ? 30 : 10 }]}>
            {currentView === 'live' ? (
                <>
                    <View style={styles.header}>
                        <Text style={[styles.heading, styles.dateHead]}>DATE / TIME</Text>
                        <Text style={[styles.heading, styles.dataCell]}>INPUT</Text>
                        <Text style={[styles.heading, styles.statusHead]}>STATUS</Text>
                    </View>
                    <FlatList
                        ref={flatListRef}
                        style={styles.tablebox}
                        data={tableData}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.body}
                        ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No data to display</Text>}
                        initialNumToRender={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                    />
                </>
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={[styles.heading, styles.si]}>NO</Text>
                        <Text style={[styles.heading, styles.dt]}>DATE&TIME</Text>
                        <Text style={[styles.heading, styles.al]}>ALARM</Text>
                        <Text style={[styles.heading, styles.st]}>STATUS</Text>
                    </View>
                    <FlatList
                        ref={flatListRef}
                        style={styles.tablebox}
                        data={logData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.body}
                        ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No data to display</Text>}
                        initialNumToRender={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                    />
                </>
            )}
        </View>
    );
};

export default TableView;