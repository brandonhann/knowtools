import Head from "next/head";
import Link from 'next/link'
import css from './css/username-generator.module.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false;

export default function Username() {
    return (
        <div className={css.username_generator}>
            <Head>
                <title>Knowtools User Generator</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <header>
                <Link href="/" legacyBehavior>
                    <a className={css.backout}> <FontAwesomeIcon icon={faCircleLeft} size='xl' /></a>
                </Link>
                <h1>Username Generator</h1>
            </header>
            <main>
                <form>
                    <div className={css.box}>
                        <div className={css.leftColumn}>
                            <label htmlFor="textInput">Include word:</label>
                            <input type="text" id="textInput" name="textInput" className={css.formInput} />

                            <label htmlFor="rangeInput">Syllables:</label>
                            <input type="range" id="rangeInput" name="rangeInput" min="1" max="5" className={css.formInputRange} />

                            <label htmlFor="dropdownInput">Category:</label>
                            <select id="dropdownInput" name="dropdownInput" className={css.formInput}>
                                <option value="fantasy">Fantasy</option>
                                <option value="happy">Happy</option>
                                <option value="instagram">Instagram</option>
                            </select>
                        </div>

                        <div className={css.rightColumn}>
                            <label>Checkbox inputs:</label>

                            <div className={css.checkboxContainer}>
                                <input type="checkbox" id="checkbox1" name="checkbox1" />
                                <label htmlFor="checkbox1">Capitalization</label>
                            </div>
                            <div className={css.checkboxContainer}>
                                <input type="checkbox" id="checkbox2" name="checkbox2" />
                                <label htmlFor="checkbox2">Underscore</label>
                            </div>
                            <div className={css.checkboxContainer}>
                                <input type="checkbox" id="checkbox3" name="checkbox3" />
                                <label htmlFor="checkbox3">Numbers</label>
                            </div>
                        </div>
                    </div>
                    <div className={css.buttonContainer}>
                        <input type="button" value="Generate" className={`${css.input_button} ${css.formInput}`} />
                        <input
                            type="text"
                            name="output"
                            placeholder="Result will appear here..."
                            className={`${css.result_container} ${css.formInput}`}
                            readOnly
                        />
                    </div>
                </form>
            </main>

        </div>
    );
}