import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const TeacherList: React.FC = () => {
  const [filtersVisible, setIsFiltersVisible] = useState(false);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  function handleToggleFiltersVisibility() {
    setIsFiltersVisible(state => !state);
  }

  async function loadFavourites() {
    const storagedData = await AsyncStorage.getItem('Proffy:favourites');

    if (storagedData) {
      const favouriteTeachers = JSON.parse(storagedData);
      const favouriteTeachersIds = favouriteTeachers.map(
        (teacher: Teacher) => teacher.id,
      );

      setFavourites(favouriteTeachersIds);
    }
  }

  async function handleFiltersSubmit() {
    loadFavourites();

    const response = await api.get('/classes', {
      params: {
        subject,
        time,
        week_day,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={text => setTime(text)}
                  style={styles.input}
                  placeholder="Quais horas ?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Buscar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favourited={favourites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
