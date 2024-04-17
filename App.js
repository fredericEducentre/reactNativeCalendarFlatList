import { useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, FlatList, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DATA from './data.json';


export default function App() {
  // State variables to manage selected date and interventions
  const [selected, setSelected] = useState('');
  const [interventions, setInterventions] = useState([]);
  // Extracting the planning data from the imported JSON
  const allPlaning = DATA.planning.planning;

  // Functional component for rendering each intervention item
  const Item = ({ topic }) => (
    <View style={styles.item}>
      <Text>{topic}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={day => {
          let selectedDate = day.dateString;
          setSelected(selectedDate);
          // Filtering the planning data to get slots for the selected date
          let filteredSlot = allPlaning.filter((planning) => planning.date == selectedDate)[0]?.slots;
          /*
          console.log('selected day :', selectedDate);
          console.log(filteredSlot?.length);
          */
          filteredSlot ? setInterventions(filteredSlot) : setInterventions([]);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, marked: true, selectedDotColor: 'orange' }
        }}
      />
      <FlatList
        data={interventions}
        renderItem={({ item }) => <Item topic={item.topic} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  item: {
    backgroundColor: 'darkgrey',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
