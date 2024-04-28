import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { UsersThree } from 'phosphor-react-native'

export const Container = styled(TouchableOpacity)`
    width: 100%;
    height: 90px;
    background-color: ${({ theme }) => theme.colors.gray_500};
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
    padding: 24px;
    margin-bottom: 12px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.font_size.md}px;
        color: ${theme.colors.gray_200};
        font-family: ${theme.font_family.regular};
    `}
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
    size: 32,
    color: theme.colors.green_700,
    weight: 'fill'
}))`
    margin-right: 20px;
`;