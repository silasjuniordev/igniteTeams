import LogoImg from '@assets/Logo.png'

import { 
    Container, 
    Logo, 
    BackButton, 
    BackIcon 
} from "./styles";
import { useNavigation } from '@react-navigation/native';

type Props = {
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
    const navigation = useNavigation()

    function handleGoBackHome() {
        navigation.navigate('groups')
    }

    return (
        <Container>
            {
            showBackButton &&
                <BackButton
                    onPress={handleGoBackHome}
                >
                    <BackIcon />
                </BackButton>
            }
            <Logo source={LogoImg} />
        </Container>
    )
}