// import { View, Text , SafeAreaView} from 'react-native'
// import React from 'react'
// import TopBarMain from '../components/TopBarMain'

// export default function ProfileScreen() {
//   return (
//     <SafeAreaView>
//     <TopBarMain/>


//     <Text className ="mt-[150px]">
//         Profile
//     </Text>

//   </SafeAreaView>
//   )
// }


import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import TopBarMain from '../components/TopBarMain'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo4 from '../../assets/images/profilePageBanner.svg';
import TasksIcon from '../../assets/images/TasksIcon.svg';
import ProfileGirl from '../../assets/images/ProfileGirl.svg'
import NewIcon from '../../assets/images/NewIcon.svg';
import Bookpic from '../../assets/images/bookpic.svg'
import FeelBanner from '../../assets/images/FeelBanner.svg';
import Emoji1 from '../../assets/images/emoji1.svg';
import Emoji2 from '../../assets/images/emoji2.svg';
import Emoji3 from '../../assets/images/emoji3.svg';
import Pen from '../../assets/images/pen.svg'
import Emoji4 from '../../assets/images/emoji4.svg';
import Emoji5 from '../../assets/images/emoji5.svg';
import Gift from '../../assets/images/Gift.svg';
import BottomQuote from '../../assets/images/BottomQuote.svg';


// const fetchUserDetails = async (setUserDetails, setLoading, setError) => {
//   const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

//   try {
//     const token = await AsyncStorage.getItem("token");
//     const phone = await AsyncStorage.getItem("phone");
//     const code = await AsyncStorage.getItem("code");
//     const otp = await AsyncStorage.getItem("otp");
//     const date = await AsyncStorage.getItem("date");
//     console.log(phone, token, code, date, otp);

//     if (!token || !phone || !code || !otp || !date) {
//       setError("Missing necessary information. Please check AsyncStorage values.");
//       return;
//     }

//     const requestData = {
//       token,
//       phone,
//       code,
//       otp,
//       date,
//       insert_details: "false"
//     };


//     setLoading(true);

//     const res = await axios.post(apiUrl, requestData);
//     setLoading(false);

//     console.log("API response:", res.data);


//     if (res.data.success === 10 && res.data.get_details === "true") {
//       setUserDetails(res.data);
//     } else {
//       setError("Failed to fetch user details. Please try again.");
//     }

//   } catch (error) {
//     console.log("Error fetching user details:", error.message);
//     setLoading(false);
//     setError("Something went wrong. Please try again later.");
//   }
// };

// export default function ProfileScreen() {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [userDetails, setUserDetails] = useState(null);
//   const [code, setCode] = useState('');
//   const [phone, setPhone] = useState('');


//   useEffect(() => {
//     const fetchDetails = async () => {
//       const storedCode = await AsyncStorage.getItem("code");
//       setCode(storedCode || '');
//       // console.log(storedCode);

//       const storedPhone = await AsyncStorage.getItem("phone");
//       setPhone(storedPhone || '');
//       // console.log(storedPhone)



//       await fetchUserDetails(setUserDetails, setLoading, setError, setCode, setPhone);
//     };

//     console.log(userDetails);

//     fetchDetails();


