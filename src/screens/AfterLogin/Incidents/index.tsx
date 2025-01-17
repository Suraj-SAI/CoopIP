import { View, Text, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attendedIncidentsList, incidentList } from '../../../redux/actions/incidentsAction';
import { styles } from "./styles";
import LoaderScreen from '../../../components/LoaderScreen';
import { RenderIncidentItem } from '../../../components/RenderIncidentItem';
import { RenderAttendedItem } from '../../../components/RenderAttendedItem';
import ModalLoader from '../../../components/ModalLoader';
import { useFocusEffect } from '@react-navigation/native';
import { BOTTOMATTENDEDSHEETCLOSE, BOTTOMDISMISSSHEETCLOSED } from '../../../redux/types';

const Incidents = () => {
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [videoStatusMap, setVideoStatusMap] = useState<{ [key: string]: boolean }>({});

  // Selectors
  const { incidentsData, isLoading, attendedListData } = useSelector((store: any) => store.incidentReducer);
  const { attendedOpen, unAttendedOpen } = useSelector((store: any) => store?.bottomeSheetReducer);
  const { userData } = useSelector((store: any) => store.loginReducer);
  const { loading } = useSelector((store: any) => store?.incidentACtionReducer);

  // User ID
  const userId = userData?.data?.user_id;

  // Data fetching
  useEffect(() => {
    if (userId) {
      dispatch(incidentList(userId , 0));
      dispatch(attendedIncidentsList(userId));
    }
  }, [dispatch, userId]);

  // Refresh logic
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (userId) {
      dispatch(incidentList(userId , 0));
      dispatch(attendedIncidentsList(userId));
    }
    setVideoStatusMap({});
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch, userId]);

  // Handle back press to close bottom sheet
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (attendedOpen || unAttendedOpen) {
          dispatch({ type: BOTTOMATTENDEDSHEETCLOSE });
          dispatch({ type: BOTTOMDISMISSSHEETCLOSED });
          return true; // Prevent default back action
        }
        return false; // Allow default back action
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [attendedOpen, unAttendedOpen, dispatch])
  );

  // Ensure hooks are always called, regardless of render conditions
  const hasIncidentsData = incidentsData?.length > 0;
  const hasAttendedData = attendedListData?.length > 0;
  const isEmpty = !hasIncidentsData && !hasAttendedData;

  const toggleVideoStatus = (itemId: string) => {
    setVideoStatusMap({
      [itemId]: true,
    });
  };

  return (
    <View style={styles.container}>
      <ModalLoader visible={loading} />
      {isLoading ? (
        <LoaderScreen visible={isLoading} />
      ) : isEmpty ? (
        <View style={styles.noDataFoundContainer}>
          <Text style={styles.noDataFoundfontColor}>No Live Or {"\n"} Actioned {"\n"}Alerts</Text>
        </View>
      ) : (
        <FlatList
          data={[
            ...(hasIncidentsData ? incidentsData : []),
            ...(hasAttendedData ? attendedListData : []),
          ]}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (index < incidentsData?.length) {
              return (
                <RenderIncidentItem
                  item={item}
                  index={index}
                  videoStatusMap={videoStatusMap}
                  toggleVideoStatus={toggleVideoStatus}
                />
              );
            } else {
              return (
                <RenderAttendedItem
                  item={item}
                  index={index - incidentsData?.length}
                  attendedListData={attendedListData}
                />
              );
            }
          }}
        />
      )}
    </View>
  );
};

export default Incidents;
