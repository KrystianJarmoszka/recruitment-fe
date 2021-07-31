export const getPageTitle = (uri: string) => {
  switch (uri) {
    case '/jobs':
      return 'Jobs';
    case '/properties':
      return 'Properties';
    default:
      return '';
  }
}
