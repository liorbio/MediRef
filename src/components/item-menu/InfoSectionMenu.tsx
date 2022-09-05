const InfoSectionMenu = ({ title, handler }: { title: string, handler: () => void }) => {
    
    // 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠
    // THINK OF A SMART WAY TO ALLOW FOR ADDITION OF INPUTS
    // 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠

    return (
        <>
            <h3>{title}</h3>
            <div>
                <input type="text" placeholder='מק"ט' />
                <input type="text" placeholder='שם' />
                <div>+</div>
            </div>
        </>
    )
};

export default InfoSectionMenu;