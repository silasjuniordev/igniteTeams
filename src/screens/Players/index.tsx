import { useEffect, useRef, useState } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { ButtonIcon } from "@components/ButtonIcon"
import { Input } from "@components/Input"
import { Filter } from "@components/Filter"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AppError } from "@utils/AppError"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndteam"
import { PlayerStorageDTO } from "@storage/player/playerstorageDTO"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"
import { Loading } from "@components/Loading"

import { 
    Container, 
    Form, 
    HeaderList, 
    NumberOfPlayers 
} from "./styles"

type RouteParams = {
    group: string
}

export function Players() {
    const [ isLoading, setIsLoding ] = useState(true)
    const [ team, setTeam ] = useState('TIME A');
    const [ newPlayerName, setNewPlayerName ] = useState('');
    const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([]);
    const newPlayerNameInputRef = useRef<TextInput>(null)
    const route = useRoute()
    const { group } = route.params as RouteParams
    const navigation = useNavigation()

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
            fetchPlayersByTeam()           
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar')
                console.log(error)
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoding(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            
            setPlayers(playersByTeam)

        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
        } finally {
            setIsLoding(false)
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            console.log(error)
            Alert.alert('Remover turma', 'Não foi possível remover a turma')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title={group}
                subtitle="adicione os players da turma"
            />

            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome do Player"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList 
                    data={['TIME A', 'TIME B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {
                isLoading ? <Loading /> :

                <FlatList 
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard 
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty 
                            message="Não há jogadores nesse time."
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }

            <Button 
                title="Remover turma"
                type="secondary"
                onPress={handleGroupRemove}
            />
        </Container>
    )
}