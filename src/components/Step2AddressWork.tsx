import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate, useBlocker } from 'react-router-dom';
import { useFormData } from '../context/FormDataContext';
import { useCategories } from '../hooks/useCategories';
import Stepper from './Stepper';
import LeaveConfirmModal from './LeaveConfirmModal';

interface Step2Fields {
  workplace: string;
  address: string;
}

export default function Step2AddressWork() {
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();

  const submitIntentRef = useRef(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<Step2Fields>({
    defaultValues: {
      workplace: formData.workplace ?? '',
      address: formData.address ?? '',
    },
  });

  const blocker = useBlocker(() => isDirty && !submitIntentRef.current);

  if (!formData.firstName) return <Navigate to="/step1" replace />;

  const handleBack = () => {
    submitIntentRef.current = true;
    updateFormData(getValues());
    navigate('/step1');
  };

  const onSubmit = (data: Step2Fields) => {
    submitIntentRef.current = true;
    updateFormData(data);
    navigate('/step3');
  };

  return (
    <>
      <Stepper currentStep={2} />
      <h5 className="mb-4">Шаг 2: Адрес и место работы</h5>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="workplace" className="form-label">
            Место работы <span className="text-danger">*</span>
          </label>

          <select
            id="workplace"
            className={`form-select ${errors.workplace ? 'is-invalid' : ''}`}
            disabled={loading}
            {...register('workplace', { required: 'Обязательное поле' })}
          >
            <option value="">
              {loading ? 'Загрузка...' : error ? 'Ошибка загрузки' : 'Выберите...'}
            </option>
            {!loading && !error && categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {error && <div className="text-danger small mt-1">{error}</div>}
          {errors.workplace && (
            <div className="invalid-feedback d-block">{errors.workplace.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="form-label">
            Адрес проживания <span className="text-danger">*</span>
          </label>
          <input
            id="address"
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder="ул. Примерная, д. 1, кв. 2"
            {...register('address', {
              required: 'Обязательное поле',
              minLength: { value: 5, message: 'Введите полный адрес (минимум 5 символов)' },
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleBack}
          >
            ← Назад
          </button>
          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            Далее →
          </button>
        </div>
      </form>

      {blocker.state === 'blocked' && (
        <LeaveConfirmModal
          onStay={() => blocker.reset()}
          onLeave={() => blocker.proceed()}
        />
      )}
    </>
  );
}
