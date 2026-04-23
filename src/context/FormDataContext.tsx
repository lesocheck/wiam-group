import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LoanFormData } from '../types';

interface FormDataContextType {
  formData: Partial<LoanFormData>;
  updateFormData: (data: Partial<LoanFormData>) => void;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<LoanFormData>>({
    loanAmount: 200,
    loanTerm: 10,
  });

  const updateFormData = useCallback((data: Partial<LoanFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const contextValue = useMemo(
    () => ({ formData, updateFormData }),
    [formData, updateFormData]
  );

  return (
    <FormDataContext.Provider value={contextValue}>
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormData(): FormDataContextType {
  const context = useContext(FormDataContext);
  if (!context) throw new Error('useFormData must be used within FormDataProvider');
  return context;
}
