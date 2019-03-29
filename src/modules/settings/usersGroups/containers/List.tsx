import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { commonListComposer } from '../../utils';
import { GroupList } from '../components';
import { mutations, queries } from '../graphql';
import {
  UsersGroupsAddMutation,
  UsersGroupsEditMutation,
  UsersGroupsQueryResponse,
  UsersGroupsRemoveMutation,
  UsersGroupsTotalCountQueryResponse
} from '../types';

type Props = {
  queryParams: any;
};

export default commonListComposer({
  name: 'usersGroups',

  gqlListQuery: graphql<Props, UsersGroupsQueryResponse>(
    gql(queries.usersGroups),
    {
      name: 'listQuery',
      options: ({ queryParams }) => {
        return {
          notifyOnNetworkStatusChange: true,
          variables: {
            page: queryParams.page,
            perPage: queryParams.perPage || 20
          }
        };
      }
    }
  ),

  gqlTotalCountQuery: graphql<{}, UsersGroupsTotalCountQueryResponse>(
    gql(queries.totalCount),
    {
      name: 'totalCountQuery'
    }
  ),

  gqlAddMutation: graphql<{}, UsersGroupsAddMutation>(
    gql(mutations.usersGroupsAdd),
    {
      name: 'addMutation'
    }
  ),

  gqlEditMutation: graphql<{}, UsersGroupsEditMutation>(
    gql(mutations.usersGroupsEdit),
    {
      name: 'editMutation'
    }
  ),

  gqlRemoveMutation: graphql<{}, UsersGroupsRemoveMutation>(
    gql(mutations.usersGroupsRemove),
    {
      name: 'removeMutation'
    }
  ),

  ListComponent: GroupList
});
