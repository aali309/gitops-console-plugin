import * as React from 'react';
import { createRevisionURL } from 'src/gitops/utils/gitops';

import ExternalLink from '../utils/components/ExternalLink/ExternalLink';

interface RevisionProps {
  repoURL: string;
  revision: string;
  helm: boolean;
}

const Revision: React.FC<RevisionProps> = ({ repoURL, revision, helm }) => {
  if (revision) {
    return (
      <>
        {!helm && (
          <ExternalLink href={createRevisionURL(repoURL, revision)}>
            ({revision.substring(0, 7) || ''})
          </ExternalLink>
        )}
        {helm && <span>{revision}</span>}
      </>
    );
  } else {
    return <span>(None)</span>;
  }
};

export default Revision;
