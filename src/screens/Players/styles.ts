import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.gray_600};
    padding: 24px;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray_700};
    flex-direction: row;
    justify-content: center;
    border-radius: 6px;
`;

export const HeaderList = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 32px 0 12px;
`;

export const NumberOfPlayers = styled.Text`
    ${({ theme }) => css`
        color: ${theme.colors.gray_200};
        font-family: ${theme.font_family.bold};
        font-size: ${theme.font_size.sm}px;
    `}
`;