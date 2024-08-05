import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo4 from "../../assets/images/verifyDisplay.svg";
import Back from "../../assets/images/arrow.svg";
import { useNavigation } from "@react-navigation/native";


const verifyOTP = async (otp, navigation, [loading, setLoading], [error, setError]) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/auth";

  try {
    const date = await AsyncStorage.getItem("date");
    const code = await AsyncStorage.getItem("code");
    const token = await AsyncStorage.getItem('token');
    const phone = await AsyncStorage.getItem('phone');
    console.log(phone, token, otp, date, code);
    const requestData = {


      token: token,
      phone: phone,
      code: code,
      date: date,
      otp: otp,
      type: "verfiy_otp",
    };
    console.log(JSON.stringify(requestData))

    axios.post(apiUrl, requestData)
      .then(async (res) => {
        console.log(JSON.stringify(res))

        if (res.data.status === "true") {
          await AsyncStorage.setItem("new_token", res.data.new_token);
          await AsyncStorage.setItem("otp", otp);
          await AsyncStorage.setItem("phone", phone);

          console.log(otp);
          console.log(phone);

          navigation.navigate("loader"); // Assuming "LoaderPage" is the next screen
          //          console.log(JSON.stringify(res))
        } else {
          console.log("Wrong OTP received");
          setError("You entered the wrong code. Please try again.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      });
  } catch (error) {
    console.log("Error verifying OTP:", error.message);
    setError("Something went wrong. Please try again later.");
    setLoading(false);
  }
};


const requestOTP = async (phone, [loading, setLoading]) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/auth";

  try {
    const requestData = {
      ch: "send_otp",
      mob: phone,
    };
    if (phone.length < 10) throw new Error("Mobile number is too short");

    axios
      .post(apiUrl, requestData)
      .then((res) => {
        if (res.data.Status === "Success") setLoading(false);
        else {
          console.log("Error:" + res.data.Status);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } catch (error) {
    console.log("Error requesting OTP:", error.message);
    setLoading(false);
  }
};

export default function Verify({ navigation, route }) {
  const [value, setValue] = useState("91");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedToken = await AsyncStorage.getItem('token');
      const storedDate = await AsyncStorage.getItem('date');
      const storedCode = await AsyncStorage.getItem('code');

      setPhone(storedPhone);
      setToken(storedToken);
      setDate(storedDate);
      setCode(storedCode);
    };

    fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(false);
      setOtp("");
    });

    return unsubscribe;
  }, [navigation]);

  const handleVerifyOTP = () => {
    setLoading(true);
    setShowErrorMessage(null);
    verifyOTP(
      otp,
      navigation,
      [loading, setLoading],
      [showErrorMessage, setShowErrorMessage]
    );
  };

  const handleResendOTP = () => {
    setLoading(true);
    setShowErrorMessage(null);
    requestOTP(phone, [loading, setLoading]);
  };

  return (
    <SafeAreaView>
      <TopBar />
      <ScrollView>
        <View style={styles.box}>
          <TouchableOpacity
            style={{ position: "absolute", left: wp(8) }}
            onPress={() => {
              navigation.navigate("LoginPage");
            }}
          >
            <Back width={wp(8.5)} height={wp(8.5)} />
          </TouchableOpacity>
          <Logo4 width={wp(46)} height={wp(37)} style={{ marginTop: hp(2) }} />
        </View>

        <View style={{ marginTop: hp(4), alignItems: "center" }}>
          <Text style={styles.enterphone}>Verification Code</Text>

          <Text style={styles.getinstant}>
            We have sent the code verification to your Phone Number
          </Text>

          <Text style={styles.mob}>+{phone}</Text>

          <TextInput
            style={styles.input}
            onChangeText={setOtp}
            value={otp}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />

          {showErrorMessage && (
            <Text style={styles.wrong}>{showErrorMessage}</Text>
          )}

          <ActivityIndicator animating={loading} size="large" />
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOTP}
          >
            <Text style={styles.textStyle}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.resend}>
            <Text style={styles.check}>Haven’t received an OTP? </Text>
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.check1}>RESEND OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  wrong: {
    marginTop: hp(2),
    color: "#D1421D",
    fontSize: wp(3),
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  enterphone: {
    // Enter your Phone Number
    color: "#043953",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  getinstant: {
    width: wp(84),
    // hp(6)
    color: "#455A64",
    fontSize: wp(4),
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: wp(6),
    marginTop: hp(2),
  },

  mob: {
    color: "#043953",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "700",
    marginTop: hp(2),
  },

  box: {
    // overflow: 'hidden',
    alignItems: "center",
    marginTop: hp(13),
    // backgroundColor: 'red'
  },
  input: {
    height: hp(7),
    width: wp(70),
    borderWidth: 1,
    padding: 10,
    marginTop: hp(3),
  },

  button: {
    height: hp(7.3),
    width: wp(82),
    marginTop: hp(4),
    backgroundColor: "#32959D",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textStyle: {
    textAlign: "center",
    color: "white",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "500",
  },

  resend: {
    marginTop: hp(3),
    marginBottom: hp(10),
  },

  check: {
    color: "#455A64",
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  check1: {
    color: "#043953",
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
