declare module 'package-repo-url' {
  /**
   * Extracts repository URL from package.json information
   * @param packageInfo The package.json object
   * @returns Repository URL string
   */
  export default function packageRepoUrl(packageInfo: any): string;
}
