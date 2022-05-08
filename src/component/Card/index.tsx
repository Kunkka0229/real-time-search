import './index.css';

export default function Index({ cardInfo }) {
    const { qlogo, name, qq } = cardInfo;
    return (
        <div className="res-container">
            <img className="logo" src={qlogo} alt={name} />
            <div className="content">
                <div className="name">{name}</div>
                <div className="code">{qq}</div>
            </div>
        </div>
    );
}
