import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import { 
    Container, 
    Icon, 
    ButtonIconTypeStyleProps 
} from "./styles";

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({ icon, type = 'primary', ...rest }: Props) {
    return (
        <Container
            {...rest}
            type={type}
        >
            <Icon 
                name={icon} 
                type={type} />
        </Container>
    )
}