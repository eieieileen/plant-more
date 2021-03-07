import Registration from "./registration";
import Logo from "./logo";
import Footer from "./footer";

export default function Welcome() {
    return (
        <div id="welcomePage">
            <Logo />
            <h1 id="h1Welcome">TACO NETWORK</h1>
            <Registration />
            <Footer />
        </div>
    );
}
