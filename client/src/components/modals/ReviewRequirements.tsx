import React, { useState } from "react";
import styled from 'styled-components';
import { ArrowLeft, AlertTriangle } from 'react-feather';

import { ThemedText } from '@theme/text';
import { colors } from '@theme/colors';
import { Overlay } from '@components/modals/Overlay';
import { platformStrings } from '@helpers/strings';
import { Button } from "@components/common/Button";
import { RequirementStepRow } from "@components/modals/RequirementStepRow";
import { CustomCheckbox } from "@components/common/Checkbox";
import { PaymentPlatformType } from '@helpers/types';
import useMediaQuery from "@hooks/useMediaQuery";
import { Z_INDEX } from '@theme/zIndex';


interface ReviewRequirementsProps {
  onBackClick: () => void
  paymentPlatform: PaymentPlatformType
  onCtaClick: () => void
}

export const ReviewRequirements: React.FC<ReviewRequirementsProps> = ({
  onBackClick,
  paymentPlatform,
  onCtaClick
}) => {
  const isMobile = useMediaQuery() === 'mobile';
  
  /*
   * State
   */

  const [isReviewRequirementsChecked, setIsReviewRequirementsChecked] = useState(false);

  /*
   * Handlers
   */

  const handleOverlayClick = () => {
    onBackClick();
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsReviewRequirementsChecked(event.target.checked);
  };

  /*
   * Component
   */

  const optionalPlatformRequirement = () => {
    const requirementCopy = platformStrings.getForPlatform(paymentPlatform, 'PAYMENT_REQUIREMENT_STEP_FOUR');
    return requirementCopy ? (
      <RequirementStepRow step={4}>
        {requirementCopy}
      </RequirementStepRow>
    ) : null;
  };

  return (
    <ModalAndOverlayContainer>
      <Overlay />

      <ModalContainer>
        <TitleCenteredRow>
          <div style={{ flex: 0.25 }}>
            <button
              onClick={handleOverlayClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >

              <StyledArrowLeft/>
            </button>
          </div>

          <ThemedText.HeadlineSmall style={{ flex: '1', margin: 'auto', textAlign: 'center' }}>
            {isMobile ? 'Requirements' : 'Review Requirements'}
          </ThemedText.HeadlineSmall>

          <div style={{ flex: 0.25 }}/>
        </TitleCenteredRow>

        <StyledAlertTriangle />

        <RequirementListContainer>
          <RequirementStepRow step={1}>
            { platformStrings.getForPlatform(paymentPlatform, 'PAYMENT_REQUIREMENT_STEP_ONE') }
          </RequirementStepRow>

          <RequirementStepRow step={2}>
            <span style={paymentPlatform === "garanti" ? { textDecoration: 'underline', fontWeight: 'bold' } : undefined}>
              { platformStrings.getForPlatform(paymentPlatform, 'PAYMENT_REQUIREMENT_STEP_TWO') }
            </span>
          </RequirementStepRow>

          <RequirementStepRow step={3}>
            <span style={paymentPlatform === "garanti" ? { textDecoration: 'underline', fontWeight: 'bold' } : undefined}>
              {platformStrings.getForPlatform(paymentPlatform, 'PAYMENT_REQUIREMENT_STEP_THREE')}
            </span>
          </RequirementStepRow>

          {optionalPlatformRequirement()}
        </RequirementListContainer>

        <DisclaimerLabel>
          Not meeting requirements will lead to lost funds
        </DisclaimerLabel>

        <CheckboxContainer>
          <CustomCheckbox
            checked={isReviewRequirementsChecked}
            onChange={onCheckboxChange}
          />
          <CheckboxInstructionsLabel>
            I have reviewed the requirements
          </CheckboxInstructionsLabel>
        </CheckboxContainer>

        <Button
          disabled={!isReviewRequirementsChecked}
          onClick={onCtaClick}
          fullWidth={true}
        >
          {'Continue'}
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
  max-width: 472px;
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

const TitleCenteredRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  color: #FFF;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: #FFF;
`;

const StyledAlertTriangle = styled(AlertTriangle)`
  width: 56px;
  height: 56px;
  color: #FFF;
  padding: 0.5rem 0;
`;

const RequirementListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DisclaimerLabel = styled.button`
  font-size: 14px;
  font-family: 'Graphik';
  color: #df2e2d;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  background: none;
  border: none;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  gap: 0.75rem;
`;

const CheckboxInstructionsLabel = styled.div`
  padding-top: 2px;
  font-size: 15px;
  color: #6C757D;
`;
