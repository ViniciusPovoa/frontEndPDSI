import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { ReservationCard, ReservationCardProps } from "./ReservationCard";


export type BackendResponse = ReservationCardProps[];

function backendPlaceholder(): Promise<BackendResponse> 
{
    return Promise.resolve([{
        name: "Reserva 1",
        unavailableDates: ['04/09/2025', '05/09/2025'],
        imgURL: "https://tocas-ui.com/5.0/en-us/assets/images/16-9.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend augue sed justo mattis..."
    }]);
}
interface ReservationBodyProps 
{
    styleTitle?: StyleProp<TextStyle>;
}
export const ReservationBody: React.FC<ReservationBodyProps> = ({ styleTitle }) =>
{
    const [reservations, setReservations] = useState<ReservationCardProps[]>([]);

    useEffect(() => 
    {
        backendPlaceholder().then(setReservations);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styleTitle]}>Reservas</Text>
            {reservations.map((reservation, index) => (
                <ReservationCard 
                    key={index}
                    name={reservation.name}
                    unavailableDates={reservation.unavailableDates}
                    imgURL={reservation.imgURL}
                    description={reservation.description}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#0058A3"
  }
});