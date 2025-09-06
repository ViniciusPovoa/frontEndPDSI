import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Card } from "./Card";
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Optional: Configure locale for calendar (e.g., Portuguese)
LocaleConfig.locales['pt-br'] = 
{
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Ago.','Set.','Out.','Nov.','Dez.'],
        dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
        dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
        today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

interface ReservationCardProps 
{
        name: string;
        unavailableDates: string[]; // just the date strings in "DD/MM/YYYY" format
        imgURL: string;
        description: string;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({ name, unavailableDates, imgURL, description }) => {
        const [isCalendarVisible, setIsCalendarVisible] = useState(false);
        const [selectedDates, setSelectedDates] = useState<{ [key: string]: any }>({});

        const initialMarkedDates = useMemo(() => {
                const marked: { [key: string]: any } = {};
                for (const dateStr of unavailableDates) 
                {
                        const [day, month, year] = dateStr.split('/');
                        const formattedDate = `${year}-${month}-${day}`;
                        marked[formattedDate] = {
                                disabled: true,
                                disableTouchEvent: true,
                                customStyles: {
                                        container: 
                                        {
                                                backgroundColor: '#f32c25ff',
                                                elevation: 2,
                                        },
                                        text: 
                                        {
                                                color: 'white',
                                                fontWeight: 'bold',
                                        },
                                }
                        };
                }
                return marked;
        }, [unavailableDates]);

        const handleDayPress = (day: { dateString?: string }) => {
                const dateISO = day?.dateString;
                if (!dateISO) return;

                setSelectedDates(prevSelected => {
                        const newSelected = { ...prevSelected };
                        if (newSelected[dateISO]) 
                        {
                                delete newSelected[dateISO];
                        } else 
                        {
                                newSelected[dateISO] = {
                                        disabled: false,
                                        disableTouchEvent: false,
                                        customStyles: 
                                        {
                                                container: 
                                                {
                                                        backgroundColor: '#0058A3',
                                                        elevation: 2,
                                                },
                                                text: 
                                                {
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                },
                                        }
                                };
                        }
                        return newSelected;
                });

                Alert.alert('Reserva Feita para Data: ', dateISO);
        };

        const markedDates = useMemo(() => {
                return { ...initialMarkedDates, ...selectedDates };
        }, [initialMarkedDates, selectedDates]);

        const today = new Date().toISOString().split('T')[0];

        return (
                <Card title={name}>
                        <View style={styles.container}>
                                
                                <Image source={{ uri: imgURL }} style={styles.image} />
                                
                                <View style={styles.contentContainer}>
                                        <Text style={styles.description}>{description}</Text>
                                </View>
                                <TouchableOpacity style={styles.calendarIconContainer} onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
                                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/55/55281.png' }} style={styles.calendarIcon} />
                                </TouchableOpacity>
                        </View>
                        {isCalendarVisible && (
                                <Calendar
                                        style={styles.calendarOverlay}
                                        markingType={'custom'}
                                        markedDates={markedDates}
                                        onDayPress={handleDayPress}
                                        minDate={today}
                                        theme={{
                                                calendarBackground: '#ffffff',
                                                textSectionTitleColor: '#b6c1cd',
                                                todayTextColor: '#0058A3',
                                                dayTextColor: '#4e4e4eff',
                                                textDisabledColor: '#d9e1e8',
                                                arrowColor: '#003868',
                                                monthTextColor: '#0058A3',
                                                indicatorColor: '#0058A3',
                                                textDayFontWeight: 'bold',
                                                textMonthFontWeight: 'bold',
                                                textDayHeaderFontWeight: '300',
                                                textDayFontSize: 16,
                                                textMonthFontSize: 16,
                                                textDayHeaderFontSize: 16
                                        }}
                                />
                        )}
                </Card>
        );
};

const styles = StyleSheet.create({
        container: 
        {
                flexDirection: 'row',
                alignItems: 'flex-start',
                position: 'relative',
        },
        image: 
        {
                width: 120,
                height: 120,
                borderRadius: 8,
                marginRight: 16,
        },
        contentContainer: 
        {
                flex: 1,
                justifyContent: 'flex-start',
        },
        description: 
        {
                fontSize: 14,
                color: '#555',
                marginBottom: 8,
        },
        unavailableTitle: 
        {
                fontSize: 16,
                fontWeight: '600',
                marginTop: 8,
                marginBottom: 4,
        },
        calendarOverlay: 
        {
                zIndex: 100,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius: 8,
                marginTop: 10,
                backgroundColor: '#fff',
                alignSelf: 'stretch',
        },
        calendarIconContainer: 
        {
                position: 'absolute',
                right: 0,
                bottom: 0,
                padding: 8,
                zIndex: 101,
        },
        calendarIcon: 
        {
                width: 24,
                height: 24,
                tintColor: '#555',
        },
});
