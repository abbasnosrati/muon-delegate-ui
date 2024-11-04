import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bonPionBscGraph } from "../constants/graphAddress";

export const pionClient = new ApolloClient({
  uri: bonPionBscGraph,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
