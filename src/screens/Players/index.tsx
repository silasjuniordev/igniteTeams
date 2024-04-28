import { useState } from "react"
import { FlatList } from "react-native"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { ButtonIcon } from "@components/ButtonIcon"
import { Input } from "@components/Input"
import { Filter } from "@components/Filter"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"

import { 
    Container, 
    Form, 
    HeaderList, 
    NumberOfPlayers 
} from "./styles"
import { Button } from "@components/Button"

export function Players() {
    const [ team, setTeam ] = useState('TIME A');
    const [ players, setPlayers ] = useState([]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title="Nome da turma"
                subtitle="adicione os players da turma"
            />

            <Form>
                <Input 
                    placeholder="Nome do Player"
                    autoCorrect={false}
                />

                <ButtonIcon 
                    icon="add"
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

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => {}}
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

            <Button 
                title="Remover turma"
                type="secondary"
            />
        </Container>
    )
}