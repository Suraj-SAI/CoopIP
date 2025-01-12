import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attendedIncidentsList, incidentList } from '../../../redux/actions/incidentsAction';
import { styles } from "./styles";
import LoaderScreen from '../../../components/LoaderScreen';
import { RenderIncidentItem } from '../../../components/RenderIncidentItem';
import { RenderAttendedItem } from '../../../components/RenderAttendedItem';

const Incidents = () => {
  const { incidentsData, isLoading, attendedListData } = useSelector((store: any) => store.incidentReducer);
  const { userData } = useSelector((store: any) => store.loginReducer);
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const userId = userData?.data?.user_id;
  const [videoStatusMap, setVideoStatusMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(incidentList(userId));
    dispatch(attendedIncidentsList(userId));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(incidentList(userId));
    setVideoStatusMap({});
    dispatch(attendedIncidentsList(userId));
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const hasIncidentsData = incidentsData?.length > 0;
  const hasAttendedData = attendedListData?.length > 0;

  const isEmpty = !hasIncidentsData && !hasAttendedData;

  if (isLoading) {
    return <LoaderScreen visible={isLoading} />;
  }

  const toggleVideoStatus = (itemId: string) => {
    setVideoStatusMap((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <View style={styles.noDataFoundContainer}>
          <Text style={styles.noDataFoundfontColor}>No Live Or {"\n"} Actioned {"\n"}Alerts</Text>
        </View>
      ) : (
        <FlatList
          data={[
            ...(hasIncidentsData ? incidentsData : []),
            ...(hasAttendedData ? attendedListData : [])
          ]}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (index < incidentsData?.length) {
              return <RenderIncidentItem item={item} index={index} videoStatusMap={videoStatusMap} toggleVideoStatus={toggleVideoStatus} incidentsData={incidentsData}/>
            } else {
              return <RenderAttendedItem item={item} index={index - incidentsData?.length} attendedListData={attendedListData} />
            }
          }}
        />
      )}
    </View>
  );
};

export default Incidents;
