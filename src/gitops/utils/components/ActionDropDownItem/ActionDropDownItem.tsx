import * as React from 'react';
import classNames from 'classnames';
import { useGitOpsTranslation } from 'src/gitops/utils/hooks/useGitOpsTranslation';

import { Action, useAccessReview } from '@openshift-console/dynamic-plugin-sdk';
import { DropdownItem, TooltipPosition } from '@patternfly/react-core';

import './action-dropdown-item.scss';

type ActionDropdownItemProps = {
  action: Action;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionDropdownItem: React.FC<ActionDropdownItemProps> = ({ action, setIsOpen }) => {
  const { t } = useGitOpsTranslation();
  const [actionAllowed] = useAccessReview(action?.accessReview);
  const isCloneDisabled = !actionAllowed && action?.id === 'vm-action-clone';

  const handleClick = () => {
    if (typeof action?.cta === 'function') {
      action?.cta();
      setIsOpen(false);
    }
  };

  return (
    <DropdownItem
      data-test-id={`${action?.id}`}
      description={action?.description}
      isDisabled={action?.disabled || !actionAllowed}
      key={action?.id}
      onClick={handleClick}
      {...(isCloneDisabled && {
        tooltipProps: {
          content: t(`You don't have permission to perform this action`),
          position: TooltipPosition.left,
        },
      })}
      className={classNames({ ActionDropdownItem__disabled: isCloneDisabled })}
    >
      {action?.label}
      {action?.icon && (
        <>
          {' '}
          <span className="text-muted">{action.icon}</span>
        </>
      )}
    </DropdownItem>
  );
};

export default ActionDropdownItem;
