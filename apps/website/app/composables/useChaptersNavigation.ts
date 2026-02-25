export default async function useChaptersNavigation() {
  return useAsyncData('chapters-navigation', async () => {
    const navigation = await queryCollectionNavigation('chapters');

    navigation.forEach((item) => {
      if (item.stem === 'chapters') {
        item.title = 'Kapitel';
      }
    })
    
    console.log("Fetching navigation...");

    return navigation;
  })
}