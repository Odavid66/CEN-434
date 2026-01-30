import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [output, setOutput] = useState("0");

    const handleTap = (value: string) => {
    if (value === "AC") {
        setExpression("");
        setOutput("0");
        return;
    }

    if (value === "=") {
        try {
        const result = eval(expression);
        setOutput(result.toString());
        setExpression(result.toString());
        } catch {
        setOutput("Error");
        }
        return;
    }

    setExpression(prev => prev + value);
    setOutput(prev => (prev === "0" ? value : prev + value));
    };

    const renderButton = (
    label: string,
    style?: any,
    textStyle?: any
    ) => (
    <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => handleTap(label)}
    >
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
    );

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.display}>
        <Text style={styles.displayText}>{output}</Text>
        </View>

        <View style={styles.keypad}>
        <View style={styles.row}>
            {renderButton("AC", styles.funcButton, styles.darkText)}
            {renderButton("±", styles.funcButton, styles.darkText)}
            {renderButton("%", styles.funcButton, styles.darkText)}
            {renderButton("/", styles.opButton)}
        </View>

        <View style={styles.row}>
            {renderButton("7")}
            {renderButton("8")}
            {renderButton("9")}
            {renderButton("*", styles.opButton)}
        </View>

        <View style={styles.row}>
            {renderButton("4")}
            {renderButton("5")}
            {renderButton("6")}
            {renderButton("-", styles.opButton)}
        </View>

        <View style={styles.row}>
            {renderButton("1")}
            {renderButton("2")}
            {renderButton("3")}
            {renderButton("+", styles.opButton)}
        </View>

        <View style={styles.row}>
            <TouchableOpacity
            style={[styles.button, styles.zeroButton]}
            onPress={() => handleTap("0")}
            >
            <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>

            {renderButton(".")}
            {renderButton("=", styles.opButton)}
        </View>
        </View>
    </SafeAreaView>
    );
};

export default Calculator;
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    width: "40%",
    alignSelf: "center",
    padding: 12,
    marginBlock: 20,
    borderRadius: 24,
    },

    display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    margin: 20,
    borderRadius: 12,
    paddingVertical: 20,
    },

    displayText: {
    color: "#000",
    fontSize: 64,
    fontWeight: "300",
    },

    keypad: {
    padding: 10,
    },

    row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    },

    button: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    },

    buttonText: {
    fontSize: 30,
    color: "#fff",
    },

    funcButton: {
    backgroundColor: "#a5a5a5",
    },

    darkText: {
    color: "#000",
    },

    opButton: {
    backgroundColor: "#ff9f0a",
    },

    zeroButton: {
    width: 170,
    alignItems: "flex-start",
    paddingLeft: 30,
    borderRadius: 40,
    },
});
