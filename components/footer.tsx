import styles from '../styles/components/footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={styles.footerMain}>
            <div>
                <h1>
                    Rovolution<span className={styles.BlueText}>Logistics</span>
                </h1>
                <p>RovolutionLogistics is owned and managed by Rovolution.</p>
                <Link href="https://www.rovolution.me" passHref>
                    <a target="_blank" rel="noreferrer">
                        <div className={styles.footerImages}>
                            <Image src="/Banner.png" alt="Logo" layout="fill" />
                        </div>
                    </a>
                </Link>
            </div>
            <div>
                <h2>Links</h2>
                <ul>
                    <li>
                        <Link href="/preview">
                            <a>Preview</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.rovolution.me/PrivacyPolicy" passHref>
                            <a target="_blank" rel="noreferrer">
                                Privacy Policy
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h2>About Rovolution Logistics</h2>
                <p>
                    Rovolution Logistics is a part of the Rovolution entity and handles everything from event hosting to forms to give
                    Roblox groups a greater control over their group with a professional feel.
                </p>
                <p className={styles.greyText}>GeraldIn2016 ©2020-2022</p>
            </div>
        </div>
    );
}
