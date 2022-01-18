import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { borderLeftColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [duration, setDuration] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  var ms = duration;
    min = Math.floor((ms / 1000 / 60) << 0);
    sec = Math.floor((ms / 1000 / 60) % 60);


  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Original data:");
        console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        console.log("My Bus:");
        console.log(myBus);
        setBusNumber(myBus.no);
        setDuration(myBus.next.duration_ms);
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    // loadBusStopData();
    const interval = setInterval(loadBusStopData, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Buss App</Text>

      <Text>Service Number:</Text>

      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" size="large" /> : busNumber}
      </Text>

      <Text>Bus Arriving in:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          min + " minutes " + sec + " seconds"
        )}
      </Text>

      <Text>Bus Arrival Time:</Text>
      {/* if loading is true, show loading */}
      {/* if loading is false, show loaded */}

      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" size="large" /> : arrival}
      </Text>

      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
        <Text style={{ color: "white" }}>Refresh!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
  },
  arrivalTime: {
    fontSize: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    paddingBottom: 20,
  },
});
//second git  commit test
