import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [duration, setDuration] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

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
    const interval = setInterval(loadBusStopData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bus Arriving in:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" size="large" /> : duration}
      </Text>

      <Text>Service Number:</Text>

      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" size="large" /> : busNumber}
      </Text>

      <Text>Bus Arrival Time:</Text>
      {/* if loading is true, show loading */}
      {/* if loading is false, show loaded */}

      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" size="large" /> : arrival}
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text>Refresh!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
  },
  arrivalTime: {
    fontSize: 20,
  },
});
