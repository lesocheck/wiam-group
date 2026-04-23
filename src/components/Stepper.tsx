const STEPS = ['Личные данные', 'Адрес и работа', 'Параметры займа'];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="d-flex align-items-start mb-4">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const done = step < currentStep;
        const active = step === currentStep;

        return (
          <div key={label} className="d-flex align-items-center flex-grow-1">
            <div className="d-flex flex-column align-items-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                  done
                    ? 'bg-success text-white'
                    : active
                    ? 'bg-primary text-white'
                    : 'bg-light text-secondary border'
                }`}
                style={{ width: 36, height: 36, flexShrink: 0 }}
              >
                {done ? '✓' : step}
              </div>
              <small
                className={`mt-1 text-center ${active ? 'text-primary fw-semibold' : 'text-muted'}`}
                style={{ fontSize: '0.68rem', maxWidth: 72 }}
              >
                {label}
              </small>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className="flex-grow-1 mx-1 mb-4"
                style={{
                  height: 2,
                  backgroundColor: done ? '#198754' : '#dee2e6',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
