import Styled from 'styled-components';
import Footer from '../components/footer/footer';
import NavBar from '../components/navbar';
import Image from 'next/image';
import { GlobalMetaTags } from '../components/globalMetaTags';

const RootDiv = Styled.div`
    & > div > h1 {
        text-align:center;
        font-size:60px;
    }

`;
const Bigger = Styled.h1`
    
    font-size:60px;

`;
const NotFoundDiv = Styled.div`
    text-align:center;
    min-height:80vh;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    @media (max-width: 780px) {
        flex-direction:column;
    }
`;

const ImageDiv = Styled.div`
    position: relative;
    width: 30%;
    height: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    bottom: 0;
    flex-grow: 2;
    @media (max-width: 780px) {
        width:80%;
    }
`;

let SecondDiv = Styled.div`
    max-width:60%;
    padding:10px;
`;

export default function ErrorPageNotFound() {
    return (
        <RootDiv>
            <NavBar page={''} />
            <GlobalMetaTags title={'RovolutionLogistics - Not Found'} description={''} />
            <NotFoundDiv>
                <ImageDiv>
                    <Image src={`/PreviewAssets/Help.png`} alt="user" priority layout="fill" />
                </ImageDiv>
                <SecondDiv>
                    <Bigger>You seem to be lost!</Bigger>
                    <h3>
                        You have attempted to access a page that does not exist! Are you meant to be somewhere else, if you were sent this
                        link make sure you fully copied it and it was typed correctly!
                    </h3>
                    <pre>Error 404</pre>
                </SecondDiv>
            </NotFoundDiv>
            <Footer />
        </RootDiv>
    );
}
