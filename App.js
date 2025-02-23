import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {
  state = {
    results: '',
    Grade : '',
  };

  onLoad = async (grades) => {
    this.setState({ results: `Loading, please wait...`, Grade: grades });

    const response = await fetch(
      `https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=${grades}`,
      { method: 'GET' }
    );

    const data = await response.json(); 
    this.setState({ results: data.join('\n') });
  };

  render() {
    const { results, Grade } = this.state;
    
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {Grade ? `Students who received a/an ${Grade} grade:` : 'Select a grade to view students'}
        </Text>

        <TextInput
          style={styles.preview}
          value={results}
          placeholder="Results..."
          editable={false}
          multiline
        />

        <View>
          {['A', 'B', 'C', 'D', 'E'].map((grade) => (
            <TouchableOpacity key={grade} onPress={() => this.onLoad(grade)} style={styles.btn}>
              <Text>Grade {grade}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 400,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
});
