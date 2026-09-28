function Popup({ message, type = "success", onClose }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-box ${type}`}>
        <div className="popup-icon">
          {type === "success"
            ? "💗"
            : type === "error"
            ? "❌"
            : "⚠️"}
        </div>

        <h3>
          {type === "success"
            ? "Success!"
            : type === "error"
            ? "Oops!"
            : "Notice"}
        </h3>

        <p>{message}</p>

        <button onClick={onClose} className="popup-button">
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;