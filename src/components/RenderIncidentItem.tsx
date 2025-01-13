import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VideoPlayer from 'react-native-video-controls';
import { useToast } from "react-native-toast-notifications";
import { navigate } from "../services/navigationService";
import { Route } from "../utils/routes";
import { clockImage, squareImage } from "../utils/images";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import { incidentList, incidentListReload } from "../redux/actions/incidentsAction";
import { useDispatch, useSelector } from "react-redux";
import { BOTTOMATTENDEDSHEETOPEN, BOTTOMDISMISSSHEETOPEN } from "../redux/types";

export const RenderIncidentItem = ({ item, index, videoStatusMap, toggleVideoStatus }: any) => {
    const toast = useToast();
    const uniqueId = item?.id || `${item.section}_${index}`;
    const videoStatus = videoStatusMap[uniqueId] || false;
    const dispatch = useDispatch<any>()
    const { userData } = useSelector((store: any) => store.loginReducer);
    const { incidentsData } = useSelector((store: any) => store.incidentReducer);

    let userId = userData?.data?.user_id;
    const [counter, setCounter] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [fetchingId, setFetchingId] = useState(0)

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => {
                dispatch(incidentListReload(userId))
                setCounter(prev => prev + 1);
            }, 2000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const temp = incidentsData ?? []
        const selected = temp.find((item: any) => item?.theft_id == fetchingId)
        if (selected?.video) {
            stop()
        }
    }, [incidentsData])

    const start = (id: any) => {
        setFetchingId(id);
        setIsRunning(true);
    };
    const stop = () => {
        setIsRunning(false);
    };

    return (
        <View style={styles.renderComponentContainer}>
            {index === 0 && <View style={styles.incidentViewStyles}>
                <Image source={clockImage} style={styles.incidentImage} />
                <Text style={styles.incidentTextStyles}>{incidentsData?.length === 1 ? "Incident needs attention" : "Incidents need attention"}</Text>
            </View>}
            <Text style={styles.color}>{item?.section}</Text>
            <Text style={styles.dateText}>Today at {item?.date?.split(" ")[1]?.split(".")[0]}</Text>
            {videoStatus ? (
                <View style={styles.vidoeRenderer}>
                    <VideoPlayer
                        source={{ uri: item.video }}
                        onError={() =>
                            toast.show('Unable to load video. Please try again later.', {
                                type: 'danger',
                                placement: 'bottom',
                                duration: 2000,
                                animationType: 'slide-in',
                            })
                        }
                        disableBack={true}
                        disableVolume={true}
                        disableFullscreen={false}
                        repeat={true}
                        rate={3.0}
                        onEnterFullscreen={() => navigate(Route.FULLSCREENVIDEO, { videoUri: item?.video })}
                    />
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.renderComponentImageBox}
                    onPress={() => {
                        if (!item?.video) {
                            toast.show('Video failed to load. Tap reload to try again.', {
                                type: 'normal',
                                placement: 'bottom',
                                duration: 2000,
                                animationType: 'slide-in',
                            });
                        } else {
                            toggleVideoStatus(uniqueId);
                        }
                    }}
                >
                    <TouchableOpacity
                        style={styles.zoomImageContainer}
                        onPress={() =>
                            navigate(Route.VIEWFULLIMAGE, {
                                url: item?.image,
                            })
                        }
                    >
                        <Image source={squareImage} style={styles.zoomImage} />
                    </TouchableOpacity>
                    <Image source={{ uri: item?.image }} style={styles.renderComponentImage} />
                </TouchableOpacity>
            )}
            <View style={styles.belowIageTextView}>
                <Text style={styles.belowImageText}>Tap image to play video.</Text>

                {incidentsData[index]?.video === null && (
                    <TouchableOpacity onPress={() => {
                        start(item?.theft_id)
                    }}>
                        <Text
                            style={[
                                styles.belowImageTextReload,
                                fetchingId === item?.theft_id && { color: "red" },
                            ]}
                        >
                            {fetchingId === item?.theft_id ? `Fetching... ${counter}` : "Reload"}
                        </Text>
                    </TouchableOpacity>
                )}

            </View>
            <View style={styles.belowTextButtons}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => dispatch({
                    type: BOTTOMDISMISSSHEETOPEN,
                    payload: item?.theft_id
                })}>
                    <Text style={styles.buttonLefthText}>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRight} onPress={() => dispatch({
                    type: BOTTOMATTENDEDSHEETOPEN,
                    payload: item?.theft_id
                })}>
                    <Text style={styles.buttonRightText}>Attend</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    renderComponentContainer: {
        marginHorizontal: wp(2),
        paddingBottom: hp(3),
    },
    renderComponentImageBox: {
        borderColor: "red",
        borderWidth: hp(0.5),
        marginVertical: hp(1),
        marginHorizontal: wp(2)
    },
    zoomImageContainer: {
        position: "absolute",
        top: hp(2.5),
        right: wp(5),
        zIndex: 1
    },
    zoomImage: {
        height: hp(4),
        width: wp(9)
    },
    separator: {
        height: hp(0.2),
        backgroundColor: "#000",
        marginHorizontal: wp(2)
    },
    vidoeRenderer: {
        flex: 1,
        height: hp(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginHorizontal: wp(2),
        borderColor: "red",
        borderWidth: hp(0.5),
        marginBottom: hp(1)
    },
    renderComponentImage: {
        height: hp(25),
        width: "auto",
    },
    color: {
        color: 'black',
        marginHorizontal: wp(2),
        fontSize: hp(2.5)
    },
    incidentTextStyles: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        fontSize: hp(1.8),
        color: "#000"
    },
    incidentViewStyles: {
        marginHorizontal: wp(2),
        marginTop: hp(2),
        marginBottom: hp(2),
        backgroundColor: "#fef0cb",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: wp(2),
    },
    incidentImage: {
        height: hp(2.5),
        width: hp(2.5),
        marginLeft: wp(5)
    },
    dateText: {
        marginHorizontal: wp(2),
        textAlign: "right",
        color: "#000",
        fontSize: hp(1.8)
    },
    belowIageTextView: {
        flexDirection: "row",
        marginBottom: hp(2),
        marginHorizontal: wp(2)
    },
    belowImageText: {
        fontSize: hp(1.8),
        color: "#000"
    },
    belowImageTextReload: {
        color: "green",
        textDecorationLine: "underline",
        fontSize: hp(1.8),
        marginLeft: wp(1.5),
        fontWeight: "bold"
    },

    belowTextButtons: {
        marginHorizontal: wp(2),
        marginBottom: hp(2),
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttonLeft: {
        backgroundColor: "#f3f3f3",
        width: wp(42),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: hp(1.5),
        borderRadius: wp(2)
    },

    buttonLefthText: {
        fontSize: hp(2.1),
        color: "#000",
    },

    buttonRight: {
        backgroundColor: "green",
        width: wp(42),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: hp(1.5),
        borderRadius: wp(2)
    },

    buttonRightText: {
        color: "#fff",
        fontSize: hp(2.1),
    }
})