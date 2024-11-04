import { gql } from "./__generated__/gql";

export const USER_BON_PIONS = gql(
  `query MyQuery($account: Bytes!) {
      accountTokenIds (where: {haveThisToken: true, account: $account}) {
        account
        latestTimestamp
        tokenId
      }
    }`
);
