import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "./Card";
import { Calendar, LocaleConfig, MarkedDates } from 'react-native-calendars';

// Optional: Configure locale for calendar (e.g., Portuguese)
LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
    dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';


interface ReservationCardProps 
{
        name: string;
        unavailableDates: string[]//just the date strings in "DD/MM/YYYY" format,
        imgURL: string;
        description: string;
}
export const ReservationCard: React.FC<ReservationCardProps> = ({ name, unavailableDates, imgURL, description }) => {
        
        const marked = useMemo(() => {
                return unavailableDates.reduce((acc: MarkedDates, dateStr) => {
                        // Convert "DD/MM/YYYY" to "YYYY-MM-DD"
                        const [day, month, year] = dateStr.split('/');
                        const formattedDate = `${year}-${month}-${day}`;
                        
                        acc[formattedDate] = { 
                                disabled: true, 
                                disableTouchEvent: true,
                                customStyles: {
                                        container: {
                                                backgroundColor: '#d9534f', // red
                                                elevation: 2,
                                        },
                                        text: {
                                                color: 'white',
                                                fontWeight: 'bold',
                                        },
                                }
                        };
                        return acc;
                }, {});
        }, [unavailableDates]);

        return (
                <Card title={name}>
                        <View style={styles.container}>
                                <Image source={{ uri: imgURL }} style={styles.image} />
                                <View style={styles.contentContainer}>
                                        <Text style={styles.description}>{description}</Text>
                                        <Text style={styles.unavailableTitle}>Datas Indisponíveis:</Text>
                                        <Calendar
                                                markingType={'custom'}
                                                markedDates={marked}
                                                // Optional: hide arrows if you want a static month view
                                                // hideArrows={true}
                                                // Optional: disable month change
                                                // disableMonthChange={true}
                                                theme={{
                                                        calendarBackground: '#ffffff',
                                                        textSectionTitleColor: '#b6c1cd',
                                                        todayTextColor: '#00adf5',
                                                        dayTextColor: '#2d4150',
                                                        textDisabledColor: '#d9e1e8',
                                                        arrowColor: 'orange',
                                                        monthTextColor: 'blue',
                                                        indicatorColor: 'blue',
                                                        textDayFontWeight: '300',
                                                        textMonthFontWeight: 'bold',
                                                        textDayHeaderFontWeight: '300',
                                                        textDayFontSize: 16,
                                                        textMonthFontSize: 16,
                                                        textDayHeaderFontSize: 16
                                                }}
                                        />
                                </View>
                        </View>
                </Card>
        );
};

const styles = StyleSheet.create({
        container: {
                flexDirection: 'row',
                alignItems: 'flex-start',
        },
        image: {
                width: '33%',
                aspectRatio: 1, // Keep image square
                borderRadius: 8,
                marginRight: 16,
        },
        contentContainer: {
                flex: 1, // Takes up the remaining space
        },
        description: {
                fontSize: 14,
                color: '#555',
                marginBottom: 8,
        },
        unavailableTitle: {
                fontSize: 16,
                fontWeight: '600',
                marginTop: 8,
                marginBottom: 4,
        },
});