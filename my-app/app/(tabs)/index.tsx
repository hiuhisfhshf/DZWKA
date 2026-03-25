import {Image} from 'expo-image';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {useState} from "react";
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "@/store/apis/categoryApi";
import {IMAGES_URL} from "@/constants/urls";

export default function HomeScreen() {
    const {data, isLoading} = useGetCategoriesQuery()
    const [deleteCategory, {isLoading: isDeleting}] = useDeleteCategoryMutation();

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const deleteHandler = async (id: string) => {
        try {
            await deleteCategory(id).unwrap();
        }
        catch (e) {
            console.log("error", e);
        }
    }

    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
        setSelectedCategoryId(null);
        setSelectedCategoryName('');
    };

    const openDeleteModal = (id: string, name: string) => {
        setSelectedCategoryId(id);
        setSelectedCategoryName(name);
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (!selectedCategoryId) return;

        try {
            await deleteHandler(selectedCategoryId);
        } finally {
            closeDeleteModal();
        }
    };



    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>



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
                                <TouchableOpacity className="py-3 rounded-full bg-red-600"
                                    onPress={() => openDeleteModal(category.id, category.name)}
                                >
                                    <Text className={"text-white text-center"}>Видалити</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                )}
            </ThemedView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={closeDeleteModal}
            >
                <View className="flex-1 bg-black/60 justify-center px-6">
                    <TouchableWithoutFeedback onPress={closeDeleteModal}>
                        <View className="absolute inset-0" />
                    </TouchableWithoutFeedback>

                    <View className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-2xl">
                        <ThemedText
                            className="text-xl font-bold mb-3"
                            style={{ color: 'inherit' }}
                        >
                            Видалити категорію
                        </ThemedText>
                        <ThemedText
                            className="text-gray-600 dark:text-gray-300 text-base"
                            style={{ color: 'inherit' }}
                        >
                            Ви впевнені, що бажаєте видалити &quot;{selectedCategoryName}&quot;?
                        </ThemedText>

                        <View className="flex-row mt-5 gap-3">
                            <TouchableOpacity
                                className="flex-1 py-3 rounded-full bg-gray-200 dark:bg-neutral-800"
                                onPress={closeDeleteModal}
                                disabled={isDeleting}
                            >
                                <Text className="text-center text-gray-900 dark:text-white font-semibold">
                                    Скасувати
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 py-3 rounded-full bg-red-600"
                                onPress={confirmDelete}
                                disabled={!selectedCategoryId || isDeleting}
                            >
                                {isDeleting ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-white text-center font-semibold">
                                        Видалити
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
