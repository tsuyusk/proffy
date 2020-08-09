import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

const Favourites: React.FC = () => {
  const [favourites, setFavourites] = useState<Teacher[]>([]);
  async function loadFavourites() {
    const storagedData = await AsyncStorage.getItem('Proffy:favourites');

    if (storagedData) {
      const favouriteTeachers = JSON.parse(storagedData);

      setFavourites(favouriteTeachers);
    }
  }

  useFocusEffect(() => {
    loadFavourites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {favourites.map(teacher => (
          <TeacherItem key={`${teacher.id}`} teacher={teacher} favourited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favourites;
