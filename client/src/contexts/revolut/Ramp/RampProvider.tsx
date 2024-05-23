import React, { useEffect, useState, ReactNode } from 'react'
import { useContractRead } from 'wagmi'

import { esl, CALLER_ACCOUNT, ZERO } from '@helpers/constants'
import useSmartContracts from '@hooks/useSmartContracts';

import RampContext from './RampContext'


interface ProvidersProps {
  children: ReactNode;
}

const RampProvider = ({ children }: ProvidersProps) => {
  /*
   * Contexts
   */

  const { revolutRampAddress, revolutRampAbi } = useSmartContracts();

  /*
   * State
   */

  const [minimumDepositAmount, setMinimumDepositAmount] = useState<bigint | null>(null);
  const [maximumOnRampAmount, setMaximumOnRampAmount] = useState<bigint | null>(null);
  const [depositCounter, setDepositCounter] = useState<bigint | null>(null);
  const [onRampCooldownPeriod, setOnRampCooldownPeriod] = useState<bigint | null>(null);

  const [shouldFetchRampState, setShouldFetchRampState] = useState<boolean>(false);

  /*
   * Contract Reads
   */

  // uint256 public minDepositAmount;
  const {
    data: minimumDepositAmountRaw,
  } = useContractRead({
    address: revolutRampAddress,
    abi: revolutRampAbi,
    functionName: 'minDepositAmount',
    enabled: shouldFetchRampState,
    account: CALLER_ACCOUNT
  })

  // uint256 public maxOnRampAmount;
  const {
    data: maximumOnRampAmountRaw,
  } = useContractRead({
    address: revolutRampAddress,
    abi: revolutRampAbi,
    functionName: 'maxOnRampAmount',
    enabled: shouldFetchRampState,
    account: CALLER_ACCOUNT
  })

  // uint256 public depositCounter;
  const {
    data: depositCounterRaw,
    refetch: refetchDepositCounter,
  } = useContractRead({
    address: revolutRampAddress,
    abi: revolutRampAbi,
    functionName: 'depositCounter',
    enabled: shouldFetchRampState,
    account: CALLER_ACCOUNT
  })

  // uint256 public onRampCooldownPeriod;
  const {
    data: onRampCooldownPeriodRaw,
  } = useContractRead({
    address: revolutRampAddress,
    abi: revolutRampAbi,
    functionName: 'onRampCooldownPeriod',
    enabled: shouldFetchRampState,
    account: CALLER_ACCOUNT
  })

  /*
   * Hooks
   */

  useEffect(() => {
    esl && console.log('revolut_shouldFetchRampState_1');
    esl && console.log('checking revolutRampAddress: ', revolutRampAddress);

    if (revolutRampAddress) {
      esl && console.log('revolut_shouldFetchRampState_2');

      setShouldFetchRampState(true);
    } else {
      esl && console.log('revolut_shouldFetchRampState_3');

      setShouldFetchRampState(false);

      setMinimumDepositAmount(null);
      setDepositCounter(null);
    }
  }, [revolutRampAddress]);

  useEffect(() => {
    esl && console.log('revolut_minDepositAmountRaw_1');
    esl && console.log('checking minimumDepositAmountRaw: ', minimumDepositAmountRaw);
  
    if (minimumDepositAmountRaw) {
      esl && console.log('revolut_minDepositAmountRaw_2');

      const minimumDepositAmountProcessed = (minimumDepositAmountRaw as bigint);
      
      setMinimumDepositAmount(minimumDepositAmountProcessed);
    } else {
      esl && console.log('revolut_minDepositAmountRaw_3');

      setMinimumDepositAmount(null);
    }
  }, [minimumDepositAmountRaw]);

  useEffect(() => {
    esl && console.log('revolut_maxOnRampAmountRaw_1');
    esl && console.log('checking maximumOnRampAmountRaw: ', maximumOnRampAmountRaw);
  
    if (maximumOnRampAmountRaw) {
      esl && console.log('revolut_maxOnRampAmountRaw_2');

      const maximumOnRampAmountProcessed = (maximumOnRampAmountRaw as bigint);
      
      setMaximumOnRampAmount(maximumOnRampAmountProcessed);
    } else {
      esl && console.log('revolut_maxOnRampAmountRaw_3');

      setMaximumOnRampAmount(null);
    }
  }, [maximumOnRampAmountRaw]);

  useEffect(() => {
    esl && console.log('revolut_depositCounterRaw_1');
    esl && console.log('checking depositCounterRaw: ', depositCounterRaw);
  
    if (depositCounterRaw || depositCounterRaw === ZERO) { // BigInt(0) is falsy)
      esl && console.log('revolut_depositCounterRaw_2');
      
      setDepositCounter(depositCounterRaw as bigint);
    } else {
      esl && console.log('revolut_depositCounterRaw_3');
      
      setDepositCounter(null);
    }
  }, [depositCounterRaw]);

  useEffect(() => {
    esl && console.log('revolut_onRampCooldownPeriodRaw_1');
    esl && console.log('checking onRampCooldownPeriodRaw: ', onRampCooldownPeriodRaw);
  
    if (onRampCooldownPeriodRaw || onRampCooldownPeriodRaw === ZERO) { // BigInt(0) is falsy)
      esl && console.log('revolut_onRampCooldownPeriodRaw_2');
      
      setOnRampCooldownPeriod(onRampCooldownPeriodRaw as bigint);
    } else {
      esl && console.log('revolut_onRampCooldownPeriodRaw_3');
      
      setOnRampCooldownPeriod(null);
    }
  }, [onRampCooldownPeriodRaw]);

  return (
    <RampContext.Provider
      value={{
        minimumDepositAmount,
        maximumOnRampAmount,
        depositCounter,
        onRampCooldownPeriod,
        refetchDepositCounter,
        shouldFetchRampState
      }}
    >
      {children}
    </RampContext.Provider>
  );
};

export default RampProvider
