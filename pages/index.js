import React, { useState } from 'react';
import css from './css/index.module.css'
import Link from 'next/link'
import Head from "next/head";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/footer';

config.autoAddCss = false;
const version = "v.1.1"

export default function App() {

    const [items, setItems] = useState([
        { id: 1, name: <>Writer <FontAwesomeIcon icon={faPencil} size='sm' /></>, description: 'Paraphrase, Summarize and Grammar Check', url: '/writer' },
        { id: 2, name: <>Username Generator <FontAwesomeIcon icon={faUser} size='sm' /></>, description: 'Generate unique usernames with a category selection', url: '/username-generator' },
        /*
        { id: 2, name: 'Item 2', description: 'This is item 2', url: '/item2' },
        { id: 3, name: 'Item 3', description: 'This is item 3', url: '/item3' },
        { id: 4, name: 'Item 4', description: 'This is item 4', url: '/item4' },
         */
    ]);

    return (
        <div className={css.index}>
            <Head>
                <title>Knowtools</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <main>
                <nav>
                    <menu>
                        <div>
                            <li>Knowtools <span className={css.version}>{version}</span></li>
                            <li>AI-Powered Tools <FontAwesomeIcon icon={faRobot} size='sm' /></li>
                        </div>
                        <div>
                            <Link href='/login' legacyBehavior>
                                <a id='login'>Login</a>
                            </Link>
                            <Link href='/signup' legacyBehavior>
                                <a id='signup'>Sign Up</a>
                            </Link>
                        </div>
                    </menu>
                </nav>
                <div className={css.container_box}>
                    {items.map((item) => (
                        <Card key={item.id} name={item.name} description={item.description} url={item.url} />
                    ))}

                </div>
                <Footer />
            </main>

        </div>
    );
}

function Card({ name, description, url }) {
    return (
        <Link href={url} legacyBehavior>
            <div className={css.card}>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </Link>
    );
}

