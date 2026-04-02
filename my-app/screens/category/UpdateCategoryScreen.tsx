import FormLayout from "@/components/layouts/FormLayout";
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from "@/components/form/inputs/CustomInput";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Text, TextInput, View} from "react-native";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import AvatarPicker from "@/components/form/AvatarPicker";
import {serialize} from "object-to-formdata";
import {
    useCreateCategoryMutation,
    useGetByIdQuery,
    useGetCategoriesQuery,
    useUpdateCategoryMutation
} from "@/store/apis/categoryApi";
import {ThemedText} from "@/components/themed-text";
import {ICreateCategory} from "@/types/ICreateCategory";
import {UpdateCategorySchema, updateCategorySchema} from "@/schemas/updateCategorySchema";
import {IUpdateCategory} from "@/types/IUpdateCategory";
import {useEffect} from "react";
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {IMAGES_URL} from "@/constants/urls";


const UpdateCategoryScreen = () => {
    const router = useRouter();
    const [updateCategory] = useUpdateCategoryMutation();
    const {id} = useLocalSearchParams();
    const {data} = useGetByIdQuery(id as string);


    const {control, handleSubmit, reset, setValue, formState: {errors}} = useForm<UpdateCategorySchema>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            id: "",
            name: '',
            description: '',
            image: undefined
        }
    });

    const onSubmit = async (data: UpdateCategorySchema) => {
        const sendData: IUpdateCategory = {
            ...data
        };

        const response = await updateCategory(sendData);
        console.log("response", response);
        reset();
        router.push("/");
    }


    useEffect(() => {
        if(data){
        reset({
            id: id as string,
            name: data.data.name,
            description: data.data.description,
            image:{uri:`${IMAGES_URL }/${data.data.image} `},
        });

        }

    }, [data]);


    return (
        <>
            <FormLayout title="Welcome">
                <Controller
                    control={control}
                    name="image"
                    render={({field}) => (
                        <AvatarPicker
                            image={field.value?.uri || null}
                            onChange={(fileObject) => setValue('image', fileObject)}
                        />
                    )}
                />
                <ThemedText style={{color: "red", textAlign: "center"}}>{errors.image?.message as string}</ThemedText>
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Назва"
                            placeholder="Назва категорії"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.name?.message}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}/>

                <Controller
                    control={control}
                    name="description"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Опис"
                            placeholder="Опис категорії"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.description?.message}
                        />
                    )}
                />

                <View className={"items-center w-full mt-4"}>
                    <PrimaryButton  onPress={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))} title={"Оновити"}></PrimaryButton>
                    <PrimaryButton
                        title="Скасувати"
                        variant="secondary"
                        onPress={() => router.push('/')}
                    />
                </View>

            </FormLayout>
        </>)
}


export default UpdateCategoryScreen;
