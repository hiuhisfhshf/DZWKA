import {View} from "react-native";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginFormData, userLoginSchema} from "@/schemas/userLoginSchema";
import {Controller, useForm} from "react-hook-form";
import FormLayout from "@/components/layouts/FormLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import {useRouter} from "expo-router";
import {useLoginMutation} from "@/store/apis/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";


const LoginScreen = () => {
    const router = useRouter();

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const{control, handleSubmit, formState:{errors}} = useForm<UserLoginFormData>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const handleLogin = async (values: UserLoginFormData) => {
        const response = await login(values).unwrap();
        await AsyncStorage.setItem("token", response.accessToken);
        dispatch(setToken(response.accessToken));
        console.log(response);
        router.push("/");
    };
    return (
        <FormLayout title="Login">
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

            <View className={"items-center w-full mt-4"}>
                <PrimaryButton onPress={handleSubmit(handleLogin)} title={"Увійти"}></PrimaryButton>
                <PrimaryButton
                    title="Скасувати"
                    variant="secondary"
                    onPress={() => router.push('/')}
                />
            </View>

        </FormLayout>
    );
}

export default LoginScreen;