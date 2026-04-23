import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate, useBlocker } from 'react-router-dom';
import { useFormData } from '../context/FormDataContext';
import { API } from '../api/endpoints';
import Stepper from './Stepper';
import SuccessModal from './SuccessModal';
import LeaveConfirmModal from './LeaveConfirmModal';

interface Step3Fields {
  loanAmount: number;
  loanTerm: number;
}

export default function Step3LoanParams() {
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitIntentRef = useRef(false);
  const abortCtrlRef = useRef<AbortController | null>(null);

  const { register, handleSubmit, watch, getValues, formState: { isDirty } } = useForm<Step3Fields>({
    defaultValues: {
      loanAmount: formData.loanAmount ?? 200,
      loanTerm: formData.loanTerm ?? 10,
    },
  });

  const blocker = useBlocker(() => isDirty && !submitIntentRef.current);

  useEffect(() => {
    return () => { abortCtrlRef.current?.abort(); };
  }, []);

  if (!formData.firstName) return <Navigate to="/step1" replace />;
  if (!formData.workplace) return <Navigate to="/step2" replace />;

  const loanAmount = watch('loanAmount');
  const loanTerm = watch('loanTerm');

  const handleBack = () => {
    submitIntentRef.current = true;
    updateFormData(getValues());
    navigate('/step2');
  };

  const onSubmit = async (data: Step3Fields) => {
    abortCtrlRef.current?.abort();
    const controller = new AbortController();
    abortCtrlRef.current = controller;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(API.SUBMIT_LOAN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${formData.firstName} ${formData.lastName}`,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      submitIntentRef.current = true;
      updateFormData(data);
      setShowModal(true);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setSubmitError('Ошибка при отправке заявки. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stepper currentStep={3} />
      <h5 className="mb-4">Шаг 3: Параметры займа</h5>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label mb-0">
              Сумма займа <span className="text-danger">*</span>
            </label>
            <span className="badge bg-primary fs-6">${loanAmount}</span>
          </div>
          <input
            type="range"
            className="form-range"
            min={200}
            max={1000}
            step={100}
            {...register('loanAmount', { required: true, valueAsNumber: true })}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>$200</span>
            <span>$1000</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label mb-0">
              Срок займа <span className="text-danger">*</span>
            </label>
            <span className="badge bg-primary fs-6">{loanTerm} дней</span>
          </div>
          <input
            type="range"
            className="form-range"
            min={10}
            max={30}
            step={1}
            {...register('loanTerm', { required: true, valueAsNumber: true })}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>10 дней</span>
            <span>30 дней</span>
          </div>
        </div>

        {submitError && <div className="alert alert-danger">{submitError}</div>}

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            ← Назад
          </button>
          <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Отправка...
              </>
            ) : (
              'Подать заявку'
            )}
          </button>
        </div>
      </form>

      <SuccessModal
        show={showModal}
        firstName={formData.firstName ?? ''}
        lastName={formData.lastName ?? ''}
        loanAmount={loanAmount}
        loanTerm={loanTerm}
        onClose={() => setShowModal(false)}
      />

      {blocker.state === 'blocked' && (
        <LeaveConfirmModal
          onStay={() => blocker.reset()}
          onLeave={() => blocker.proceed()}
        />
      )}
    </>
  );
}
