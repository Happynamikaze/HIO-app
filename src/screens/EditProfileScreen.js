// // EditProfileScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const EditProfileScreen = ({ navigation }) => {
// 	const [userName, setUserName] = useState('');
// 	const [userEmail, setUserEmail] = useState('');
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState('');
// 	const [token, setToken] = useState('');
// 	const [phone, setPhone] = useState('');
// 	const [code, setCode] = useState('');
// 	const [otp, setOtp] = useState('');
// 	const [date, setDate] = useState('');

// 	useEffect(() => {
// 		const fetchData = async () => {1	
// 			try {
// 				const storedToken = await AsyncStorage.getItem("token");
// 				const storedPhone = await AsyncStorage.getItem("phone");
// 				const storedCode = await AsyncStorage.getItem("code");
// 				const storedOtp = await AsyncStorage.getItem("otp");
// 				const storedDate = await AsyncStorage.getItem("date");

// 				setToken(storedToken || '');
// 				setPhone(storedPhone || '');
// 				setCode(storedCode || '');
// 				setOtp(storedOtp || '');
// 				setDate(storedDate || '');
// 			} catch (error) {
// 				console.error("Error fetching stored values:", error);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	const handleUpdate = async () => {
// 		setLoading(true);
// 		const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

// 		try {
// 			const requestData = {
// 				token,
// 				phone,
// 				code,
// 				otp,
// 				date,
// 				insert_details: "true",
// 				usr_fullname: userName,
// 				user_email: userEmail
// 			};

// 			const response = await axios.post(apiUrl, requestData);

// 			if (response.data.success === 1) {
// 				// Successfully updated
// 				navigation.navigate('HomeScreen'); // Navigate back to the home screen or another appropriate screen
// 			} else {
// 				setError("Failed to update user details. Please try again.");
// 			}
// 		} catch (error) {
// 			console.error("Error updating user details:", error);
// 			setError("Something went wrong. Please try again later.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<SafeAreaView style={{ flex: 1, padding: 16 }}>
// 			<View>
// 				<Text style={styles.heading}>Edit Profile</Text>
// 				<TextInput
// 					style={styles.input}
// 					placeholder="Full Name"
// 					value={userName}
// 					onChangeText={setUserName}
// 				/>
// 				<TextInput
// 					style={styles.input}
// 					placeholder="Email"
// 					value={userEmail}
// 					onChangeText={setUserEmail}
// 					keyboardType="email-address"
// 				/>
// 				{error ? <Text style={styles.errorText}>{error}</Text> : null}
// 				<TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
// 					{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update</Text>}
// 				</TouchableOpacity>
// 			</View>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	heading: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		marginBottom: 16,
// 	},
// 	input: {
// 		height: 40,
// 		borderColor: 'gray',
// 		borderWidth: 1,
// 		marginBottom: 16,
// 		paddingHorizontal: 8,
// 	},
// 	button: {
// 		backgroundColor: '#007BFF',
// 		paddingVertical: 12,
// 		borderRadius: 4,
// 		alignItems: 'center',
// 	},
// 	buttonText: {
// 		color: '#fff',
// 		fontSize: 16,
// 		fontWeight: 'bold',
// 	},
// 	errorText: {
// 		color: 'red',
// 		marginBottom: 16,
// 	},
// });

// export default EditProfileScreen;



// EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TopBarMain from '../components/TopBarMain'
// import { ScrollView } from 'react-native-gesture-handler';
import Backarrow from '../../assets/images/backarrow.svg'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomQuote from '../../assets/images/BottomQuote.svg';


const EditProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedPhone = await AsyncStorage.getItem("phone");
        const storedCode = await AsyncStorage.getItem("code");
        const storedOtp = await AsyncStorage.getItem("otp");
        const storedDate = await AsyncStorage.getItem("date");

        setToken(storedToken || '');
        setPhone(storedPhone || '');
        setCode(storedCode || '');
        setOtp(storedOtp || '');
        setDate(storedDate || '');
      } catch (error) {
        console.error("Error fetching stored values:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";

    try {
      const requestData = {
        token,
        phone,
        code,
        otp,
        date,
        insert_details: "true",
        usr_fullname: userName,
        user_email: userEmail
      };

      const response = await axios.post(apiUrl, requestData);

      if (response.data.success === 1) {
        navigation.navigate('ProfileScreen');
      } else {
        setError("Failed to update user details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView >

      <View>
        <TopBarMain />
      </View>
        <LinearGradient
          colors={['#32959D', 'rgba(3, 102, 150, 0.80)']}
          style={styles.container}
          >
          {/* <ScrollView> */}
          {/* <ScrollView style={{ backgroundColor: '#fff', height: hp(100) }}> */}
          <View style={styles.container}>
            <View style={styles.align_back_nd_name}>
              <View >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Text style={styles.backButtonText}>
                    <Backarrow />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.align_back_name}>
                <Text style={styles.heading}>About Me</Text>
              </View>
            </View>
            <View style={styles.space_Top}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={`+${code}-${phone}`}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.btncenter_sumbit}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save My Details</Text>}
                </TouchableOpacity>
              </View>
            </View>

          </View>
          {/* </ScrollView> */}

      {/* </ScrollView> */}
        </LinearGradient>
        <View className="flex-row items-center" style={[styles.cardContiner, { backgroundColor: '#EBEFF2CC' }]}>
          <BottomQuote width={wp(71)} height={hp(15)} />
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  align_back_nd_name: {
    // flex: 1,
    flexDirection: 'row',
    paddingTop: hp(7),

  },
  space_Top: {
    paddingTop: hp(3),
  },


  align_back_name: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardContiner: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // backgroundColor: 'red'
  },
  container: {
    // flex: 1,
    padding: 16,
    // backgroundColor: linear-gradient(180deg, #32959D 0%, rgba(3, 102, 150, 0.80) 100%),
    height: hp(60),
    paddingTop: hp(3),
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 18,//
    borderRadius: 30,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#D9E3F0',
  },

  btncenter_sumbit: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
    width: 200,
    backgroundColor: '#4B5563',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EditProfileScreen;



