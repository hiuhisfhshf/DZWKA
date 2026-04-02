import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormLayout from "@/components/layouts/FormLayout";
import { ThemedText } from "@/components/themed-text";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import {useGetUserProfileQuery} from "@/store/apis/authApi";

import {useAppSelector} from "@/store/hooks";


const UserProfileScreen = () => {
    const router = useRouter();

    const token = useAppSelector((state) => state.auth.token);
    console.log("TOKEN IN REDUX:", token);
    const { data: user, error} = useGetUserProfileQuery(undefined, {
        skip: !token,
        refetchOnMountOrArgChange: true,
    });

    console.log(user)
    console.log(error)

    return (
        <FormLayout title="Профіль">
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarRing}>
                    {user?.image ? (
                        <Image source={{ uri: user.image }} style={styles.avatarImage} />
                    ) : (
                        <View style={styles.avatarFallback}>
                            <ThemedText style={styles.initials}>{user?.fullName}</ThemedText>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.card}>
                <Row icon="person-outline" label="Ім'я" value={user?.fullName} />
                <Divider />
                <Row icon="mail-outline" label="Email" value={user?.email} />
                <Divider />

            </View>

            <View style={styles.buttons}>
                <PrimaryButton
                    title="Вийти"
                    variant="secondary"
                    onPress={() => console.log("logout")}
                />
            </View>
        </FormLayout>
    );
};



const Row = ({
                 icon,
                 label,
                 value,
             }: {
    icon: string;
    label: string;
    value?: string;
}) => (
    <View style={styles.row}>
        <Ionicons name={icon as any} size={18} color="#6B7280" style={{ marginRight: 14 }} />
        <View>
            <ThemedText style={styles.rowLabel}>{label}</ThemedText>
            <ThemedText style={styles.rowValue}>{value ?? "—"}</ThemedText>
        </View>
    </View>
);

const Divider = () => <View style={styles.divider} />;


const styles = StyleSheet.create({
    avatarWrapper: {
        alignItems: "center",
        marginBottom: 28,
    },
    avatarRing: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: "#4F46E5",
        overflow: "hidden",
        backgroundColor: "#EEF2FF",
    },
    avatarImage: { width: "100%", height: "100%" },
    avatarFallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    initials: {
        fontSize: 32,
        fontWeight: "700",
        color: "#4F46E5",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },
    rowLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        fontWeight: "500",
        marginBottom: 2,
    },
    rowValue: {
        fontSize: 15,
        color: "#111827",
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
    },
    buttons: {
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
});

export default UserProfileScreen;