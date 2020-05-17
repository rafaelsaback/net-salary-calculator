import { SalaryInputContainer } from '../../components/salary-input-container';
import { ContractSelector } from '../../components/contract-selector';
import React from 'react';

export const HomeScreen: React.FC = () => (
  <>
    <SalaryInputContainer />
    <ContractSelector />
  </>
);
