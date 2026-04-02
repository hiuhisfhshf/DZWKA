import {View} from "react-native";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginFormData, userLoginSchema} from "@/schemas/userLoginSchema";
import {Controller, useForm} from "react-hook-form";
import FormLayout from "@/components/layouts/FormLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import {useRouter} from "expo-router";
import {useLoginMutation, useRegisterMutation} from "@/store/apis/authApi";
import {UserRegisterFormData, userRegisterSchema} from "@/schemas/userRegisterSchema";
import AvatarPicker from "@/components/form/AvatarPicker";
import {ThemedText} from "@/components/themed-text";


const RegisterScreen = () => {
    const router = useRouter();

    const [register] = useRegisterMutation();

    const {control, handleSubmit, setValue, formState: {errors}} = useForm<UserRegisterFormData>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            imageFile: ""
        }
    })
    const handleRegister = async (values: UserRegisterFormData) => {
        const response = await register(values);
        console.log(response)
        router.push("/");
    }
    return (
        <FormLayout title="Register">
            <Controller
                control={control}
                name="imageFile"
                render={({field}) => (
                    <AvatarPicker
                        image={field.value?.uri || null}
                        onChange={(fileObject) => setValue('imageFile', fileObject)}
                    />
                )}
            />
            <ThemedText style={{color: "red", textAlign: "center"}}>{errors.imageFile?.message as string}</ThemedText>

            <Controller
                control={control}
                name="email"
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label="Почта"
                        placeholder="Введіть почту"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.email?.message}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}/>

            <Controller
                control={control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label="Пароль"
                        placeholder="Введіть пароль"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.password?.message}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}/>

            <Controller
                control={control}
                name="firstName"
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label="Ім'я"
                        placeholder="Введіть своє ім'я"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.firstName?.message}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}/>

            <Controller
                control={control}
                name="lastName"
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label="Прізвище"
                        placeholder="Введіть прізвище"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.lastName?.message}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}/>



            <View className={"items-center w-full mt-4"}>
                <PrimaryButton onPress={handleSubmit(handleRegister)} title={"Зареєструватися"}></PrimaryButton>
                <PrimaryButton
                    title="Скасувати"
                    variant="secondary"
                    onPress={() => router.push('/')}
                />
            </View>

        </FormLayout>
    );
}

export default RegisterScreen;