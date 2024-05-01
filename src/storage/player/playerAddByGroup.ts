import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./playerstorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group)

        const playerAlreadyExists = storedPlayers.some(player => player.name === newPlayer.name)

        if(playerAlreadyExists) {
            throw new AppError('Essa pessoa já foi adicionada em um time aqui.')
        }

        const storage = JSON.stringify([ ...storedPlayers, newPlayer ])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
        
    } catch (error) {
        throw error
    }
}