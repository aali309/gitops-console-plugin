import * as React from 'react';
import {
  OutOfSyncIcon,
  SyncFailedIcon,
  SyncUnknownIcon,
} from 'src/gitops/utils/components/Icons/Icons';
import { SyncStatus as SS } from 'src/gitops/utils/constants';

import { GreenCheckCircleIcon } from '@openshift-console/dynamic-plugin-sdk';

interface SyncProps {
  status: string;
}

const SyncStatus: React.FC<SyncProps> = ({ status }) => {
  let targetIcon: React.ReactNode;
  if (status === SS.SYNCED) {
    targetIcon = <GreenCheckCircleIcon />;
  } else if (status === SS.SYNCED_FAILED) {
    targetIcon = <SyncFailedIcon />;
  } else if (status === SS.OUT_OF_SYNC) {
    targetIcon = <OutOfSyncIcon />;
  } else if (status === SS.PRUNE_SKIPPED) {
    targetIcon = <OutOfSyncIcon />;
  } else {
    targetIcon = <SyncUnknownIcon />;
  }
  return (
    <span>
      {status ? targetIcon : ''} {status}
    </span>
  );
};

export default SyncStatus;
