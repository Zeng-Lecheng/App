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
            flexBasis: 100
        },

        entryContent: {
            fontSize: 20,
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

const colors = {
    buttonColorGreen: "#82E0AA",
    buttonColorBlue: "#85C1E9",
    buttonColorDanger: "red"
}

export default styles
export { colors }
