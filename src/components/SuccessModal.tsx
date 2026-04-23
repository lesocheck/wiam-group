interface SuccessModalProps {
  show: boolean;
  firstName: string;
  lastName: string;
  loanAmount: number;
  loanTerm: number;
  onClose: () => void;
}

export default function SuccessModal({
  show,
  firstName,
  lastName,
  loanAmount,
  loanTerm,
  onClose,
}: SuccessModalProps) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1050 }} />
      <div
        className="modal show d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1055 }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header bg-success text-white border-0">
              <h5 className="modal-title">Заявка одобрена!</h5>
            </div>
            <div className="modal-body text-center py-4">
              <p className="fs-5 mb-2">
                Поздравляем,{' '}
                <strong>
                  {lastName} {firstName}
                </strong>
                .
              </p>
              <p className="fs-5 mb-0">
                Вам одобрена{' '}
                <strong className="text-success">${loanAmount}</strong> на{' '}
                <strong>{loanTerm}</strong> дней.
              </p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
