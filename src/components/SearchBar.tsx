import React, { useState } from 'react';
import { Image,Text, TextInput, TouchableOpacity, View } from 'react-native';
import { size } from '../styles/rootStyle';
import { searchBarStyle } from '../styles/searchBarStyle';

const SearchBar: React.FC = ()=>{
    const [search, setSearch] = useState('')
    return <View style={searchBarStyle.container}>
        <View style={searchBarStyle.searchContainer}>

        <TouchableOpacity>
            <Text style={searchBarStyle.searchIcon}>🔍</Text></TouchableOpacity>
            <TextInput
            placeholder='search...'
            placeholderTextColor="white"
            value={search}
            onChangeText={(t)=>setSearch(t)} 
            style={searchBarStyle.input}/>
            <TouchableOpacity onPress={()=>setSearch('')} style={searchBarStyle.clear}><Text style={{ fontSize:2.5*size}}>✖</Text></TouchableOpacity>
        </View>
    </View>
}

export default SearchBar