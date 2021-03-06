import gql from 'graphql-tag';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { withProps } from '../../common/utils';
import { UserDetailQueryResponse } from '../../settings/team/types';
import { MessengerPreview } from '../components';
import { queries } from '../graphql';

type Props = {
  fromUserId: string;
  sentAs: string;
  content: string;
};

type FinalProps = { userDetailQuery: UserDetailQueryResponse } & Props;

const MessengerPreviewContainer = (props: FinalProps) => {
  const { userDetailQuery } = props;

  if (userDetailQuery.loading) {
    return null;
  }

  const user = userDetailQuery.userDetail;
  const updatedProps = {
    ...props,
    user
  };

  return <MessengerPreview {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, UserDetailQueryResponse, { _id: string }>(
      gql(queries.userDetail),
      {
        name: 'userDetailQuery',
        options: ({ fromUserId }: { fromUserId: string }) => ({
          variables: {
            _id: fromUserId
          }
        })
      }
    )
  )(MessengerPreviewContainer)
);
