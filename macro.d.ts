/**
 * A Babel plugin macro giving access to git information at compile time.
 */
declare module "react-git-info/macro" {

  export interface GitVersion {

    readonly major: string;
 
    readonly minor: string;

    readonly buildNumber: string;
  }

  /**
   * Returns information about the current Git state.
   */
  export default function GitInfo(): GitVersion;
}
