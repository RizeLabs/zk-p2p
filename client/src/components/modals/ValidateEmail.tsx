import React, { useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { CircuitType } from '@zkp2p/circuits-circom-helpers/generate_input';
import Confetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';

import { Button } from "@components/common/Button";
import { LabeledSwitch } from "@components/common/LabeledSwitch";
import { Overlay } from '@components/modals/Overlay';
import { LabeledTextArea } from '@components/legacy/LabeledTextArea';
import { VerificationStepRow, VerificationState, VerificationStepType } from "@components/modals/VerificationStepRow";
import { commonStrings } from "@helpers/strings";
import { LoginStatus, ProofGenerationStatus } from  "@helpers/types";
import { ThemedText } from '@theme/text';
import { colors } from '@theme/colors';
import useAccount from '@hooks/useAccount';
import useProofGenSettings from "@hooks/useProofGenSettings";
import useSmartContracts from "@hooks/useSmartContracts";
import useMediaQuery from "@hooks/useMediaQuery";
import { Z_INDEX } from '@theme/zIndex';


interface ValidateEmailProps {
  title: string;
  proof: string;
  publicSignals: string;
  onBackClick: () => void
  status: string;
  circuitType: CircuitType;
  buttonTitle: string;
  submitTransactionStatus: string;
  isSubmitMining: boolean;
  isSubmitSuccessful: boolean;
  handleSubmitVerificationClick?: () => void;
  setProofGenStatus?: (status: string) => void;
  onVerifyEmailCompletion?: () => void;
  transactionAddress?: string | null;
  provingFailureErrorCode: number | null;
}

export const ValidateEmail: React.FC<ValidateEmailProps> = ({
  title,
  proof,
  publicSignals,
  onBackClick,
  status,
  circuitType,
  buttonTitle,
  submitTransactionStatus,
  isSubmitMining,
  isSubmitSuccessful,
  transactionAddress,
  setProofGenStatus,
  handleSubmitVerificationClick = () => {},
  onVerifyEmailCompletion,
  provingFailureErrorCode,
}) => {
  /*
   * Context
   */

  const { loginStatus } = useAccount();
  const { isProvingTypeFast } = useProofGenSettings();
  const size = useWindowSize();
  const { blockscanUrl } = useSmartContracts();
  const isMobile = useMediaQuery() === 'mobile';

  /*
   * State
   */

  const [shouldShowProofAndSignals, setShouldShowProofAndSignals] = useState<boolean>(false);

  const [ctaButtonTitle, setCtaButtonTitle] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isSubmitProcessing, setIsSubmitProcessing] = useState<boolean>(false);

  /*
   * Handlers
   */

  const handleOverlayClick = () => {
    onBackClick();
  }

  /*
   * Hooks
   */

  useEffect(() => {
    if (setProofGenStatus) {
      switch (submitTransactionStatus) {
        case "error":
          setProofGenStatus(ProofGenerationStatus.TRANSACTION_CONFIGURED);
          setIsSubmitProcessing(false);
          break;

        case "loading":
          setProofGenStatus(ProofGenerationStatus.TRANSACTION_LOADING);
          setIsSubmitProcessing(true);
          break;

        default:
          setIsSubmitProcessing(false);
          break;
      }
    }
  }, [submitTransactionStatus, setProofGenStatus]);

  useEffect(() => {
    if (isSubmitMining && setProofGenStatus) {
      setProofGenStatus(ProofGenerationStatus.TRANSACTION_MINING);
    }
  }, [isSubmitMining, setProofGenStatus]);

  useEffect(() => {
    if (isSubmitSuccessful && setProofGenStatus) {
      if (process.env.SHOW_CONFETTI === 'true') {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
      setProofGenStatus(ProofGenerationStatus.DONE);
    }
  }, [isSubmitSuccessful, setProofGenStatus])

  useEffect(() => {
    switch (status) {
      case ProofGenerationStatus.TRANSACTION_CONFIGURED:
        setCtaButtonTitle(buttonTitle);
        break;

      case ProofGenerationStatus.TRANSACTION_LOADING:
        setCtaButtonTitle("Signing Transaction");
        break;

      case ProofGenerationStatus.TRANSACTION_MINING:
        setCtaButtonTitle("Mining Transaction");
        break;

      case ProofGenerationStatus.ERROR_FAILED_TO_PROVE:
        switch (provingFailureErrorCode) {
          case 1: // INVALID_EMAIL_TYPE
            setCtaButtonTitle("Validation Failed: Invalid Type");
            break;
          
            case 2: // NOT_SEND_EMAIL
            setCtaButtonTitle("Validation Failed: Invalid Email");
            break;
          
            case 3: // INVALID_DOMAIN_KEY
            setCtaButtonTitle("Validation Failed: Invalid Key");
            break;
            
          case 4: // DKIM_VALIDATION_FAILED
            setCtaButtonTitle("Validation Failed: Invalid Signature");
            break;

          case 5: // NOT_FROM_VENMO
            setCtaButtonTitle("Validation Failed: Invalid Sender");
            break;

          case 6: // INVALID_TEMPLATE
            setCtaButtonTitle("Validation Failed: Invalid Template");
            break;

          case 7: // PROOF_GEN_FAILED
            setCtaButtonTitle("Validation Failed: Proving Errored");
            break;

          case 8: // MERCHANT_SEND_EMAIL
            setCtaButtonTitle("Validation Failed: Invalid Payment");
            break;

          default:
            setCtaButtonTitle("Validation Failed: Try Again Shortly");
            break;
        }
        break;

      case ProofGenerationStatus.DONE:
        switch (circuitType) {
          case CircuitType.EMAIL_VENMO_SEND:
            setCtaButtonTitle('Go to Send');
            break;
    
          case CircuitType.EMAIL_VENMO_REGISTRATION:
          default:
            setCtaButtonTitle('Go to Registration');
        };
        break;

      default:
        setCtaButtonTitle(buttonTitle);
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, buttonTitle]);

  /*
   * Helpers
   */

  const isSubmitVerificationButtonDisabled = useMemo(() => {
    switch (status) {
      case "transaction-configured":
      case "done":
        return false;

      default:
        return true;
    }
  }, [status]);

  const isSubmitVerificationButtonLoading = (): boolean => {
    switch (status) {
      case "transaction-configured":
      case "done":
        return false;
        
      default:
        return loginStatus === LoginStatus.AUTHENTICATED;
    }
  };

  const getButtonHandler = () => {
    switch (status) {
      case "done":
        switch (circuitType) {
          case CircuitType.EMAIL_VENMO_SEND:
            return onVerifyEmailCompletion?.();

          case CircuitType.EMAIL_VENMO_REGISTRATION:
          default:
            return onVerifyEmailCompletion?.();
        }

      default:
        return handleSubmitVerificationClick();
    }
  };

  /*
   * Component
   */

  const renderVerificationSteps = () => {
    let downloadStepState = VerificationState.DEFAULT;
    let uploadStepState = VerificationState.DEFAULT;
    let proveStepState = VerificationState.DEFAULT;
    let submitStepState = VerificationState.DEFAULT;

    switch (status) {
      case "not-started":
      case "generating-input":
      case "downloading-proof-files":
        downloadStepState = VerificationState.LOADING;
        break;

      case "uploading-proof-files":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.LOADING;
        break;

      case "generating-proof":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.COMPLETE;
        proveStepState = VerificationState.LOADING;
        break;

      case "error-failed-to-prove":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.COMPLETE;
        proveStepState = VerificationState.DEFAULT;
        break;

      case "transaction-configured":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.COMPLETE;
        proveStepState = VerificationState.COMPLETE;
        break;

      case "transaction-loading":
      case "transaction-mining":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.COMPLETE;
        proveStepState = VerificationState.COMPLETE;
        submitStepState = VerificationState.LOADING;
        break;

      case "done":
        downloadStepState = VerificationState.COMPLETE;
        uploadStepState = VerificationState.COMPLETE;
        proveStepState = VerificationState.COMPLETE;
        submitStepState = VerificationState.COMPLETE;
        break;
    }

    const verificationStepRows = [];

    if (!isProvingTypeFast) {
      verificationStepRows.push(
        <VerificationStepRow
          key={VerificationStepType.DOWNLOAD}
          type={VerificationStepType.DOWNLOAD}
          progress={downloadStepState}
          circuitType={circuitType}
        />
      );
    }

    if (isProvingTypeFast) {
      verificationStepRows.push(
        <VerificationStepRow
          key={VerificationStepType.UPLOAD}
          type={VerificationStepType.UPLOAD}
          progress={uploadStepState}
          circuitType={circuitType}
        />
      );
    }

    verificationStepRows.push(
      <VerificationStepRow
        key={VerificationStepType.PROVE}
        type={VerificationStepType.PROVE}
        progress={proveStepState}
        circuitType={circuitType}
      />
    );

    verificationStepRows.push(
      <VerificationStepRow
        key={VerificationStepType.SUBMIT}
        type={VerificationStepType.SUBMIT}
        progress={submitStepState}
        circuitType={circuitType}
      />
    );

    return verificationStepRows;
  };

  return (
    <ModalAndOverlayContainer>
      <Overlay />

      {showConfetti ? (
        <ConfettiContainer>
          <Confetti
            recycle={false}
            numberOfPieces={500}
            width={size.width ?? undefined}
            height={document.documentElement.scrollHeight}
          />
        </ConfettiContainer>
      ) : null}
      <ModalContainer>
        <TitleRowContainer>
          <button
            onClick={handleOverlayClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >

            <StyledArrowLeft/>
          </button>

          <Title>
            <ThemedText.HeadlineSmall style={{ flex: '0', textAlign: 'right' }}>
              {!isMobile ? title : 'Verify'}
            </ThemedText.HeadlineSmall>
          </Title>

          {!isMobile ? (
            <LabeledSwitch
              switchChecked={shouldShowProofAndSignals}
              checkedLabel={"Hide"}
              uncheckedLabel={"Show"}
              helperText={commonStrings.get('PROOF_TOOLTIP')}
              onSwitchChange={(checked: boolean) => setShouldShowProofAndSignals(checked)}
            />
          ) : (
            <div></div> // Leave empty div in so title remains centered
          )}
        </TitleRowContainer>

        <VerificationStepsContainer>
          {renderVerificationSteps()}
        </VerificationStepsContainer>

        { shouldShowProofAndSignals && (
          <ProofAndSignalsContainer>
            <LabeledTextArea
              label="Proof Output"
              value={proof}
              disabled={true}
              height={"12vh"} />

            <LabeledTextArea
              label="Public Signals"
              value={publicSignals}
              disabled={true}
              height={"12vh"}
              secret />
          </ProofAndSignalsContainer>
          )
        }

        { transactionAddress?.length ? (
          <Link
            href={`${blockscanUrl}/tx/${transactionAddress}`}
            target="_blank"
            rel="noopener noreferrer">
              <ThemedText.LabelSmall textAlign="left" paddingBottom={"0.75rem"}>
                View on Explorer ↗
              </ThemedText.LabelSmall>
          </Link>
        ) : null}

        <Button
          loading={isSubmitVerificationButtonLoading()}
          disabled={isSubmitVerificationButtonDisabled || isSubmitProcessing}
          onClick={getButtonHandler}
          fullWidth={true}
        >
          {ctaButtonTitle}
        </Button>
      </ModalContainer>
    </ModalAndOverlayContainer>
  );
};

const ModalAndOverlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: flex-start;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX.overlay};
`;

const ModalContainer = styled.div`
  width: 80vw;
  max-width: 412px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.25rem;
  background-color: ${colors.container};
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  gap: 1.3rem;
  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleRowContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.3fr 1.1fr 0.85fr;
  align-items: center;
  justify-content: space-between;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: #FFF;
`;

const Title = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
`;

const VerificationStepsContainer = styled.div`
  width: 100%;
`;

const ProofAndSignalsContainer = styled.div`
  width: 100%;
  background: #eeeee;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Link = styled.a`
  white-space: pre;
  display: inline-block;
  color: #1F95E2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ConfettiContainer = styled.div`
  z-index: 20;
`;
