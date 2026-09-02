import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { InboxIcon } from "../ui/icons";
import { useTheme, radii } from "../theme";
import { useUnread } from "./useUnread";

/** Başlıktaki gelen kutusu zili — okunmamış varsa rozet. */
export function InboxBell() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const unread = useUnread();
  return (
    <PressableScale hitSlop={4} onPress={() => nav.navigate("Inbox")} accessibilityLabel={unread ? `Gelen kutusu, ${unread} okunmamış` : "Gelen kutusu"} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
      <InboxIcon color={colors.text} size={20} />
      {unread > 0 ? (
        <View style={{ position: "absolute", top: -3, right: -3, minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 4, backgroundColor: colors.streak, alignItems: "center", justifyContent: "center" }}>
          <Text variant="micro" color="#fff" style={{ fontWeight: "800", fontSize: 10, lineHeight: 12 }}>{unread > 9 ? "9+" : unread}</Text>
        </View>
      ) : null}
    </PressableScale>
  );
}
