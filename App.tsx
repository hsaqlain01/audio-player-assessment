import { SafeAreaView } from "react-native";
import React from "react";
import AudioPlayer from "./src/screens/AudioPlayerScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AudioPlayer />
    </SafeAreaView>
  );
};

export default App;
