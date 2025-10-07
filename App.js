import React, {useEffect, useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accountSettings = (() => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [latestNews, setLatestNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const PUSH_NOTIFICATIONS_KEY = 'PUSH_NOTIFICATIONS';
  const MARKETING_EMAILS_KEY = 'MARKETING_EMAILS';
  const LATEST_NEWS_KEY = 'LATEST_NEWS';
  const DARK_MODE_KEY = 'DARK_MODE';

  useEffect(() => {
    loadPreferences();
  },[]);

  const loadPreferences = async () => {
    try {
      const pushNotiValue = await AsyncStorage.getItem(PUSH_NOTIFICATIONS_KEY);
      const marketingEmailValue = await AsyncStorage.getItem(MARKETING_EMAILS_KEY);
      const latestNewsValue = await AsyncStorage.getItem(LATEST_NEWS_KEY);
      const darkModeValue = await AsyncStorage.getItem(DARK_MODE_KEY);

      if(pushNotiValue !== null) setPushNotifications(JSON.parse(pushNotiValue));
      if(marketingEmailValue !== null) setMarketingEmails(JSON.parse(marketingEmailValue));
      if(latestNewsValue !== null) setLatestNews(JSON.parse(latestNewsValue));
      if(darkModeValue !== null) setDarkMode(JSON.parse(darkModeValue));



    } catch (error) {
      console.error('Error loading preferences', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Account Settings </Text>
      <View style={styles.row}>
        <Text> Marketing Emails </Text>
        <Switch 
          value = {marketingEmails}
          onValueChange = { async (value) => {
            setMarketingEmails(value);
            await AsyncStorage.setItem(MARKETING_EMAILS_KEY, JSON.stringify(value));
          }}
        />
      </View>
      <View style={styles.row}>
        <Text> Push Notifications </Text>
        <Switch 
          value = {pushNotifications}
          onValueChange = { async (value) => {
            setPushNotifications(value);
            await AsyncStorage.setItem(PUSH_NOTIFICATIONS_KEY, JSON.stringify(value));
          }}
        />
      </View>
      <View style={styles.row}>
        <Text> Latest News </Text>
        <Switch 
          value = {latestNews}
          onValueChange = { async (value) => {
            setLatestNews(value);
            await AsyncStorage.setItem(LATEST_NEWS_KEY, JSON.stringify(value));
          }}
        />
       </View>
       <View style={styles.row}>
        <Text> Dark Mode </Text>
        <Switch 
          value = {darkMode}
          onValueChange = { async (value) => {
            setDarkMode(value);
            await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(value));
          }}
        />
      </View>
    </View >
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize:24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  }, 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation:3,
  }

});

export default accountSettings;