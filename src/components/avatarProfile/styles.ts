import { StyleSheet } from 'react-native';
import { COLORS } from '../../models/constants';

export default StyleSheet.create({
  avatarContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor : COLORS.primary,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 24,
  },
});