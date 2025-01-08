import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#E56135',
    width: wp(80),
    height: hp(8),
    borderRadius: wp(4),
  },
  btnTxt: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
  imgView: {
    backgroundColor: '#E56135',
    borderRadius: wp(50),
    height: wp(45),
    width: wp(45),
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  imgView2: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(50),
    height: wp(35),
    width: wp(35),
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: hp(10),
    width: wp(20),
    resizeMode: 'contain',
  },
  welcomeTxt: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: '#E56135',
    width: wp(80),
    textAlign: 'center',
  },
  txt: {
    width: wp(60),
    textAlign: 'center',
    fontSize: hp(2.5),
    color: '#000000',
    fontWeight: 'bold',
  },
});