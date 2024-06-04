export const GetAuthorizationHeader = (Header: any) => {
    let tokenIndex = Header.findIndex((item: string) => item === 'Authorization');
      let token = null;

      if (tokenIndex !== -1) {
         return token = Header[tokenIndex + 1].split(' ')[1];
      }
};