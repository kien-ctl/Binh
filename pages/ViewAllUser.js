import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'qlsv.db', createFromLocation : 1});
 
export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.user_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.id}</Text>
              <Text>Mã Nhân Viên: {item.msv}</Text>
              <Text>Tên Nhân Viên: {item.tensv}</Text>
              <Text>Năm Sinh: {item.ngaysinh}</Text>
              <Text>Quê Quán:{item.lop}</Text>
              <Text>Trình độ học vấn:{item.khoa}</Text>
              <Text>Vị trí làm việc:{item.nganh}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}