//   }, []);
const fetchUserDetails = async (setUserDetails, setLoading, setError) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

  try {
    const token = await AsyncStorage.getItem("token");
    const phone = await AsyncStorage.getItem("phone");
    const code = await AsyncStorage.getItem("code");
    const otp = await AsyncStorage.getItem("otp");
    const date = await AsyncStorage.getItem("date");
    console.log(phone, token, code, date, otp);

    if (!token || !phone || !code || !otp || !date) {
      setError("Missing necessary information. Please check AsyncStorage values.");
      return;
    }

    const requestData = {
      token,
      phone,
      code,
      otp,
      date,
      insert_details: "false"
    };

    setLoading(true);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const res = await response.json();
    setLoading(false);

    console.log("API response:", res);
    return res;

    if (res.success === 10 && res.get_details === "true") {
      setUserDetails(res);
    } else {
      setError("Failed to fetch user details. Please try again.");
    }

  } catch (error) {
    console.log("Error fetching user details:", error.message);
    setLoading(false);
    setError("Something went wrong. Please try again later.");
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      const storedCode = await AsyncStorage.getItem("code");
      setCode(storedCode || '');
      console.log("Stored code:", storedCode);

      const storedPhone = await AsyncStorage.getItem("phone");
      setPhone(storedPhone || '');
      console.log("Stored phone:", storedPhone);

      const data = await fetchUserDetails(setUserDetails, setLoading, setError);
      setUserDetails(data);
      console.log("User details updated:", userDetails);
      console.log(data);

    };

    fetchDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      console.log("User details updated:", userDetails);
    }
  }, [userDetails]);



  return (

    <SafeAreaView>
      <TopBarMain />
      <ScrollView style={{ backgroundColor: '#fff', height: hp(100) }}>
        {/* Banner */}
        <View style={{ marginTop: hp(9.5) }}>
          <Logo4 width={wp(100)} height={wp(60)} />
          <View style={styles.banner}>
            <View className="flex-row justify-between items-center">
              <View style={styles.bannerheading}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                    <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '700' }}>
                      {userDetails ? userDetails.user_name : 'USER NAME'}
                    </Text>
                    <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '400', marginTop: wp(2) }}>
                      {userDetails ? `+${code}-${phone}` : `+${code}-${phone}`}
                    </Text>
                    <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '400', marginTop: wp(2) }}>
                      {userDetails ? userDetails.user_email : 'hello@heartitout.in'}
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.BookBtn} onPress={() => navigation.navigate('EditProfileScreen')}>
                      <View className='flex-row gap-3 items-center'>
                        <View>
                          <Text style={styles.btnText}>Edit</Text>
                        </View>
                        <View>
                          <Pen />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View>
                <ProfileGirl />
              </View>
            </View>
          </View>
        </View>
        

        {/* Package */}
        <View className="flex-col items-center" style={[styles.cardContiner, { height: hp(15.8), marginTop: hp(3) }]}>
          <View style={[styles.packageCard, {}]}>
            <Bookpic />
            <View className="flex-col justify-between items-start" style={{ height: hp(12) }}>
              <View style={{ width: wp(50) }}>
                <Text style={styles.cardText}>
                  Treat yourself with a little self-care while you await your next therapy session.💛
                </Text>
              </View>
              <View>
                <TouchableOpacity activeOpacity={0.5} style={styles.Btn}>
                  <Text style={styles.btnText2}>
                    Try doodling!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row items-center" style={[styles.cardContiner, { height: hp(20), marginTop: hp(5), backgroundColor: '#EBEFF2CC' }]}>
          <BottomQuote width={wp(71)} height={hp(15)} />
        </View>

        <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  bannerheading: {
    // backgroundColor: 'black',
    width: wp(60),
    // position: 'absolute',
    left: wp(8),
    right: wp(1),
    top: hp(2.6),
    zIndex: 2,
  },
  banner: {
    // backgroundColor: 'black',
    width: wp(100),
    // height: hp(40),
    position: 'absolute',
    // left: wp(8),
    // right: wp(1),
    top: hp(2.6),
    zIndex: 2,
  },

  BookBtn: {
    marginTop: hp(3),
    width: wp(40),
    height: hp(6),
    backgroundColor: 'white',
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnText: {
    textAlign: 'center',
    color: '#01818C',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '500',
  },

  // Cards
  cardContiner: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    marginTop: hp(4),
    // backgroundColor: 'red'
  },

  card: {
    width: wp(24), height: '100%', borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    display: 'flex',
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardText: {
    textAlign: 'left', color: '#455A64', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '400'
  },

  test: {
    width: wp(40),
    height: hp(40),
    backgroundColor: 'red'
  },

  // Feel Banner

  feelBanner: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },

  // Package

  packageCard: {
    width: wp(84), height: '100%', borderRadius: wp(4), backgroundColor: '#FEF8C8',
    paddingHorizontal: wp(4),
    paddingLeft: wp(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  Btn: {
    // marginTop: hp(2),
    width: wp(38),
    height: hp(4),
    marginTop: hp(1),
    backgroundColor: '#01818C',
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnText2: {
    textAlign: 'center',
    color: 'white',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '600',
  },

  cardContiner2: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // backgroundColor: 'red'
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },



});