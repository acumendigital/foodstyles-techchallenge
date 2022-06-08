import React, { useState } from 'react';

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Alert
} from 'react-native';
import { paddingHorizontal } from '../App';
import { colors } from '../constants';

import { useMutation, gql } from "@apollo/client";

const moreImg = require('../src/more.jpeg');
const closeIcon = require('../src/closeIcon.png');

const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;

const SHARE_CARD_MUTATION = gql`
  mutation ShareCard($id: ID!) {
    shareCard(id: $id)
  }
`;

const DUPLICATE_CARD_MUTATION = gql`
  mutation DuplicateCard($id: ID!) {
    duplicateCard(id: $id){
      id,
      name
    }
  }
`;




export const Card = ({ name, id, refetch }) => {
  const [cardActive, setCardActive] = useState(false);

  const [deleteCard] = useMutation(DELETE_CARD_MUTATION, {
    variables: { id: `${id}` },
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [shareCard] = useMutation(SHARE_CARD_MUTATION, {
    variables: { id: `${id}` },
    onCompleted: (data) => {
      shareCardCode(data.shareCard);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [duplicateCard] = useMutation(DUPLICATE_CARD_MUTATION, {
    variables: { id: `${id}` },
    onCompleted: (data) => {
      console.log(data);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  handleDeleteCard = () => {
    deleteCard();
    setCardActive(false);
  }

  handleDuplicateCard = () => {
    duplicateCard();
    setCardActive(false);
  }

  handleShareCard = () => {
    shareCard();
    setCardActive(false);
  }

  
const shareCardCode = async (code) => {
  try {
    const result = await Share.share({
      message: `https://cards.foodstyles.com/${code}`,
      title: 'Share Card',
      subject: 'Share Card',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert('', 'Oh no! Something went wrong. Please try later.');
  }
}

const deleteAlert = (onDelete) =>
  Alert.alert(
    'Confirm Delete',
    'This will delete the Food Style and all its settings.',
    [
      {
        text: 'Delete',
        onPress: () => handleDeleteCard(),
        style: 'delete'
      },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
    ]
  );


  return (
    <View style={[styles.cardCtn, cardActive && { marginBottom: 95 }]}>
      <Text style={styles.textStyle}>{id} {name}</Text>
      <TouchableOpacity onPress={() => setCardActive(!cardActive)}>
        {cardActive ? (
          <Image source={closeIcon} style={styles.iconStyle} />
        ) : (
          <Image source={moreImg} style={styles.iconStyle} />
        )}
      </TouchableOpacity>
      {cardActive && (
        <View style={styles.actionsCtn}>
          <TouchableOpacity style={styles.action} onPress={() => handleShareCard()}>
            <Text style={styles.actionTextStyle}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => handleDuplicateCard()}>
            <Text style={styles.actionTextStyle}>Duplicate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => deleteAlert()}>
            <Text style={styles.actionTextStyle}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardCtn: {
    height: 52,
    paddingHorizontal: paddingHorizontal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 12,
    marginBottom: 0,
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    shadowColor: colors.GREYISH_40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  textStyle: {
    width: 260,
    height: 22,
    // fontFamily: 'ProximaNovaA',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    color: colors.GREYISH_BROWN,
  },
  actionsCtn: {
    position: 'absolute',
    right: paddingHorizontal,
    bottom: -90,
    zIndex: 9,
  },
  actionTextStyle: {
    width: 40,
    height: 28,
    // fontFamily: 'ProximaNovaA',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.GREEN_TEAL,
  },
});
