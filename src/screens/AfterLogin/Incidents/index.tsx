import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attendedIncidentsList, incidentList } from '../../../redux/actions/incidentsAction';
import { styles } from "./styles";
import LoaderScreen from '../../../components/LoaderScreen';
import { squareImage } from '../../../utils/images';
import { navigate } from '../../../services/navigationService';
import { Route } from '../../../utils/routes';

const Incidents = () => {
  const { incidentsData, isLoading, attendedListData } = useSelector((store: any) => store.incidentReducer);
  const { userData } = useSelector((store: any) => store.loginReducer);
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const userId = userData?.data?.user_id;

  useEffect(() => {
    dispatch(incidentList(userId));
    dispatch(attendedIncidentsList(userId));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(incidentList(userId));
    dispatch(attendedIncidentsList(userId));
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const hasIncidentsData = incidentsData?.length > 0;
  const hasAttendedData = attendedListData?.length > 0;
  console.log(hasAttendedData, hasIncidentsData, "dsd");

  const isEmpty = (!hasIncidentsData && !hasAttendedData) || (hasIncidentsData === undefined && hasAttendedData === undefined);

  const Empty = !hasIncidentsData && !hasAttendedData && hasIncidentsData === undefined && hasAttendedData === undefined;

  if (isLoading) {
    return <LoaderScreen visible={isLoading} />;
  }

  if (isEmpty) {
    return (
      <View style={styles.noDataFoundContainer}>
        <Text style={styles.noDataFoundfontColor}>No Live Or {"\n"} Actioned {"\n"}Alerts</Text>
      </View>)
  }

  const renderIncidentItem = ({ item, index }: any) => {
    return (
      <View style={styles.renderComponentContainer}>
        {
          index === 0 && (
            <Text>incidents need attention</Text>
          )
        }
        <Text style={{ color: "black" }}>{item?.section}</Text>
        <TouchableOpacity style={styles.renderComponentImageBox}>
          <TouchableOpacity style={styles.zoomImageContainer} onPress={() => navigate(Route.VIEWFULLIMAGE, {
            url: item?.image
          })}>
            <Image source={squareImage} style={styles.zoomImage} />
          </TouchableOpacity>
          <Image source={{ uri: item?.image }} style={styles.renderComponentImage} />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    )
  };

  const renderAttendedItem = ({ item, index }: any) => {
    return (
      <View style={styles.renderComponentContainer}>
        {
          index === 0 && (
            <Text>1 incident</Text>
          )
        }
        <Text style={{ color: "gray" }}>{item?.section}</Text>
        <TouchableOpacity style={styles.renderComponentImageBox}>
          <Image source={{ uri: item?.image }} style={styles.renderComponentImage} />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
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
              return renderIncidentItem({ item, index });
            } else {
              return renderAttendedItem({ item, index: index - incidentsData?.length });
            }
          }}
        />
      )}
    </View>
  );
};

export default Incidents;
