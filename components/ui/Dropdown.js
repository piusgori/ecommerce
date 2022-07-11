import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { styling } from '../../constants/styles';

const Dropdown = ({ label, data, onSelect, isValid, error }) => {
    const DropdownButton = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState();
    const [dropdownTop, setDropdownTop] = useState(0);

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h)
        });
        setIsVisible(true);
    }

    const toggleDropdown = () => {
        isVisible ? setIsVisible(false) : openDropdown(); 
    }

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item.label);
        setIsVisible(false);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    const renderDropdown = () => {
        return (
            <Modal visible={isVisible} transparent animationType='slide'>
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        ></FlatList>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

  return (
    <>
        <TouchableOpacity ref={DropdownButton} style={[styles.button, !isValid && styles.errorButton]} onPress={toggleDropdown}>
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(!!selected && selected.label) || label}
            </Text>
            <Ionicons name='chevron-down' size={15} color='black' style={styles.icon}></Ionicons>
        </TouchableOpacity>
        {!isValid && <Text style={styles.errorText}>{error}</Text>}
    </>
  )
}

export default Dropdown;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        zIndex: 1,
        marginVertical: 12,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    errorButton: {
        borderWidth: 2,
        borderColor: styling.color.error100
    },
    errorText: {
        color: styling.color.error100
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
})