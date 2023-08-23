import React, { Fragment } from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'

import { COLORS, icons, SIZES } from "../../constants"

import useFetch from '../../hooks/useFetch'

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const { data, loading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    }, []);


    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    info={data[0].job_description ?? "No data provided"}
                />
            case "Responsibilities":
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />

            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite
                    },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: "",
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension={"60%"} handlePress={() => router.back()} />,
                    headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} handlePress={() => { }} />,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) :
                        error ? (
                            <Text>Oopsie</Text>
                        ) :
                            data.length === 0 ? (
                                <Text>No data</Text>
                            ) :
                                (
                                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                        <Company
                                            companyLogo={data[0].employer_logo}
                                            jobTitle={data[0].job_title}
                                            companyName={data[0].employer_name}
                                            location={data[0].country}
                                        />
                                        <JobTabs
                                            tabs={tabs}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                        />
                                        {displayTabContent()}
                                    </View>
                                )
                }
            </ScrollView>


            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
        </SafeAreaView>
    )
}

export default JobDetails