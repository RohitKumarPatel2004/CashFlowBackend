export const GetPanelistDataService = {
  GetPanelistData: async () => {
    try {
      const dummyData = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          age: 25,
        },
      ];

      return dummyData;
    } catch (error: any) {
      console.error('Error fetching panelist data:', error.message);
      throw error;
    }
  },
};
