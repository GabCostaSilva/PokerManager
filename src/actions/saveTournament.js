import * as FileSystem from "expo-file-system";

export default async (data, fileName) => {
    await FileSystem.writeAsStringAsync(`file://${fileName}`, JSON.stringify(data));
}