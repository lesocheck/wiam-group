import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import type { Ref } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { useFormData } from '../context/FormDataContext';
import Stepper from './Stepper';
import LeaveConfirmModal from './LeaveConfirmModal';

interface Step1Fields {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export default function Step1PersonalData() {
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  const submitIntentRef = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<Step1Fields>({
    defaultValues: {
      phone: formData.phone ?? '',
      firstName: formData.firstName ?? '',
      lastName: formData.lastName ?? '',
      gender: formData.gender ?? '',
    },
  });

  const blocker = useBlocker(() => isDirty && !submitIntentRef.current);

  const onSubmit = (data: Step1Fields) => {
    submitIntentRef.current = true;
    updateFormData(data);
    navigate('/step2');
  };

  return (
    <>
      <Stepper currentStep={1} />
      <h5 className="mb-4">Шаг 1: Личные данные</h5>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Телефон <span className="text-danger">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Обязательное поле',
              validate: (v) => {
                if (v.replace(/\s/g, '').length !== 10) return 'Введите полный номер телефона';
                if (!v.startsWith('0')) return 'Номер должен начинаться с 0';
                return true;
              },
            }}
            render={({ field }) => (
              <IMaskInput
                id="phone"
                mask="0000 000 000"
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={field.value}
                onAccept={(value: string) => field.onChange(value)}
                inputRef={field.ref as Ref<HTMLInputElement>}
                placeholder="0XXX XXX XXX"
              />
            )}
          />
          {errors.phone && (
            <div className="invalid-feedback d-block">{errors.phone.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Имя <span className="text-danger">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            {...register('firstName', {
              required: 'Обязательное поле',
              minLength: { value: 2, message: 'Минимум 2 символа' },
            })}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Фамилия <span className="text-danger">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            {...register('lastName', {
              required: 'Обязательное поле',
              minLength: { value: 2, message: 'Минимум 2 символа' },
            })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="form-label">
            Пол <span className="text-danger">*</span>
          </label>
          <select
            id="gender"
            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
            {...register('gender', { required: 'Обязательное поле' })}
          >
            <option value="">Выберите...</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary px-4">
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
