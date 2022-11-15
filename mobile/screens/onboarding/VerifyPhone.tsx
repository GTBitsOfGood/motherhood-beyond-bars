// import { View } from "../../components/Themed";
// import {
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import { OnboardingStackScreenProps } from "../../types";
// import React, { useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { PhoneAuthProvider } from "firebase/auth";

// export default function VerifyPhone({
//   navigation,
// }: OnboardingStackScreenProps<"VerifyPhone">) {
//   const [code, setCode] = useState("");
  
//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//           <View style={styles.inner}>
//             <Text style={styles.title}>
//               We have sent a code to your mobile number.
//             </Text>
//             <Text style={styles.description}>Verification Code</Text>
//             <TextInput
//               autoFocus={true}
//               style={styles.input}
//               onChangeText={(code) => {
//                 setCode(code);
//               }}
//             />
//             <View style={{ paddingTop: 36 }}>
//               <TouchableOpacity style={styles.button} onPress={() => {
                
//               }}>
//                 <Text style={styles.buttonText}>Continue</Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 paddingTop: 63,
//               }}
//             >
//               <Text style={{ fontSize: 14 }}>
//                 Try a different phone number?{" "}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate("CreateAccount");
//                 }}
//               >
//                 <Text style={{ color: "#304CD1" }}>Go Back</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   inner: {
//     padding: 20,
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     paddingBottom: 6,
//   },
//   description: {
//     paddingTop: 12,
//     fontSize: 14,
//     paddingBottom: 8,
//   },
//   input: {
//     backgroundColor: "#FAFBFC",
//     height: 44,
//     borderColor: "#D9D9D9",
//     borderWidth: 1,
//     borderRadius: 4,
//     width: "100%",
//     paddingLeft: 8,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: "#304CD1",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#304CD1",
//     padding: 10,
//     fontWeight: "500",
//     fontSize: 16,
//   },
// });
