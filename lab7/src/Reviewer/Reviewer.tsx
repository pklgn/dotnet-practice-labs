import Button from "../Common/Button/Button";
import Textarea from "../Common/Textarea/Textarea";
import Grade from "./Grade/Grade";

function Reviewer() {
    return (
        <div className="reviewer">
            <form className="reviewer__form">
                <h1>
                    // TODO: add l10n
                    How nice was my reply?
                </h1>
                <Grade />
                <Textarea />
                <Button text="Send"/>
            </form>
            <Review />
        </div>
    )
}

export default Reviewer;