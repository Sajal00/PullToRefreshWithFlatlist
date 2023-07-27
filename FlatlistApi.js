import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
const Devicewidth = Dimensions.get('window').width;
const Deviceheight = Dimensions.get('window').height;

export const FlatlistApi = () => {
  const [mydata, setMyData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const DATA_PER_PAGE = 10;
  const API_URL = 'https://jsonplaceholder.typicode.com/albums';

  const getAPIdata = async () => {
    try {
      const response = await fetch(
        `${API_URL}?_page=${page}&_limit=${DATA_PER_PAGE}`,
      );
      const result = await response.json();

      setMyData(prevData => (page === 1 ? result : [...prevData, ...result]));
      setIsRefreshing(false);
    } catch (error) {
      // console.error('Error fetching data:', error);
      setIsRefreshing(false);
    }
    // const url = 'https://jsonplaceholder.typicode.com/albums';
    // let apiresult = await fetch(url);
    // let result = await apiresult.json();

    // setMyData(result);
  };

  useEffect(() => {
    getAPIdata();
  }, [page]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };
  const datarenderItem = ({item}) => (
    <View
      style={{
        height: Deviceheight / 10,
        width: Devicewidth / 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: Deviceheight / 12,
          width: Devicewidth / 1.1,
          backgroundColor: 'skyblue',
          borderRadius: 10,
          alignItems: 'center',
          elevation: 5,
        }}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.itemcontainner}>
      {mydata.length ? (
        <FlatList
          data={mydata}
          renderItem={datarenderItem}
          // keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            setPage(prevPage => prevPage + 1); // Load more data when the user reaches the end of the list
          }}
        />
      ) : (
        <Text>no data found</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  itemcontainner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Deviceheight / 1,
    width: Devicewidth / 1,
    // backgroundColor: 'grey',
  },
});
