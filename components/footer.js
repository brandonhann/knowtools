import css from '../pages/css/global.module.css'

export default function Footer() {
    return (
        <footer className={css.footer}>
            <p>Copyright &copy; Knowtools 2023. All rights reserved.</p>
            <p>Developed by <a href="https://github.com/brandonhann" target='_blank'>Brandon Hann</a> | Powered by <a href="https://openai.com/" target='_blank'>OpenAI</a></p>
        </footer>
    );
}