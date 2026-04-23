interface LeaveConfirmModalProps {
  onStay: () => void;
  onLeave: () => void;
}

export default function LeaveConfirmModal({ onStay, onLeave }: LeaveConfirmModalProps) {
  return (
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1050 }} />
      <div
        className="modal show d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1055 }}
        onClick={onStay}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">Несохранённые данные</h5>
            </div>
            <div className="modal-body">
              Вы заполнили некоторые поля, но они не будут сохранены. Уйти со страницы?
            </div>
            <div className="modal-footer border-0 gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={onStay}>
                Остаться
              </button>
              <button type="button" className="btn btn-danger" onClick={onLeave}>
                Уйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
