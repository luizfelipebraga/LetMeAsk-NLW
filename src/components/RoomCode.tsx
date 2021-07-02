import copyImg from '../assets/images/copy.svg';

import styles from '../styles/components/roomCode.module.scss';

type RoomCodeProps = {
    code: string;
}

export default function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}> 
            <div>
                <img src={copyImg} alt="Copiar código" />
            </div>
            <span>Sala {props.code}</span>
        </button>
    )
}
