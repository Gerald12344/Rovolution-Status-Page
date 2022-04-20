import styled from 'styled-components';

interface propsIn {
    title?: string;
    textcolor: string;
    backgroundImage: string;
}

const Title = styled.h1<propsIn>`
    background-image: url(${(props) => props.backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    margin: 0;
    padding: ${(props) => (props.backgroundImage === '' || props.backgroundImage === null ? '0px' : '20px')};
    min-height: ${(props) => (props.backgroundImage === '' || props.backgroundImage === null ? '0px' : '2em')};
    color: ${(props) => props.textcolor};
    box-shadow: 0px 0px 10px #34495e;
    text-align: center;
    font-size: 4em;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);
`;

export default function MainFormTitle(props: propsIn) {
    return (
        <Title backgroundImage={props.backgroundImage ?? ''} textcolor={props.textcolor}>
            {props.title}
        </Title>
    );
}
