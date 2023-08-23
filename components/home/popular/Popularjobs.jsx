import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import styles from './popularjobs.style';

import { COLORS, SIZES } from "../../../constants";

import useFetch from '../../../hooks/useFetch';
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = () => {
  const router = useRouter();

  const { data, loading, error, refetch } = useFetch(
    'search', {
    query: 'React developer',
    num_pages: 1
  }
  );

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.cardsContainer}>
        {
          loading ? (<ActivityIndicator size="large" color={COLORS.primary} />) :
            error ? <Text>Something went wrong</Text> :
              (
                <FlatList data={data}
                  keyExtractor={item => item?.job_id}
                  contentContainerStyle={{
                    columnGap: SIZES.medium
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <PopularJobCard
                      item={item}
                      handleCardPress={handleCardPress}
                      selectedJob={selectedJob}
                    />
                  )}
                />
              )
        }
      </View>
    </View>
  )
}

export default Popularjobs