const WarningModal = ({ text, action, exit }: { text: string, action: () => void, exit: () => void }) => {
    return (
        <div>
            {text}
        </div>
    )
};

export default WarningModal;