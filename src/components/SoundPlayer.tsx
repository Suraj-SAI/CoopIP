import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';

const SoundPlayer = ({ children }: any) => {
    const soundRef = useRef<any>(null);
    const { incidentsData } = useSelector((store: any) => store.incidentReducer);
    const { isLoggedIn } = useSelector((store: any) => store.loginReducer);

    useEffect(() => {
        if (incidentsData?.length > 0 && isLoggedIn == true) {
            // Load the sound file (update the path accordingly)
            const sound = new Sound('dings.mp3', Sound.MAIN_BUNDLE, error => {
                if (error) {
                    console.log('Sound loading failed:', error);
                } else {
                    // Play the loaded sound
                    sound.setNumberOfLoops(-1);
                    sound.play(success => {
                        if (success) {
                            console.log('Sound played successfully');
                        } else {
                            console.log('Sound playing failed');
                        }
                    });
                }
            });

            soundRef.current = sound;

            // Cleanup when the component unmounts or when changeValue no longer includes 1
            return () => {
                if (soundRef.current) {
                    soundRef.current.stop(); // Stop the sound
                    soundRef.current.release(); // Release the sound resource
                }
            };
        }
    }, [incidentsData?.length > 0, isLoggedIn]);

    return children;
};

export default SoundPlayer;
