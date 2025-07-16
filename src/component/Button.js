// Button.jsx
export default function Button({ onAdd }) {
    return (
    <button type="button" onClick={onAdd} className="button">
        Add
    </button>
    );
}
