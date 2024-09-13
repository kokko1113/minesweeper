import "./ResultScene.css"

export default function ResultScene({ message }) {
    return (
        <>
            <div className="result">
                <h1>{message}</h1>
                <button onClick={() => window.location.reload()}>リプレイ</button>
            </div>
        </>
    )
}