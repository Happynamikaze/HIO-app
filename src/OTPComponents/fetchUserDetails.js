import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserDetails = async (setUserDetails, setLoading, setError, setShowAccountDetails) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

  try {
    const token = await AsyncStorage.getItem("token");
    const phone = await AsyncStorage.getItem("phone");
    const code = await AsyncStorage.getItem("code");
    const otp = await AsyncStorage.getItem("otp");
    const date = await AsyncStorage.getItem("date");

    const requestData = {
      token: token,
      phone: phone,
      code: code,
      otp: otp,
      date: date,
      insert_details: "false"
    };

    setLoading(true);

    const res = await axios.post(apiUrl, requestData);
    setLoading(false);

    if (res.data.success === 10 && res.data.get_details === "true") {
      setUserDetails(res.data);
      setShowAccountDetails(true);
    } else {
      setError("Failed to fetch user details. Please try again.");
    }
  } catch (error) {
    console.log("Error fetching user details:", error.message);
    setLoading(false);
    setError("Something went wrong. Please try again later.");
  }
};

const submitUserDetails = async (userDetails, setLoading, setError) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

  try {
    const token = await AsyncStorage.getItem("token");
    const phone = await AsyncStorage.getItem("phone");
    const code = await AsyncStorage.getItem("code");
    const otp = await AsyncStorage.getItem("otp");
    const date = await AsyncStorage.getItem("date");

    const requestData = {
      token: token,
      phone: phone,
      code: code,
      otp: otp,
      date: date,
      insert_details: "true",
      usr_fullname: userDetails.user_name,
      user_email: userDetails.user_email
    };

    setLoading(true);

    const res = await axios.post(apiUrl, requestData);
    setLoading(false);

    if (res.data.success === 1) {
      setError("User details updated successfully.");
    } else {
      setError("Failed to update user details. Please try again.");
    }
  } catch (error) {
    console.log("Error submitting user details:", error.message);
    setLoading(false);
    setError("Something went wrong. Please try again later.");
  }
};

export { fetchUserDetails, submitUserDetails };
