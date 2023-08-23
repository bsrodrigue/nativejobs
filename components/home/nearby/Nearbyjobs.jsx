import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './nearbyjobs.style';

import { COLORS } from "../../../constants";

import useFetch from '../../../hooks/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { router } from 'expo-router';

const NearbyJobs = () => {

  const { data, loading, error, refetch } = useFetch(
    'search', {
    query: 'React developer',
    num_pages: 1
  }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
                data?.map((job) => (
                  <NearbyJobCard
                    job={job}
                    key={`nearby-job-${job?.job_id}`}
                    handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                  />
                ))
              )
        }
      </View>
    </View>
  )
}

export default NearbyJobs;