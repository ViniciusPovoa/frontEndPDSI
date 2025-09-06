import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';

export type LastAction = 
{
    id: string;
    title: string;
    location: string;
    displayDate: string;
    img?: string; 
};

export type UserData = 
{
    phone: string;
    email: string;
    profileImg?: string;
    bannerImg?: string;
    lastActions: LastAction[];
};

export type BackendResponse = Record<string, UserData>;


function backendPlaceholder(): Promise<BackendResponse> 
{
    return Promise.resolve({
        'Joao da Silva': {
            phone: '(34) 99999-9999',
            email: 'Joao.silva@email.com',
            profileImg: 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
            bannerImg: 'https://as2.ftcdn.net/jpg/00/98/51/39/1000_F_98513963_kUhivDRmAE3zdAwjYZM80jdauUmqR7A2.jpg',
            lastActions: [
                {
                    id: '1',
                    title: 'Alugou o solão de festas das 19:00-20:00',
                    location: 'Salão de festas',
                    displayDate: '10/02/2024',
                    img: 'https://www.adec.com.br/admin/image/reserva_area/4/67lg.jpg'
                },
                {
                    id: '2',
                    title: 'Alugou a quadra de futebol das 20:00-21:00',
                    location: 'Quadra de futebol',
                    displayDate: '10/02/2024',
                    img: 'https://altipisos.com.br/wp-content/uploads/2020/03/quadra-condominio.jpeg'
                }
            ]
        }
    });
}

interface ProfileScreenProps 
{
    navigation: any;
}

const PRIMARY = '#0058A3';
const FALLBACK_IMG = 'https://tocas-ui.com/5.0/en-us/assets/images/16-9.png';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => 
{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);

    const loadData = useCallback(async () => 
    {
        setLoading(true);
        setError(null);
        try 
        {
            const data = await backendPlaceholder();
            const firstKey = Object.keys(data)[0];
            if (!firstKey) 
            {
                setError('Nenhum usuário encontrado.');
            } 
            else 
            {
                setUserName(firstKey);
                setUserData(data[firstKey]);
            }
        } 
        catch (e: any) 
        {
            setError('Erro ao carregar dados.');
        } 
        finally 
        {
            setLoading(false);
        }
    }, []);

    useEffect(() => 
    {
        loadData();
    }, [loadData]);

    const handleEdit = () => 
    {
        Alert.alert('Editar Perfil', 'Função de edição ainda não implementada.');
    };

    const renderAction = ({ item }: { item: LastAction }) => 
    {
        return (
            <View style={styles.actionCard}>
                <Image
                    source={{ uri: item.img || FALLBACK_IMG }}
                    style={styles.actionImage}
                />
                <View style={styles.actionInfo}>
                    <Text style={styles.actionTitle}>{item.title}</Text>
                    <Text style={styles.actionMeta}>{item.location} • {item.displayDate}</Text>
                </View>
            </View>
        );
    };

    if (loading) 
    {
        return (
            <View style={styles.centered}> 
                <ActivityIndicator size="large" color={PRIMARY} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error) 
    {
        return (
            <View style={styles.centered}> 
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={loadData} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!userData) 
    {
        return (
            <View style={styles.centered}> 
                <Text style={styles.errorText}>Dados indisponíveis.</Text>
            </View>
        );
    }

    return (
       
        <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>
                    {'<'}
                </Text>
            </TouchableOpacity>
            <View style={styles.bannerWrapper}>
                <Image
                    source={{ uri: userData.bannerImg || FALLBACK_IMG }}
                    style={styles.banner}
                />
                <Image
                    source={{ uri: userData.profileImg || FALLBACK_IMG }}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.headerBlock}>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                <Text style={styles.phone}>{userData.phone}</Text>
                <TouchableOpacity onPress={handleEdit} style={styles.editButton} activeOpacity={0.85}>
                    <Text style={styles.editButtonText}>Editar perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Últimas ações publicadas</Text>
                <FlatList
                    data={userData.lastActions}
                        keyExtractor={item => item.id}
                        renderItem={renderAction}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma ação encontrada.</Text>}
                    />
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

export default ProfileScreen;


const styles = StyleSheet.create({
    root: 
    {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    scrollContent: 
    {
        paddingBottom: 24,
    },
    centered: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
    },
    loadingText: 
    {
        marginTop: 12,
        fontSize: 14,
        color: '#555',
    },
    errorText: 
    {
        fontSize: 14,
        color: '#c62828',
        marginBottom: 12,
    },
    retryButton: 
    {
        backgroundColor: PRIMARY,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: 
    {
        color: '#fff',
        fontWeight: '600',
    },
    bannerWrapper: 
    {
        width: '100%',
        backgroundColor: '#ddd',
        height: 170,
        marginBottom: 56,
    },
    banner: 
    {
        width: '100%',
        height: '100%',
    },
    avatar: 
    {
        position: 'absolute',
        bottom: -48,
        left: 20,
        width: 110,
        height: 110,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#fff',
        backgroundColor: '#eee',
    },
    headerBlock: 
    {
        paddingHorizontal: 20,
        marginBottom: 28,
    },
    name: 
    {
        fontSize: 24,
        fontWeight: '700',
        color: PRIMARY,
    },
    email: 
    {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    phone: 
    {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
        marginBottom: 14,
    },
    editButton: 
    {
        backgroundColor: PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    editButtonText: 
    {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    section: 
    {
        paddingHorizontal: 20,
    },
    sectionTitle: 
    {
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY,
        marginBottom: 14,
    },
    actionCard: 
    {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    actionImage: 
    {
        width: 90,
        height: 90,
        backgroundColor: '#ccc',
    },
    actionInfo: 
    {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    actionTitle: 
    {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    actionMeta: 
    {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    separator: 
    {
        height: 12,
    },
    emptyText: 
    {
        fontSize: 13,
        color: '#777',
        fontStyle: 'italic',
    },
    backButton:
    {
        position: 'absolute',
        top: 16,
        left: 16,
        color: PRIMARY,
        fontWeight: 'bold',
        zIndex: 10,
    },
    backButtonText:
    {
        fontSize: 35,
        color: PRIMARY,
        fontWeight: '500',
    },
});
