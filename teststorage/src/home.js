import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import {getData} from './getData';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});
function App() {
  var [clients, setClients] = useState('');
  var [dataClient, setDataClient] = useState('');
  function fgetData() {
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
    console.log('iniciando proceso...');
    getData().then(function(data) {
      setClients(data.data);
      console.log(data);
    });
  }

  function saveOneRow() {
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        ['martin', '123', 'adress..'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('Success', 'You are Registered Successfully', {
              cancelable: false,
            });
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  }

  function getList() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setDataClient(temp);
        console.log('Mostrar info de la bd:');
        console.log(temp);
      });
    });
  }

  function guardarRestEnBd() {
    clients.map(cliente => {
      db.transaction(function(tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
          [cliente.name, cliente.cell, 'direccion...'],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Se registro...');
            } else {
              alert('Sorry... ');
            }
          },
        );
      });
    });
  }

  return (
    <>
      <ScrollView>
        <View>
          <Text>DATOS...</Text>
          <Text>boton...</Text>
          <Button
            style={{margin: 10}}
            onPress={() => fgetData()}
            title="Create db y get Data"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => saveOneRow()}
            title="Guardar registro"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => guardarRestEnBd()}
            title="Guardar info del rest..."
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => getList()}
            title="Leer de bd"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: '#AADEDA',
  },
});
export default App;
