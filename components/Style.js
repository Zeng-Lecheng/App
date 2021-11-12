import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        view: {
            alignItems: "flex-start",
            padding: 5,
            alignSelf: "center"
        },

        entryName: {
            fontSize: 20,
            // width: "50%"
            flexBasis: 100
        },

        entryContent: {
            fontSize: 16,
            // width: "50%"
            textAlignVertical: "center",
            justifyContent: "flex-end",
            flexBasis: 100,
        },

        input: {
            borderColor: "#C0C0C0",
            borderBottomWidth: 2,
            height: 32,
            fontSize: 20,
            width: "50%"
        }
    }
)

export default styles
