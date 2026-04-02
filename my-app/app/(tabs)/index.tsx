import {Image} from 'expo-image';
import {Alert, Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {HelloWave} from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Link, router} from 'expo-router';
import {useEffect, useState} from "react";
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "@/store/apis/categoryApi";
import {IMAGES_URL} from "@/constants/urls";

export default function HomeScreen() {
    const {data, isLoading} = useGetCategoriesQuery()
    const [deleteCategory] = useDeleteCategoryMutation();

    const deleteHandler = (id: string) => {
        try {
            deleteCategory(id).unwrap();
        }
        catch (e) {
            console.log("error", e);
        }
    }



    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>

            <Button onPress={() => router.push("/profile")} title={"Profile"}></Button>
            <Button onPress={() => router.push("/login")} title={"Login"}></Button>
            <Button onPress={() => router.push("/register")} title={"Register"}></Button>

            <ThemedView className="px-5 pt-5 flex-row flex-wrap justify-between">
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    data?.map((category: ICategoryResponse) => (

                        <View
                            key={category.id}
                            className="bg-white dark:bg-neutral-900 rounded-2xl shadow w-[48%] mb-4 overflow-hidden"
                        >
                            <Image
                                source={{ uri: IMAGES_URL + `/${category.image}` }}
                                contentFit="cover"
                                style={{ width: '100%', height: 128 }}
                                onError={(e) => console.log('Image error:', e)}
                            />

                            <View className="p-3">
                                <Text className="font-bold text-base dark:text-white">
                                    {category.name}
                                </Text>
                                <Text className="text-gray-500 text-sm mt-1" numberOfLines={3}>
                                    {category.description}
                                </Text>

                                <TouchableOpacity className="py-3 rounded-full bg-blue-600"
                                                  onPress={() => {
                                                      router.push({
                                                          pathname:"/updateCategory",
                                                          params: {id : category.id}
                                                      })
                                                  }}
                                >
                                    <Text className={"text-white text-center"}>Редагувати</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="py-3 rounded-full bg-red-600"
                                                  onPress={() => {
                                                      Alert.alert(
                                                          "Delete Category",
                                                          `Delete "${category.name}"?`,
                                                          [
                                                              { text: "Cancel", style: "cancel" },
                                                              {
                                                                  text: "Delete",
                                                                  style: "destructive",
                                                                  onPress: () => deleteHandler(category.id),
                                                              },
                                                          ]
                                                      );
                                                  }}
                                >
                                    <Text className={"text-white text-center"}>Видалити</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                )}
            </ThemedView>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 28,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
