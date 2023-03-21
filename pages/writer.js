import { useState, useEffect } from "react";
import css from './css/writer.module.css'
import Head from "next/head";
import Link from 'next/link'
import Footer from '../components/footer';
import DiffMatchPatch from "diff-match-patch";
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { validateAndSanitizePrompt } from '../components/utils';
import { fetchWithTimeout } from '../components/utils';
import { prettyHtml } from '../components/utils';

config.autoAddCss = false;

export default function Writer() {

    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Loading");
    const [highlightedInput, setHighlightedInput] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const dmp = new DiffMatchPatch();

    useEffect(() => {
        if (textInput && textOutput) {
            const diffs = dmp.diff_main(textInput, textOutput);
            dmp.diff_cleanupSemantic(diffs);
            const highlighted = prettyHtml(diffs);
            setHighlightedInput(highlighted);
        } else {
            setHighlightedInput(textInput);
        }
    }, [textInput, textOutput]);

    useEffect(() => {
        let timer;

        if (isLoading) {
            timer = setInterval(() => {
                setLoadingText((prevLoadingText) => {
                    if (prevLoadingText.length >= 10) {
                        return "Loading";
                    } else {
                        return prevLoadingText + ".";
                    }
                });
            }, 350);
        } else {
            setLoadingText("Loading");
        }

        return () => clearInterval(timer);
    }, [isLoading]);

    async function onGenerate(prompt) {
        try {
            setIsButtonDisabled(true);
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const sanitizedPrompt = validateAndSanitizePrompt(prompt);

            const response = await fetchWithTimeout("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: sanitizedPrompt }),
            }, 10000);

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setTextInput(data.result.trim());
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
            setIsButtonDisabled(false);
        }
    }



    async function onSubmit(event, prompt) {
        event.preventDefault();

        if (textInput.trim() === "") {
            return;
        }

        try {
            setIsButtonDisabled(false);
            setIsLoading(true);
            const generatedPrompt = validateAndSanitizePrompt(prompt + textInput);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await fetchWithTimeout("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: generatedPrompt }),
            }, 10000);

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setTextOutput(data.result.trim());
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
            setIsButtonDisabled(false);
        }
    }

    function onInputTextChange(event) {
        setTextInput(event.target.value);
    }

    function onOutputTextChange(event) {
        setTextOutput(event.target.value);
    }

    return (
        <div className={css.writer}>
            <Head>
                <title>Knowtools Writer</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <header>
                <Link href="/" legacyBehavior>
                    <a className={css.backout}> <FontAwesomeIcon icon={faCircleLeft} size='xl' /></a>
                </Link>
                <h1>Writer AI</h1>
            </header>
            <main>
                <form>
                    <div className={css.box}>
                        <textarea
                            type="text"
                            name="input"
                            placeholder="Enter text here..."
                            value={textInput}
                            onChange={onInputTextChange}
                            className={css.result_container}
                        />
                        <div className={css.input_button_box}>
                            <input type="button" value="Paraphrase" className={css.input_button} onClick={(e) => onSubmit(e, "Paraphrase this text for me: ")} disabled={isButtonDisabled} />
                            <input type="button" value="Summarize" className={css.input_button} onClick={(e) => onSubmit(e, "Summarize this text for me: ")} disabled={isButtonDisabled} />
                            <input type="button" value="Grammar Check" className={css.input_button} onClick={(e) => onSubmit(e, "Check and correct the grammar of this text: ")} disabled={isButtonDisabled} />
                            <input
                                type="button"
                                value="Generate Random Text"
                                className={css.input_button}
                                onClick={() =>
                                    onGenerate("Generate a paragraph with 50 words maximum. Use a more descriptive and narrative language. ")
                                }
                            />

                        </div>
                        <textarea
                            type="text"
                            name="output"
                            placeholder="Result will appear here..."
                            value={isLoading ? loadingText : textOutput}
                            onChange={onOutputTextChange}
                            className={css.result_container}
                        />
                    </div>
                    {highlightedInput !== "" &&
                        <div className={css.dmp_box}>
                            {parse(DOMPurify.sanitize(highlightedInput))}
                        </div>
                    }
                    <Footer />
                </form>
            </main>
        </div>
    );
}
