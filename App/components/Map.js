import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import { customProps, envKeys, Styles } from "../config";
import Icon from "./Icon";

export default function Map({ title, location, view = false, projectPin }) {
  const mapRef = useRef(null);

  // location state
  const [pin, setPin] = useState({
    latitude: 35.8909972201676,
    longitude: 14.461754106055244444,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  });

  useEffect(() => {
    setLocation();
  }, []);
  // set location function
  const setLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setPin({ latitude, longitude, latitudeDelta: 0.3, longitudeDelta: 0.3 });
      if (location) location(pin);
      const camera = await mapRef.current?.getCamera();
      if (camera) {
        camera.center = projectPin ? projectPin : pin;
        mapRef.current.animateCamera(camera, { duration: 500 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mapViewBox}>
      {view && (
        <ScrollView
          horizontal
          style={{
            flex: 0,
            position: "absolute",
            top: 20,
            width: "95%",
            zIndex: 1,
            backgroundColor: Styles.colors.darkCardBackgroundColor,
            borderRadius: 10,
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="search"
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setPin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              });
            }}
            query={{
              key: envKeys.googleApiKey,
              language: "en",
              components: "country:mt",
              radius: "30000",
              location: pin,
            }}
            bounce={300}
            maxLength={3}
            styles={{
              container: {
                width: "100%",
                borderRadius: 10,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              },
              textInput: {
                backgroundColor: Styles.colors.darkCardBackgroundColor,
                color: Styles.colors.primaryColorLight,
                ...Styles.colors.font,
                width: "100%",
                height: "100%",
                minWidth: 365,
                fontSize: 18,
              },
            }}
          />
        </ScrollView>
      )}
      {view && (
        <Icon
          name="map-marker-alert"
          backgroundColor={Styles.colors.secondaryColor}
          style={styles.mapMarker}
          innerSize={30}
          size={40}
          onPress={setLocation}
        />
      )}

      <MapView
        ref={mapRef}
        userInterfaceStyle={customProps.theme}
        pitchEnabled={true}
        showsUserLocation={view ? true : false}
        initialRegion={{
          latitude: projectPin ? projectPin.latitude : 35.878173828125,
          longitude: projectPin ? projectPin.longitude : 14.396160663677879,
          latitudeDelta: projectPin ? 0.05 : 0.4,
          longitudeDelta: projectPin ? 0.05 : 0.4,
        }}
        style={styles.map}
      >
        {view && (
          <Marker
            coordinate={pin}
            pinColor={Styles.colors.secondaryColor}
            draggable={true}
            onDragEnd={(event) => {
              setPin({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
              location(pin);
            }}
          >
            <Callout>
              <Text>{title}</Text>
            </Callout>
          </Marker>
        )}

        {!view && (
          <Marker
            coordinate={projectPin}
            pinColor={Styles.colors.secondaryColor}
            draggable={false}
          >
            {title && (
              <Callout>
                <Text>{title}</Text>
              </Callout>
            )}
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapMarker: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
  mapsSearchBar: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderRadius: 15,
    zIndex: 2,
    padding: 0,
    justifyContent: "center",
    shadowColor: "red",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  mapViewBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    margin: 10,
    marginBottom: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
