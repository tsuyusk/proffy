import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import styles from './styles';

import HeartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavouriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favourited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favourited }) => {
  const [isFavourited, setIsFavourited] = useState(favourited);

  async function handleLinkToWhatsapp() {
    await api.post('/connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavourite() {
    const favourites = await AsyncStorage.getItem('Proffy:favourites');

    let favouritesParsedIntoArray = [];

    if (favourites) {
      favouritesParsedIntoArray = JSON.parse(favourites);
    }

    if (isFavourited) {
      const favouritedTeacherIndex = favouritesParsedIntoArray.findIndex(
        (findTeacher: Teacher) => findTeacher.id === teacher.id,
      );

      favouritesParsedIntoArray.splice(favouritedTeacherIndex, 1);

      setIsFavourited(false);
    } else {
      favouritesParsedIntoArray.push(teacher);

      setIsFavourited(true);
    }
    await AsyncStorage.setItem(
      'Proffy:favourites',
      JSON.stringify(favouritesParsedIntoArray),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavourite}
            style={[
              styles.favouriteButton,
              isFavourited ? styles.favourited : {},
            ]}
          >
            {isFavourited ? (
              <Image source={unFavouriteIcon} />
            ) : (
              <Image source={HeartOutlineIcon} />
            )}
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
