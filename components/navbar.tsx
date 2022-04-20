import styles from '../styles/components/navbar.module.scss';
import Link from 'next/link';
import Styled from 'styled-components';

const MoveDiv = Styled.div`
    width:100% !important;
    justify-content:center;
    h1 {
        width:min-content;
    }
    @media (max-width: 1000px) {
        width:initial !important;
        width:min-content !important;
    }
`;

interface propsInput {
    page: string;
}

export default function NavBar(props: propsInput) {
    return (
        <div className={styles.navbarSizer}>
            <div className={styles.Root}>
                <div className={styles.Internal}>
                    <span>
                        <MoveDiv>
                            <Link href="/" passHref>
                                <a>
                                    <h1>
                                        Rovolution
                                        <span className={styles.BlueText}>Logistics</span>
                                    </h1>
                                </a>
                            </Link>
                        </MoveDiv>
                    </span>
                    <div>
                        <Link href="https://status.rovolution.me">
                            <a className={props.page === '' ? styles.active : ''}>Rovolution Status</a>
                        </Link>
                        <Link href="https://logistics.rovolution.me">
                            <a className={props.page === 'asdasfsaf' ? styles.active : ''}>Rovolution Logistics</a>
                        </Link>
                        <Link href="https://www.rovolution.me">
                            <a className={props.page === 'asdsadsa' ? styles.active : ''}>Rovolution Mainsite</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
