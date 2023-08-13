import './HelpBox.css';

function HelpBox() {
    return (
        <div
            className="helpBox"
        >
            <h2>
                How to Use
            </h2>
            <p>
                Use the number keys on your keyboard to input values. Values without a decimal
                point are assumed to be in pence. To count in pounds, add two zeros or a decimal
                point at the end of your input.
            </p>
            <p>
                Use the + key to add to your total, and the - key to subtract from your total.
                When you're ready to calculate your total press the enter key.
            </p>
            <p>
                To clear the current input, use the c key. Press it twice to clear your running
                total and show a clear operation on the output list.
            </p>
            <p>
                To insert blank space on the output list, use the f key. To tear off your add
                list, use the t key.
            </p>
            <p>
                You can format your output list by inputting a number and using the # key.
            </p>
            <p>
                You can print your output list using the p key.
            </p>
        </div>
    );
}

export default HelpBox;
