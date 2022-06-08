/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { colors } from './constants';
import { Card } from './src/card';
import { useQuery, useMutation, gql } from "@apollo/client";
import { BottomCard } from './src/bottom-card';

const CARDS_QUERY = gql`
  {
    cards {
      id
      name
    }
  }
`;

const CREATE_CARD_MUTATION = gql`
mutation{
  createCard(
      data: {
          name: "My Second Food Style",
          minPrice: null,
          maxPrice: null,
          locationTypeIds: [],
          locationCuisineTypeIds: [],
          dishTypeIds: [],
          courseTypeIds: [],
          dietIds: [],
          excludedIngredientIds: [],
      }
  ){
      id
      name
  }
}
`;

const logo = require('./src/logo.png');
const bannerHeight = 157;
export const paddingHorizontal = 20;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [foodStyles, setFoodStyle] = useState([
    {id: 1, style: 'My first food style'},
    {id: 2, style: 'Vegan for me'},
    {id: 3, style: 'Brunchi Munchi'},
    {id: 4, style: 'The great get together brunch on saturday'},
    {id: 5, style: 'Sunday supper'},
    {id: 6, style: 'Very much eating that vegan thingie today'},
  ]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
  };

  const { data, loading, error, refetch } = useQuery(CARDS_QUERY);

  const [createCard, { createCardData, createCardLoading, createCardError }] = useMutation(CREATE_CARD_MUTATION, {
    onCompleted: (data) => {
      refetch();
    }
  });

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.rectangleCopy}>
        <LinearGradient
          colors={[colors.ORANGISH, colors.MAIZE, colors.WHITE]}
          style={styles.linearGradient}>
          <Image source={logo} style={styles.logoStyle} />
        </LinearGradient>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollViewCtn}>

        {loading && <Text>Loading...</Text>}
        {error && <Text>Error! {error.message}</Text>}

        {data && [...data.cards].reverse().map(card => (
          <Card refetch={refetch} key={card.id} {...card}  />
        ))}

        {createCardLoading && <Text>Loading...</Text>}
        {createCardData && <Text>{JSON.stringify(createCardData)}</Text>}
      </ScrollView>
      <View style={styles.bottomCardStyle}>
        <BottomCard createCard={createCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: 22,
    height: 26,
    marginTop: 60,
  },
  rectangleCopy: {
    height: bannerHeight,
    backgroundColor: colors.ORANGISH,
    shadowColor: colors.GREYISH_40,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
  },
  scrollViewCtn: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: bannerHeight - 50,
    bottom: 140,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  bottomCardStyle: {
    height: 50,
    backgroundColor: colors.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  bottomCardInner: {
    height: 50,
    backgroundColor: colors.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default App;
