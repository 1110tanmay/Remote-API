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
    selectedGrade: '',
  };

  onload = async (grades) => {
    this.setState({ results: 'Loading, please wait...', selectedGrade: grades });

    onLoad = async (grades) => {
      this.setState({ results: 'Loading, please wait...', selectedGrade: grades });
      
      const response = await fetch(`https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=${grades}`, {
        method: 'GET',
      });
  
      const results = await response.text();
      this.setState({ results });
  };

  render() {
    const { results, selectedGrade } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>
            {selectedGrade ? `Students who received a/an ${selectedGrade} grade:` : 'Select a grade to load students'}
          </Text>

          <TextInput
            style={styles.preview}
            value={results}
            placeholder="Results..."
            editable={false}
            multiline
          />

          {['A', 'B', 'C', 'D', 'E'].map((grades) => (
            <TouchableOpacity key={grades} onPress={() => this.onload(grades)} style={styles.btn}>
              <Text>Grade {grades}</Text>
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
  heading: {
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
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    alignItems: 'center',
  },
});
