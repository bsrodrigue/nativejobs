import React from 'react'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'

import styles from './welcome.style'
import { icons, SIZES } from "../../../constants";


const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setactiveJobType] = useState("Full-time")


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Rodrigue</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?' />
        </View>


        <TouchableOpacity
          style={styles.searchBtn}
          onPress={handleClick}>
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          keyExtractor={item => item}
          contentContainerStyle={{
            columnGap: SIZES.small
          }}
          horizontal
          data={jobTypes} renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setactiveJobType(item);
                router.push(`/search/${item}`);
              }}
              style={styles.tab(activeJobType, item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )} />
      </View>

    </View>
  )
}

export default Welcome