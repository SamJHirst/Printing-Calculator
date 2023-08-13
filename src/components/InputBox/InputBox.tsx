import './InputBox.css';

interface InputBoxProps {
    value: string;
}

function InputBox({ value }: InputBoxProps) {
    return (
        <div
            className="inputBox"
        >
            {
                value
            }
        </div>
    );
}

export default InputBox;
